# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an Obsidian vaults repository. It contains Obsidian vaults managed via git, with Claude Code skills for Obsidian integration.

## Structure

- `uade/` — Obsidian vault (UADE). Contains `.obsidian/` config and markdown notes, with one folder per materia.
- `uade/.agents/skills/` — Installed Claude Code skills (real files): Obsidian skills from `kepano/obsidian-skills` (`defuddle`, `json-canvas`, `obsidian-bases`, `obsidian-cli`, `obsidian-markdown`, `pdf`, etc.) plus academic skills (`academic-search`, `quiz-maker`, `deep-research`, etc.).
- `uade/<materia>/.claude/skills/` — Per-materia symlinks into `uade/.agents/skills/`. Edit skills only in `uade/.agents/skills/`; changes propagate everywhere.
- `uade/skills-lock.json` — Tracks installed skill versions.

## Working with Obsidian Vaults

- Notes are Obsidian Flavored Markdown — use `[[wikilinks]]`, callouts, properties (YAML frontmatter), and embeds. Invoke `/obsidian-markdown` for syntax reference.
- Use `/obsidian-cli` to interact with the vault via CLI (search, create, manage notes).
- Use `/obsidian-bases` for `.base` files (database-like views).
- Use `/json-canvas` for `.canvas` files.
- Use `/defuddle` to extract clean markdown from web pages.

## Conventions

- Each top-level directory (e.g., `uade/`) is a separate Obsidian vault with its own `.obsidian/` config.
- Do not modify `.obsidian/` config files unless explicitly asked.
- Inside `uade/programacion-iii/`, all file and folder names use **kebab-case** (e.g., `merge-sort.md`, `divide-y-conquista/`). Each algorithm has its own note, grouped by design paradigm.
