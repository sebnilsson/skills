# AGENTS.md

This repository publishes agent skills. Each skill installs on its own or as part of the `sebnilsson-skills` plugin, through the Claude Code and Codex marketplaces.

## Layout

- `skills/<name>/SKILL.md` is the skill. The folder name and the frontmatter `name` must match and use lowercase kebab-case.
- `skills/<name>/agents/openai.yaml` holds the skill's Codex display name and short description.
- `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` are the Claude Code manifests.
- `plugin.json` and `.agents/plugins/marketplace.json` are the Codex manifests.
- Both plugins use the repository root as their source, and both agents find skills in `skills/` automatically. Do not list skills in the manifests.

## When you change a skill

- Keep `SKILL.md` self-contained. If you add a supporting file, put it inside the skill's folder and link to it with a relative path, because individual installs copy only that folder.
- Keep the `description` under 1024 characters. Agents use it to decide when to load the skill, so state what the skill does and when to use it.
- Treat the skill as public: no secrets, personal paths, or machine-specific assumptions.

## When you add a skill

1. Create `skills/<name>/SKILL.md` with `name` and `description` frontmatter.
2. Create `skills/<name>/agents/openai.yaml` with `interface.display_name` and `interface.short_description`.
3. Add the skill to the table in `README.md`, plus a section describing what it does with a few example prompts.
4. Bump the minor version in both `plugin.json` and `.claude-plugin/plugin.json`.

## Versioning

Plugin installs update only when the version changes. Bump the version in `plugin.json` and `.claude-plugin/plugin.json` together whenever a change should reach plugin users: patch for wording fixes, minor for new skills or new behavior, major for removed or renamed skills.

## Validate

Run before you finish:

```bash
node scripts/validate.mjs
```

It checks skill frontmatter, Codex metadata, README coverage, and that the Claude Code and Codex manifests agree. CI runs the same script. If the Claude Code CLI is installed, also run `claude plugin validate .`.
