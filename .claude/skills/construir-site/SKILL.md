---
name: construir-site
description: Constrói o site da empresa Correia em camadas (identidade, textos, estrutura, interações, formulário, rastreamento e publicação), no padrão técnico das LPs anteriores. Use quando o briefing estiver pronto, ou para continuar a construção entre uma prévia e outra.
---

# Construir o site

Leia antes: o `CLAUDE.md`, o briefing no Drive ("Briefing do site — Correia"), `docs/referencias.md` e o [`padrao-tecnico.md`](padrao-tecnico.md) desta pasta.

## 0. Antes de escrever código

Confira e liste o que falta, sem travar o que já dá para fazer:

- briefing com públicos, mensagem central e arquitetura decididos;
- marca: logotipo em boa resolução, cores e fontes (o manual e a paleta estão na pasta Identidade Visual; confirme com o Felipe o pagamento e a aprovação antes de usar os arquivos);
- equipe: ficha de cada profissional (nome, CREFITO, formação, áreas de atuação, o que não atende, foto com autorização);
- fotos reais: a equipe, atendimento em casa (com autorização), identidade visual;
- dados: WhatsApp, endereço completo, horários, planos de saúde atendidos, região de atendimento, Instagram, domínio;
- o que pode ser publicado (regras do `CLAUDE.md`).

O que faltar vira `[PENDENTE: …]` no lugar certo e entra na lista do README.

## 1. Identidade

Defina os tokens em `:root` (cores com contraste AA para texto, tipografia, raio, sombras, espaçamento) e os componentes base: botão de WhatsApp, botão secundário, cartão, FAQ, carrossel. A identidade é da **Correia · Longevidade & Saúde**: tradicional, acessível, madura e emocional, com sensação de acolhimento, pertencimento e força; nada delicado, nada infantil. Paleta oficial: `#3E431B` (verde-oliva escuro), `#908F68` (verde-sálvia), `#F5EEDD` (creme) e `#A76F4E` (marrom). Confira o contraste: o sálvia e o marrom sobre o creme tendem a ficar abaixo de 4,5:1 para texto corrido, então servem a fundos, detalhes e títulos grandes. O símbolo são os elos do "C". Fontes: os nomes ainda são PENDENTES; use equivalentes do Google Fonts e avise o Felipe. Não reaproveite paleta, fontes, fotos nem textos da marca pessoal JG da Júlia nem de outros clientes.

## 2. Textos primeiro

Escreva o texto de cada seção a partir do briefing antes de desenhar. Para o topo da página, proponha três títulos com abordagens diferentes (sinal, causa, resultado de rotina) e recomende um. Regras:

- frases curtas, palavras do público, um termo técnico só quando explicado;
- cada seção responde a uma pergunta que o visitante faria naquele momento;
- toda afirmação sobre a empresa e a equipe é verificável; nada de superlativo nem promessa;
- chamada para ação com verbo e benefício ("Agendar a avaliação pelo WhatsApp"), repetida nos pontos de decisão.

## 2b. Equipe e áreas de atuação

O site mostra quem atende o quê. Monte a seção **Quem somos** (Júlia e a equipe) e, em cada serviço, a indicação de quem atende, a partir das fichas confirmadas. Regras no `CLAUDE.md` (item 6) e o desenho do bloco no `padrao-tecnico.md`. Enquanto uma ficha não estiver completa, mostre o cartão com `[PENDENTE: …]` visível, sem nome nem título inventados.

## 3. Prévia 1 (~50%)

Página inicial completa e navegável no celular, com a identidade aplicada e os textos da primeira versão:

menu · topo · sinais e situações que o visitante reconhece · como a equipe avalia (protocolo) · serviços, cada um com quem atende, e como funciona o atendimento em casa · região atendida · Quem somos (Júlia e a equipe, com CREFITO e área de atuação) · como é a primeira avaliação · planos de saúde (se liberados) · perguntas frequentes · chamada final · rodapé com nome da empresa, CNPJ, responsável técnico e CREFITO (quando confirmados).

A ordem final das seções vem do briefing. Botões de WhatsApp já funcionando com `data-wa`; ainda sem formulário e sem rastreamento. `noindex` obrigatório.

## 4. Prévia 2 (~90%)

Ajustes da prévia 1 e o restante do padrão técnico: formulário antes do WhatsApp, eventos, GTM com consentimento, aviso de cookies, política de privacidade, página 404, dados para o Google (tipo do schema.org a conferir, conforme haja endereço de sede ou só área de atendimento), imagem de compartilhamento 1200 × 630, `sitemap.xml`, README completo. Páginas por serviço, se estiverem no escopo combinado, reaproveitam os mesmos componentes.

## 5. Lançamento

Depois da aprovação final: remover o `noindex`, conferir `canonical`, `og:url` e dados para o Google com o domínio definitivo, configurar o domínio no GitHub Pages, validar os eventos no modo de visualização do GTM com o gestor de tráfego e atualizar o README.

## A cada bloco pronto

1. Sirva localmente (`python3 -m http.server 8000`) e veja de verdade: capture a página com Playwright nas larguras do padrão e confira se não há rolagem horizontal, texto cortado ou sobreposição.
2. Confira teclado, foco visível e `prefers-reduced-motion`.
3. Rode a busca de termos proibidos (lista no `padrao-tecnico.md`).
4. Faça o commit com uma mensagem clara.
