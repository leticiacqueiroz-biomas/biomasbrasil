# Site institucional — Biomas Brasil

Site de uma página, bilíngue (PT/EN), em arquivo único. A foto está embutida em base64, então não há dependências externas: basta o `index.html`.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | O site inteiro (HTML + CSS + JS + foto embutida) |
| `.nojekyll` | Impede o GitHub Pages de processar o site com Jekyll |
| `README.md` | Este arquivo |

## Publicar no GitHub Pages

### Opção A — repositório de projeto
URL final: `https://leticiacqueiroz-biomas.github.io/biomas-brasil/`

1. Em github.com, crie um repositório **público** chamado `biomas-brasil` na conta `leticiacqueiroz-biomas`.
2. Na tela do repositório vazio, clique em **uploading an existing file**.
3. Arraste `index.html`, `.nojekyll` e `README.md`. Clique em **Commit changes**.
4. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**; branch `main`, pasta `/ (root)`. Salve.
5. Aguarde 1–2 minutos e recarregue a página de Settings → Pages: o link aparece no topo.

### Opção B — site raiz da conta
URL final: `https://leticiacqueiroz-biomas.github.io/`

Idêntico à Opção A, mas o repositório precisa se chamar exatamente **`leticiacqueiroz-biomas.github.io`**. Use esta opção se quiser que o site do Biomas Brasil seja a página principal da conta, com o painel de Piracanga continuando em seu próprio endereço.

> Se o `.nojekyll` não aparecer ao arrastar (o Finder esconde arquivos que começam com ponto), pressione `Cmd + Shift + .` no Finder para exibi-los. Ele não é obrigatório neste site, mas evita surpresas se você adicionar arquivos depois.

## Domínio próprio (opcional)

Para usar algo como `biomasbrasil.org` ou um subdomínio de `biomas.ai`:

1. No provedor de DNS do domínio, crie um registro **CNAME** apontando o subdomínio (ex.: `www`) para `leticiacqueiroz-biomas.github.io`. Para domínio raiz, use registros **A** para os IPs do GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
2. Em **Settings → Pages → Custom domain**, informe o domínio e marque **Enforce HTTPS** assim que o certificado for emitido.

## Como editar depois

O conteúdo bilíngue funciona por classes: cada bloco de texto tem uma versão `<span class="pt">` e outra `<span class="en">`. O botão PT/EN troca a classe do `<body>` (`lang-pt` / `lang-en`), que mostra ou esconde cada versão via CSS.

**Ao editar um texto, altere sempre as duas versões** — caso contrário o site fica inconsistente entre idiomas.

Para trocar a foto: substitua o `src="data:image/jpeg;base64,..."` da tag `<img class="photo">` por um caminho de arquivo (ex.: `src="leticia.jpg"`) e suba a imagem para o repositório.

## Conteúdo pendente de decisão

Estes pontos foram escritos com a marca "Biomas Brasil" porque ainda não estão decididos institucionalmente:

- **Nome jurídico** da associação (não decidido: *Instituto Biomas Brasil* e outras opções em aberto).
- **Sede** — o rodapé traz Uruçuca/BA, que é o que consta na minuta de estatuto; a alternativa São Paulo segue em aberto.
