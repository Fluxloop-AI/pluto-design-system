---
"@fluxloop-ai/pds-core": patch
"@fluxloop-ai/pds-icons": patch
"@fluxloop-ai/pds-markdown": patch
"@fluxloop-ai/pds-ui": patch
---

Repair install/registry consumer flow surfaced by 0.1.0 dogfooding.

- pds-ui: marked private (shadcn-copy only — was unintentionally publishing); 17 missing components registered (app-shell, sidebar-menu/list, action-card/tile, icon-button, text-button, panel, page-container, section-header, removable-tab-bar, full chat-* family + chat-types lib + internal chat-copy-button); AppShell root switched to h-dvh
- pds-markdown: built via tsup, ships dist with CSS auto-load (was raw .ts source)
- pds-core: tailwind-merge bumped to v3 (Tailwind v4 alignment)
- root + apps/docs: shadcn registry now hosted via Vercel build pipeline (`<host>/r/<name>.json`) — placeholder URL `pluto-design-system-docs.vercel.app`
- root: silenced stale @emoji-mart/react React-18 peer cap (transitive of @lobehub/ui, runtime unused)
