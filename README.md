# Skills

[![skills.sh](https://skills.sh/b/sebnilsson/skills)](https://skills.sh/sebnilsson/skills)
[![Validate](https://github.com/sebnilsson/skills/actions/workflows/validate.yml/badge.svg)](https://github.com/sebnilsson/skills/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Agent skills for software engineering with Claude Code, Codex, and other coding agents.

Each skill is a folder with a `SKILL.md` that follows the open [Agent Skills](https://agentskills.io) standard. Install them all as one plugin that stays up to date, or pick individual skills.

## Skills

| Skill | What it does |
| --- | --- |
| [learnings](skills/learnings/SKILL.md) | Turns your coding agent's work history into ranked, evidence-backed lessons. |

### [learnings](skills/learnings/SKILL.md)

Learn from the work your coding agent did. The `learnings` skill reviews your accessible coding-agent work history and turns useful discoveries into ranked lessons, such as debugging insights, consequential decisions, and ways to direct or verify the agent. Each lesson explains when it applies, the concept behind it, and how strongly the evidence supports it. Explanations adapt to your experience level.

By default, it reviews the current agent's work today, in your timezone, for the current project or directory. You can choose a period, a project, a topic, or all accessible projects. It reads other agents' local logs only when you ask. The review is read-only, reports gaps in the available history, and leaves its findings in chat.

```text
Use the learnings skill to review today's work.
Use learnings for this week's infrastructure work. Explain the concepts as you go.
Use learnings for last week across all projects. Focus on advanced debugging lessons.
Use learnings for this week's work, including both Codex and Claude Code logs.
```

How far back `learnings` can look depends on the agent's history tools and local logs. If those are unavailable, it reviews what it can from the current conversation and says what it could not see.

## Installation

There are two ways to install:

- **Plugin (recommended).** Installs every skill in this repo as the `sebnilsson-skills` plugin. Your agent updates it from the marketplace, and new skills arrive with it.
- **Individual skills.** Copies only the skills you choose into your agent's skills folder. You update them yourself.

In the individual-skill commands below, replace `<skill>` with a name from the [skills table](#skills).

Choose one method per agent. If you install both, every skill shows up twice.

### Claude Code

<details open>
<summary><strong>Plugin</strong></summary>

```bash
claude plugin marketplace add sebnilsson/skills
claude plugin install sebnilsson-skills@sebnilsson
```

Or, inside a Claude Code session:

```text
/plugin marketplace add sebnilsson/skills
/plugin install sebnilsson-skills@sebnilsson
```

Update with `claude plugin update sebnilsson-skills@sebnilsson`. To get updates automatically, enable auto-update for the `sebnilsson` marketplace in `/plugin`.

</details>

<details>
<summary><strong>Individual skills</strong></summary>

Use the [skills CLI](https://github.com/vercel-labs/skills) (requires Node.js 22.20 or later):

```bash
npx skills@latest add sebnilsson/skills --skill <skill> -a claude-code -g
```

Leave out `-g` to install into the current project instead of your user profile. Leave out `--skill` to choose from a list. Update with `npx skills@latest update`.

To install by hand, copy the `skills/<skill>` folder to `~/.claude/skills/<skill>` for all projects, or to `.claude/skills/<skill>` for one project.

</details>

### Codex

<details open>
<summary><strong>Plugin</strong></summary>

```bash
codex plugin marketplace add sebnilsson/skills
codex plugin add sebnilsson-skills@sebnilsson
```

You can also run `/plugins` inside Codex and install `sebnilsson-skills` from the **Sebastian Nilsson Skills** marketplace. Start a new Codex session after installing.

Update with `codex plugin marketplace upgrade sebnilsson`.

</details>

<details>
<summary><strong>Individual skills</strong></summary>

Ask Codex's built-in skill installer:

```text
$skill-installer install https://github.com/sebnilsson/skills/tree/main/skills/<skill>
```

Or use the [skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills@latest add sebnilsson/skills --skill <skill> -a codex -g
```

To install by hand, copy the `skills/<skill>` folder to `~/.agents/skills/<skill>` for all projects, or to `.agents/skills/<skill>` in a repository.

Restart Codex after installing. To update, run `npx skills@latest update`, or remove the skill folder and install it again.

</details>

### Other agents

The [skills CLI](https://github.com/vercel-labs/skills) installs these skills into Cursor, GitHub Copilot, OpenCode, Gemini CLI, and [many other agents](https://github.com/vercel-labs/skills/blob/main/docs/agents.md):

```bash
npx skills@latest add sebnilsson/skills
```

## Using the skills

Agents load a skill automatically when your request matches its description, so you can describe the task and mention the skill by name:

```text
Use the <skill> skill to ...
```

You can also invoke a skill directly:

| Agent | Plugin install | Individual install |
| --- | --- | --- |
| Claude Code | `/sebnilsson-skills:<skill>` | `/<skill>` |
| Codex | `$<skill>`, or pick it from `/skills` | `$<skill>`, or pick it from `/skills` |

Each skill's section under [Skills](#skills) has example prompts.

## Repository layout

```text
skills/<name>/SKILL.md            The skill itself, plus any files it references
skills/<name>/agents/openai.yaml  Codex display metadata for the skill
.agents/plugins/marketplace.json  Codex marketplace manifest
.claude-plugin/                   Claude Code plugin and marketplace manifests
plugin.json                       Agent Plugins manifest, read by Codex
scripts/validate.mjs              Checks skills and manifests; runs in CI
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Coding agents working in this repo follow [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE)
