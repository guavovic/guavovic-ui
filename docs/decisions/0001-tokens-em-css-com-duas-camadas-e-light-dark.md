# 1. Tokens em CSS puro, com duas camadas e light-dark()

Data: 01/10/2026

Status: Aceito

## Contexto

Os projetos web do guavovic (o guavovic-website, o front do Achaí e os próximos) precisam de uma base visual comum: as mesmas cores, fontes e espaçamentos, com tema claro e escuro. A identidade visual ainda está sendo pensada, mas a estrutura que vai carregá-la pode existir antes. Assim os projetos já usam os nomes certos, e a identidade entra depois trocando valores num lugar só.

## Opções consideradas

**Formato**
- **CSS puro com variáveis**: funciona em qualquer projeto, inclusive em front sem etapa de build, como o do Achaí.
- **JSON no padrão W3C (DTCG) + Style Dictionary**: padrão de design systems grandes, gera CSS, JS e outros formatos, mas exige build e hoje só CSS seria gerado.
- **Preset de Tailwind**: prende todos os projetos ao Tailwind.

**Camadas de nomes**
- **Duas (primitivas + semânticas)**: a paleta crua e o papel de cada valor.
- **Três (+ componentes, como `--gv-button-bg`)**: comum em sistemas grandes; aqui ainda não há componentes compartilhados.

**Tema claro e escuro**
- **`light-dark()`**: cada cor declarada uma vez, com os dois valores. Funciona nos navegadores atuais desde 2024.
- **`@media (prefers-color-scheme)` + `[data-theme]`**: o jeito clássico, com suporte a navegadores mais antigos, mas cada cor declarada duas ou três vezes.

**Distribuição**
- **jsDelivr direto do GitHub, por tag**: uma linha de `<link>`, sem publicar pacote.
- **npm**: o padrão para projetos com build; por enquanto, nenhum projeto precisa.
- **Copiar o arquivo**: cada projeto acabaria numa versão diferente.

## Decisão

- **Um arquivo, `tokens.css`, com variáveis CSS prefixadas por `--gv-`**, para não colidir com variáveis dos projetos.
- **Duas camadas.** Primitivas (`--gv-gray-500`) só compõem as semânticas (`--gv-color-text-muted`). Os projetos usam só as semânticas.
- **`light-dark()` em toda cor semântica**, com `color-scheme: light dark` no `:root`. Sem nada, segue o sistema; `data-theme="light"` ou `"dark"` em qualquer elemento força um tema.
- **Distribuição pelo jsDelivr** a partir das tags do GitHub (`@v0.1.0`). O npm entra quando algum projeto tiver build.
- **SemVer com tags e CHANGELOG.** Enquanto a identidade não fecha, as versões ficam em `0.x`.
- **Página de preview** (`index.html`, na raiz, publicada na Vercel) com todos os tokens aplicados nos dois temas.
- **CI confere o contraste** dos pares de texto e fundo, nos dois temas, com o mínimo do WCAG AA (4,5:1 para texto, 3:1 para o anel de foco). O script não tem dependências e lê o próprio `tokens.css`.
- **Valores provisórios e neutros** (cinzas, um azul, fontes do sistema), marcados como tal no arquivo e no README.

## Consequências

- Os projetos podem adotar os tokens já, e a troca de identidade não exige mexer neles.
- Navegadores anteriores a 2024 não entendem `light-dark()` e ficam sem as cores semânticas. Para projetos pessoais e de portfólio, aceitável.
- `light-dark()` só vale para cores. Tokens de outros tipos que mudarem com o tema (uma sombra mais forte no escuro, por exemplo) vão precisar de `[data-theme]` e `prefers-color-scheme`.
- Sem build, não há como gerar o mesmo conjunto para JS ou para apps nativos. Se surgir a necessidade, os valores migram para JSON (DTCG) e o CSS passa a ser gerado.
