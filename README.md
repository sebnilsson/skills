# Skills

My repository for useful skills.

# [Learnings](skills/learnings/SKILL.md)

Recover the engineering lessons you missed while a coding agent did the work. This skill reviews the agent's own local work logs and explains difficult debugging, misleading symptoms, and non-obvious fixes, ranked by value. Each lesson includes evidence and what to carry forward. The report stays in chat.

## How to use

Install skills using npm:

```sh
npx skills@latest add sebnilsson/skills
```

Then use the skill:

```text
/learnings
```

The default period is today. You can specify a date range, project, or topic. The review uses the current agent's accessible history and reports any gaps.

You can give specific instructions to skills:

```text
/learnings from this week, related to infrastructure
```