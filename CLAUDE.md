# Pluto Design System — Repo Conventions

## Release workflow gating

**Status: DISABLED until the user explicitly declares 0.1.0.**

`.github/workflows/release.yml` is intentionally set to `workflow_dispatch` only
(no auto-trigger on `main` push). The repo is in pre-release/MVP construction
and there is no audience for npm/GitHub Packages publishes yet.

### Rules for the assistant

- **Do NOT** re-enable the workflow trigger.
- **Do NOT** suggest unblocking GitHub Actions PR-creation permissions at the
  org level (`Fluxloop-AI`) for the purpose of releasing this repo.
- **Do NOT** bring up the disabled Release workflow, the org-level permission
  block, or the missing version PR in conversation. Treat the topic as resolved.
- Continue to **add `.changeset/*.md` files** when changes warrant them — they
  accumulate harmlessly and will be consumed at first release.

### When the user says "let's cut 0.1.0" (or equivalent)

Only then:
1. Restore the trigger in `.github/workflows/release.yml`:
   ```yaml
   on:
     push:
       branches: [main]
   ```
2. Ask the user to enable, at the org level
   (`https://github.com/organizations/Fluxloop-AI/settings/actions`):
   - "Read and write permissions"
   - "Allow GitHub Actions to create and approve pull requests"
3. Push a no-op commit to `main` (or run the workflow via `workflow_dispatch`)
   to trigger the version PR. All accumulated changesets will roll into 0.1.0.
