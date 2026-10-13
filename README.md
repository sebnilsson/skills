# Skills

A collection of reusable coding agent skills.

## [Learnings](skills/learnings/SKILL.md)

Learn from the work your coding agent did. The `learnings` skill reviews accessible coding-agent work history and turns useful discoveries into ranked lessons: debugging insights, consequential decisions, and ways to direct or verify the agent. Each lesson explains when it applies, the concept behind it, and what the evidence supports. Explanations adapt to your experience level.

By default, it reviews the current agent's work today in your timezone for the current project or directory. You can choose a period, project, topic, or all accessible projects. Explicitly request other agents to include their accessible local logs. The review is read-only, reports gaps in the available history, and leaves its findings in chat.

## How to use

Install with the skills CLI:

```sh
npx skills@latest add sebnilsson/skills
```

Ask your agent to use the installed skill:

```text
Use the learnings skill to review today's work.
```

If your agent supports slash commands, use `/learnings`. You can also tailor the request:

```text
Use learnings for this week's infrastructure work. Explain the concepts as you go.
Use learnings for last week across all projects. Focus on advanced debugging lessons.
Use learnings for this week's work, including both Codex and Claude Code logs.
```

Historical coverage depends on the agent's history tools and local logs. If those are unavailable, the skill can give a partial review of the current conversation.
