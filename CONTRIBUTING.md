# Contributing

Thanks for helping improve these skills. Issues and pull requests are welcome.

## Suggest a change

- **Skill behaves badly?** Open an issue with the prompt you used, the agent and model, and what the skill did compared with what you expected.
- **New skill idea?** Open an issue first to describe the problem it solves, so we can agree on scope before you write it.

## Make a change

1. Fork the repository and create a branch.
2. Edit or add skills under `skills/`. [AGENTS.md](AGENTS.md) describes the layout, the files a new skill needs, and when to bump the plugin version.
3. Run the validator:

   ```bash
   node scripts/validate.mjs
   ```

4. Try the skill in at least one agent before opening a pull request. The quickest way is to load your checkout as a local marketplace:

   ```bash
   claude plugin marketplace add ./path/to/your/checkout
   codex plugin marketplace add ./path/to/your/checkout
   ```

   Or copy the skill folder into `~/.claude/skills/` or `~/.agents/skills/`.

5. Open a pull request that explains what changed and how you tested it.

## Writing good skills

- Write the `description` for the agent. It decides when the skill loads, so name the task and the phrases a user would say.
- Keep instructions short and specific. Agents follow concrete checks better than general advice.
- Keep everything a skill needs inside its own folder, so installing that one skill works.

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
