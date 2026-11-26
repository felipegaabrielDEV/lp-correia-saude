# Padrão técnico

Destilado das LPs anteriores. A referência mais atual é o `lp-julia-fisioterapia` (formulário, GTM com consentimento, eventos, política, 404). Quando tiver dúvida de implementação, abra o arquivo equivalente lá e adapte; os nomes específicos de lá (`juliaTrack`, `jg_consent`, `jg_origin`) mudam para os deste projeto. Reaproveite a engenharia, nunca a identidade, os textos nem as fotos.

## Estrutura de arquivos

```
├── index.html                    # Estrutura e conteúdo de todas as seções
├── styles.css                    # Identidade visual, layout responsivo e animações
├── script.js                     # Menu, carrosséis, FAQ e links do WhatsApp (com origem por UTM)
├── lead-form.js                  # Formulário antes do WhatsApp e confirmação
├── eventos.js                    # Eventos para o Google Tag Manager
├── consent.js                    # Aviso de cookies (LGPD) e Modo de Consentimento do Google
├── politica-de-privacidade.html  # noindex, nofollow
├── 404.html                      # noindex, com a identidade do site
├── sitemap.xml
├── docs/                         # Referências e passo a passo do GTM para o gestor de tráfego
└── assets/                       # WebP, organizado por seção (marca/ fica fora do repositório até a liberação, equipe/, atendimento/ …)
```

Nomes deste projeto: função de eventos `window.correiaTrack`, consentimento salvo em `localStorage` na chave `correia_consent`, origem da visita em `sessionStorage` na chave `correia_origin`.

## Ordem do `<head>`

1. `charset` e `viewport` (com `viewport-fit=cover`).
2. Consentimento padrão: tudo negado (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`), `wait_for_update: 500`, `ads_data_redaction: true`, reaplicando a escolha salva. **Sempre antes do GTM.**
3. Google Tag Manager (o ID vem do gestor de tráfego; GA4, Google Ads, Meta, Clarity e Tintim são configurados no painel, não no site).
4. `title` com o serviço e a cidade, `description`, `theme-color`.
5. Prévia ao compartilhar: `og:*` com endereço completo, imagem 1200 × 630 em JPG, `twitter:card`; `canonical`.
6. Dados para o Google em `application/ld+json`, com o tipo do schema.org conferido (a empresa atende em domicílio: sem endereço de sede confirmado, descreva só a área de atendimento) e os mesmos dados do rodapé (nome, CNPJ, telefone, horários, Instagram). Se mudar no rodapé, muda aqui.
7. Contato em meta tags: `whatsapp-number` (só dígitos, com DDI e DDD) e `instagram-url`.
8. Favicon, `preconnect` e Google Fonts com `display=swap`, `preload` da imagem do topo por largura, CSS com `?v=AAAAMMDD-NN` para furar o cache a cada publicação.
9. Durante as prévias: `<meta name="robots" content="noindex, nofollow">`.

## `<body>`

`noscript` do GTM → sprite de ícones SVG (`<symbol>`) → `header` → `main` com `section` (`id` em português e `aria-labelledby` apontando para o título) → `footer` (contato, endereço se houver sede, horários, **nome da empresa, CNPJ e responsável técnico com CREFITO**, quando confirmados, link da política e "Preferências de cookies") → janela do formulário → botão flutuante → aviso de cookies → scripts no fim, sem bloqueio.

Uma única `h1` (no topo). Títulos em ordem, sem pular nível.

## WhatsApp

- Todo botão de WhatsApp tem `data-wa` e `data-wa-origin` com a posição em `snake_case` (`menu`, `menu_mobile`, `hero`, `sinais`, `servico_domiciliar`, `servico_idoso`, `regiao`, `faq`, `cta_final`, `rodape`, `botao_flutuante`). O `href` gerado é a reserva sem JavaScript; com JavaScript, o clique abre o formulário.
- Um único estilo de botão em todo o site, mais o botão flutuante circular.
- Mensagem padrão em `script.js`, seguida das respostas do formulário.
- Origem por UTM: `resolveVisitOrigin(source, medium)` reconhece anúncio do Meta (`paid_social` + `meta`/`instagram`), Google Ads (`google` + `cpc`), bio do Instagram (`instagram` + `organic`/`organic_social`) e perfil do Google (`google` + `organic`), guarda em `sessionStorage` e troca o destino pelos links da Tintim em `waLinksByOrigin`. Sem origem reconhecida, vale o link padrão.

## Formulário antes do WhatsApp

- No máximo quatro campos, definidos no briefing. Telefone com máscara e validação de DDD, campos com 16 px (sem zoom no iPhone), mensagens de erro ligadas ao campo, foco preso na janela, `Esc` fecha, foco volta ao botão que abriu.
- Depois do envio: abre o WhatsApp com a mensagem pronta e mostra a confirmação ("Tudo certo, Maria!") com o botão para abrir de novo.
- `data-clarity-mask="true"` na janela, para o Clarity não gravar o que é digitado.

## Eventos (`dataLayer`)

Todos com `event_id` único, para as plataformas não contarem duas vezes.

| Evento | Quando | Parâmetros |
|---|---|---|
| `form_open` | Abriu o formulário | `form_id`, `cta_position` |
| `form_start` | Mexeu no primeiro campo | `form_id`, `cta_position` |
| `form_error` | Tentou enviar com erro | `form_id`, `error_fields` |
| `generate_lead` | Envio válido | `form_id`, `cta_position`, campos de qualificação não sensíveis, `ec_phone_sha256` |
| `whatsapp_click` | Seguiu para o WhatsApp | `cta_position`, `link_url` |
| `section_view` | Viu uma seção-chave por 1 s | `section_name` |
| `consent_update` | Escolheu no aviso de cookies | `consent_analytics`, `consent_marketing` |

Nome nunca vai ao `dataLayer`. Telefone só em SHA-256 (formato `+55DDDNÚMERO`), para as conversões otimizadas do Google Ads, apagado logo depois do evento. **Saúde:** sintoma, queixa ou tratamento de interesse não vão às plataformas; perfil de quem será atendido (o próprio, pai ou mãe, outro familiar) e se tem plano podem ir. Escreva o passo a passo do painel do GTM em `docs/` para o gestor de tráfego, com os nomes exatos que o site envia.

## Equipe e áreas de atuação

- Seção **Quem somos** com um cartão por profissional: `<article class="membro" data-membro="slug">` com foto (com autorização), nome, "Fisioterapeuta", CREFITO, formação e **áreas de atuação** (nunca "especialidade" nem "especialista" sem título e RQE confirmados).
- Cada serviço lista quem atende por `data-atende="slug1 slug2"`, ligado aos mesmos `slug` dos cartões; um pequeno JavaScript pode montar a lista de nomes, mas o HTML já deve ser legível sem ele.
- Dado que falta vira `[PENDENTE: …]` visível dentro do cartão e entra no README. Nenhum nome, número de CREFITO ou título inventado.
- A equipe fica num bloco só do `index.html`, fácil de editar, com um comentário explicando onde mexer.
- Imagens de pessoas: WebP, `alt` com o nome e a função, e só depois da autorização escrita de cada pessoa.

## CSS

- Tokens em `:root` (cores, fontes, raio, sombras, `--ease`, `--header-h`, `--gutter`), nomes em português.
- Mobile-first; `overflow-x` controlado; `scroll-padding-top` igual à altura do menu.
- Animações só com `transform` e `opacity`, desligadas em `prefers-reduced-motion`.
- Microinterações de `hover` só em `@media (hover: hover)`.

## Acessibilidade

`:focus-visible` em tudo que é clicável (inclusive dentro do formulário) · contraste AA · textos alternativos descritivos (imagem decorativa com `alt=""`) · áreas de toque de pelo menos 44 px · menu móvel que fecha com `Esc`, toque fora e trava a rolagem do fundo · FAQ com `button` e `aria-expanded`.

## Performance

Imagens em WebP com `width` e `height` declarados, `loading="lazy"` fora do topo, `preload` só da imagem do topo, nada de bibliotecas externas de JavaScript. Widgets de terceiros (avaliações, mapa) carregam sem atrasar o topo.

## Termos e conteúdos a procurar antes de cada prévia

```bash
grep -rniE "melhor|únic[oa]|pioneir|perfeit|revolucion|garant|sem dor|grátis|gratuit|desconto|promo|parcel|cashback|R\\$|antes e depois" --include=*.html .
grep -rn "PENDENTE" --include=*.html .
```

Cada ocorrência precisa de justificativa ou sai. Todo `PENDENTE` precisa estar na lista do README.

## Publicação

GitHub Pages a partir da `main`. Domínio próprio: arquivo `CNAME`, registros `A` para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`, `CNAME` do `www` para `<usuário>.github.io`, verificação do domínio no GitHub e HTTPS obrigatório. Os endereços em `canonical`, `og:url`, `og:image` e no `ld+json` precisam ser o endereço final.

## README

Mesmo formato das LPs anteriores: sobre o projeto, funcionalidades por seção, identidade visual, tecnologias, estrutura, responsividade, acessibilidade e performance, como rodar localmente, publicação, rastreamento e cookies, manutenção (onde mexer em cada coisa), **pendências de conteúdo** em lista de tarefas, autor e licença.
