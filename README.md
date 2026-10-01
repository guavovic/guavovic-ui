# guavovic-ui

Tokens de design compartilhados pelos projetos web do guavovic: cores, tipografia, espaçamento, forma e movimento, nos temas claro e escuro, num único arquivo CSS.

**Preview:** [guavovic-ui.vercel.app](https://guavovic-ui.vercel.app)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/guavovic/guavovic-ui@v0.1.0/tokens.css">
```

## Tokens

| Grupo | Nomes |
|---|---|
| Cores | `--gv-color-{bg, surface, surface-hover, border, border-strong, text, text-muted, accent, accent-hover, on-accent, focus, danger, success, warning}` |
| Fontes | `--gv-font-{display, body, mono}` |
| Tamanhos de texto | `--gv-text-{xs, sm, base, lg, xl, 2xl, 3xl}` |
| Altura de linha e peso | `--gv-leading-{tight, normal}`, `--gv-weight-{regular, medium, bold}` |
| Espaçamento | `--gv-space-{1, 2, 3, 4, 6, 8, 12, 16}` |
| Forma | `--gv-radius-{sm, md, lg, full}`, `--gv-shadow-{sm, md}` |
| Movimento | `--gv-duration-{fast, normal}`, `--gv-ease` |

As cores seguem o tema do sistema, e `data-theme="light"` ou `data-theme="dark"` força um dos dois.

As mudanças de cada versão estão no [CHANGELOG](CHANGELOG.md), e as decisões em [`docs/decisions`](docs/decisions).
