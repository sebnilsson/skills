#!/usr/bin/env node
// Checks that every skill is well formed and that the Claude Code and Codex
// manifests describe the same plugin. No dependencies; run with `node scripts/validate.mjs`.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const errors = [];
const fail = (message) => errors.push(message);

const read = (path) => readFileSync(join(root, path), "utf8");
const readJson = (path) => {
  if (!existsSync(join(root, path))) {
    fail(`${path}: missing`);
    return {};
  }
  try {
    return JSON.parse(read(path));
  } catch (error) {
    fail(`${path}: invalid JSON (${error.message})`);
    return {};
  }
};

// Reads top-level `key: value` pairs, including `>` and `|` block scalars.
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;
  const fields = {};
  const lines = match[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const field = lines[i].match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!field) continue;
    let [, key, value] = field;
    if (/^[>|][-+]?$/.test(value)) {
      const block = [];
      while (i + 1 < lines.length && /^(\s+|$)/.test(lines[i + 1])) block.push(lines[++i].trim());
      value = block.join(value.startsWith(">") ? " " : "\n").trim();
    }
    fields[key] = value.replace(/^(["'])(.*)\1$/, "$2");
  }
  return fields;
}

const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const semver = /^\d+\.\d+\.\d+(-[\w.]+)?$/;

// Skills
const skillNames = readdirSync(join(root, "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (skillNames.length === 0) fail("skills/: no skills found");

const readme = read("README.md");

for (const name of skillNames) {
  const dir = `skills/${name}`;
  if (!kebab.test(name)) fail(`${dir}: folder name must be lowercase kebab-case`);

  if (!existsSync(join(root, dir, "SKILL.md"))) {
    fail(`${dir}: missing SKILL.md`);
    continue;
  }
  const frontmatter = parseFrontmatter(read(`${dir}/SKILL.md`));
  if (!frontmatter) {
    fail(`${dir}/SKILL.md: missing YAML frontmatter`);
    continue;
  }
  if (frontmatter.name !== name) fail(`${dir}/SKILL.md: name "${frontmatter.name}" must match folder "${name}"`);
  if (name.length > 64) fail(`${dir}/SKILL.md: name is longer than 64 characters`);
  if (!frontmatter.description) fail(`${dir}/SKILL.md: missing description`);
  else if (frontmatter.description.length > 1024) {
    fail(`${dir}/SKILL.md: description is ${frontmatter.description.length} characters; the limit is 1024`);
  }

  const openai = `${dir}/agents/openai.yaml`;
  if (!existsSync(join(root, openai))) fail(`${openai}: missing Codex metadata`);
  else {
    const yaml = read(openai);
    for (const key of ["display_name", "short_description"]) {
      if (!new RegExp(`^\\s+${key}:\\s*\\S`, "m").test(yaml)) fail(`${openai}: missing interface.${key}`);
    }
  }

  if (!readme.includes(`(skills/${name}/SKILL.md)`)) fail(`README.md: add ${name} to the skills table`);
}

// Plugin manifests
const claudePlugin = readJson(".claude-plugin/plugin.json");
const codexPlugin = readJson("plugin.json");
const claudeMarketplace = readJson(".claude-plugin/marketplace.json");
const codexMarketplace = readJson(".agents/plugins/marketplace.json");

for (const [path, manifest] of [[".claude-plugin/plugin.json", claudePlugin], ["plugin.json", codexPlugin]]) {
  if (!kebab.test(manifest.name ?? "")) fail(`${path}: name must be lowercase kebab-case`);
  if (!semver.test(manifest.version ?? "")) fail(`${path}: version must be semver`);
  if (!manifest.description) fail(`${path}: missing description`);
}
for (const key of ["name", "version", "description", "license"]) {
  if (claudePlugin[key] !== codexPlugin[key]) {
    fail(`plugin.json and .claude-plugin/plugin.json disagree on "${key}"`);
  }
}

const marketplaces = [
  [".claude-plugin/marketplace.json", claudeMarketplace],
  [".agents/plugins/marketplace.json", codexMarketplace],
];
if (claudeMarketplace.name !== codexMarketplace.name) fail("Claude Code and Codex marketplaces must share a name");

for (const [path, marketplace] of marketplaces) {
  const entry = (marketplace.plugins ?? []).find((plugin) => plugin.name === claudePlugin.name);
  if (!entry) {
    fail(`${path}: does not list plugin "${claudePlugin.name}"`);
    continue;
  }
  if (entry.description !== claudePlugin.description) fail(`${path}: description differs from the plugin manifest`);
  const source = typeof entry.source === "string" ? entry.source : entry.source?.path;
  if (source !== "./") fail(`${path}: plugin source must be the repository root "./"`);
}

const codexEntry = (codexMarketplace.plugins ?? []).find((plugin) => plugin.name === claudePlugin.name);
if (codexEntry && (!codexEntry.policy?.installation || !codexEntry.policy?.authentication || !codexEntry.category)) {
  fail(".agents/plugins/marketplace.json: Codex requires policy.installation, policy.authentication, and category");
}

// README install commands
const pluginId = `${claudePlugin.name}@${claudeMarketplace.name}`;
for (const command of [`claude plugin install ${pluginId}`, `codex plugin add ${pluginId}`]) {
  if (!readme.includes(command)) fail(`README.md: missing install command "${command}"`);
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`Validated ${skillNames.length} skill(s) and the ${pluginId} plugin.`);
