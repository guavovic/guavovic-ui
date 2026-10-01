# guavovic-ui

Tokens de design compartilhados pelos projetos web do guavovic: cores, tipografia, espaçamento, forma e movimento, nos temas claro e escuro, num único arquivo CSS.

**Preview:** [guavovic-ui.vercel.app](https://guavovic-ui.vercel.app)

## Como usar

Num projeto com HTML puro, inclua o arquivo com a versão fixa:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/guavovic/guavovic-ui@v0.1.0/tokens.css">
```

E use só os tokens semânticos:

```css
body {
  background: var(--gv-color-bg);
  color: var(--gv-color-text);
  font-family: var(--gv-font-body);
}

.button {
  background: var(--gv-color-accent);
  color: var(--gv-color-on-accent);
  border-radius: var(--gv-radius-md);
  padding: var(--gv-space-2) var(--gv-space-4);
}
```

## Tema claro e escuro

Cada cor semântica tem os dois valores dentro de `light-dark()`. Sem fazer nada, a página segue o tema do sistema. Para forçar um tema (num botão de tema, por exemplo), ponha o atributo no `<html>` ou em qualquer elemento:

```html
<html data-theme="dark">
```

## Tokens

| Grupo | Nomes | Exemplo |
|---|---|---|
| Cores | `--gv-color-{bg, surface, surface-hover, border, border-strong, text, text-muted, accent, accent-hover, on-accent, focus, danger, success, warning}` | `color: var(--gv-color-text-muted)` |
| Fontes | `--gv-font-{display, body, mono}` | `font-family: var(--gv-font-display)` |
| Tamanhos de texto | `--gv-text-{xs, sm, base, lg, xl, 2xl, 3xl}` | `font-size: var(--gv-text-lg)` |
| Altura de linha e peso | `--gv-leading-{tight, normal}`, `--gv-weight-{regular, medium, bold}` | `line-height: var(--gv-leading-normal)` |
| Espaçamento | `--gv-space-{1, 2, 3, 4, 6, 8, 12, 16}` (múltiplos de 4px) | `gap: var(--gv-space-4)` |
| Forma | `--gv-radius-{sm, md, lg, full}`, `--gv-shadow-{sm, md}` | `border-radius: var(--gv-radius-md)` |
| Movimento | `--gv-duration-{fast, normal}`, `--gv-ease` | `transition: color var(--gv-duration-fast) var(--gv-ease)` |

As primitivas (`--gv-gray-*`, `--gv-blue-*`...) existem só para compor as semânticas. Os projetos não devem usá-las direto, porque podem mudar entre versões.

A página de preview, [guavovic-ui.vercel.app](https://guavovic-ui.vercel.app), mostra todos os tokens aplicados, nos dois temas.

## Contraste

Os pares de texto e fundo passam no contraste mínimo do WCAG AA nos dois temas, conferido no CI. Para conferir localmente:

```bash
node scripts/check-contrast.mjs
```

## Versões

[SemVer](https://semver.org/lang/pt-BR/), com uma tag no Git para cada versão e as mudanças no [CHANGELOG](CHANGELOG.md). Enquanto a versão começar com `0.`, os valores podem mudar. Renomear ou remover um token semântico só acontece numa versão nova de número principal.

As decisões de arquitetura ficam em [`docs/decisions`](docs/decisions).
