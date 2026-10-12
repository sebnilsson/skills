# Skills

A collection of reusable coding agent skills.

## [Learnings](skills/learnings/SKILL.md)

Learn from the work your coding agent did. The `learnings` skill reviews the current agent's accessible work history and turns useful discoveries into ranked engineering lessons. It explains what happened, how the investigation narrowed down the cause, what the evidence supports, and what to check in a similar situation. Explanations adapt to your experience level.

By default, it reviews today in your timezone for the current project or directory. You can choose a period, project, topic, or all accessible projects. The review is read-only, reports gaps in the available history, and leaves its findings in chat.

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
```

Historical coverage depends on the agent's history tools and local logs. If those are unavailable, the skill can give a partial review of the current conversation.
