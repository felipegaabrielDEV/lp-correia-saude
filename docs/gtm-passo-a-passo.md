# Passo a passo do Google Tag Manager — site da Correia

**Para:** o gestor de tráfego.
**Versão:** 1.0 · 26/11/2026 (prévia 1, ainda sem contêiner).
**Base:** o que o site **realmente envia** hoje (`eventos.js`, `lead-form.js`, `consent.js`). Se um desses arquivos mudar, este guia muda junto.
**Regra geral:** nenhuma senha ou token no GTM nem no site. Onde aparece `[ENTRE_COLCHETES]`, é informação que ainda falta.

> Os identificadores (GTM, GA4, Meta Pixel, Clarity, Google Ads) são **da Correia**, em contas próprias. Não reaproveitar os de outro site ou outro cliente, nem os do site pessoal da Júlia.

---

## 1. Como o site funciona

**Todo botão de WhatsApp abre um formulário curto** (4 perguntas). Quem envia o formulário segue para o WhatsApp com a mensagem pronta. Por isso:

- **`generate_lead` = formulário enviado = Lead.** É a conversão principal.
- **`click_whatsapp` = seguiu para o WhatsApp = Contact.** Dispara logo depois de cada `generate_lead`. Quem navega sem JavaScript vai direto ao WhatsApp, e aí nada é medido.
- O agendamento acontece na conversa, fora do site. Se for medir agendamento, é pelo atendimento ou CRM (importação offline), não por tag.

---

## 2. Identificadores

| Serviço | ID | Onde fica |
|---|---|---|
| Google Tag Manager | `[ID_GTM]` (o gestor cria o contêiner) | `index.html`: trecho `GTM_ID` no `<head>` e o `<noscript>` logo depois do `<body>`. Enquanto estiver vazio, nada é carregado |
| Google Analytics 4 | `[ID_GA4]` | **Só no GTM** |
| Meta Pixel | `[ID_META_PIXEL]` | **Só no GTM** |
| Microsoft Clarity | `[ID_CLARITY]` | **Só no GTM** |
| Google Ads | `[ID_GOOGLE_ADS]` e `[ROTULO_CONVERSAO]` | Quando houver campanha |

---

## 3. Eventos que o site envia ao `dataLayer`

Todos, menos o `consent_update`, levam `event_id` (único), para as plataformas não contarem duas vezes e para deduplicar com a Conversions API, se ela for ativada.

| Evento | Quando | Parâmetros |
|---|---|---|
| `form_open` | Abriu o formulário | `form_id`, `cta_position` |
| `form_start` | Mexeu no primeiro campo | `form_id`, `cta_position` |
| `form_error` | Tentou enviar com erro | `form_id`, `error_fields` |
| `generate_lead` | **Envio válido** | `form_id`, `cta_position`, `perfil_paciente`, `convenio`, `visit_origin`, `ec_phone_sha256` |
| `click_whatsapp` | Seguiu para o WhatsApp | `cta_position`, `link_url` |
| `section_view` | Viu metade de uma seção por 1 s (uma vez por visita) | `section_name` |
| `consent_update` | Escolheu no aviso de cookies | `consent_analytics`, `consent_marketing` |

**Valores possíveis**

- `form_id`: sempre `whatsapp_lead`.
- `cta_position` (o botão que abriu o formulário): `menu`, `menu_mobile`, `hero`, `para_quem`, `como_funciona`, `cuidados`, `quem_somos`, `regiao`, `plano`, `horarios`, `faq`, `cta_final`, `rodape`, `botao_flutuante`. A posição nunca carrega queixa nem tratamento de interesse.
- `perfil_paciente`: `proprio`, `pai_mae` ou `outro_familiar`.
- `convenio`: `plano`, `particular` ou `nao_sei`.
- `visit_origin`: `meta_ads`, `google_ads`, `instagram_bio`, `google_perfil` ou `direto`, lido das UTMs (seção 9).
- `error_fields`: campos com erro, separados por vírgula: `paciente`, `convenio`, `nome`, `whatsapp`.
- `section_name`: `para_quem`, `em_numeros`, `como_funciona`, `cuidados`, `quem_somos`, `o_que_nos_liga`, `atendimento`, `duvidas`.
- `link_url`: o endereço do WhatsApp **sem** a mensagem (só `https://wa.me/<número>` ou o link da Tintim).
- `ec_phone_sha256`: telefone embaralhado (SHA-256 de `+55DDDNÚMERO`), só para as conversões otimizadas do Google Ads. É apagado do `dataLayer` logo depois do evento.

**Nunca chega ao `dataLayer`:** nome, telefone em texto aberto, texto da mensagem, sintoma, queixa, tratamento de interesse.

---

## 4. Consentimento (já pronto no site)

O site começa com **tudo negado** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`), com `wait_for_update: 500` e `ads_data_redaction: true`. A escolha fica salva no navegador (`localStorage`, chave `correia_consent`) e é reaplicada no `<head>`, antes do GTM, nas visitas seguintes.

| Escolha no aviso | Atualiza | Libera |
|---|---|---|
| Estatística | `analytics_storage` | GA4 e Clarity |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` | Meta Pixel e Google Ads |

Se a pessoa retirar uma permissão em "Preferências de cookies" (rodapé), o site apaga os cookies daquela categoria e recarrega a página.

---

## 5. Variáveis

**Constantes**

| Nome | Valor |
|---|---|
| `C - GA4 ID` | `[ID_GA4]` |
| `C - Meta Pixel ID` | `[ID_META_PIXEL]` |
| `C - Clarity ID` | `[ID_CLARITY]` |
| `C - Google Ads ID` | `[ID_GOOGLE_ADS]` (só os números) |

**Variáveis da camada de dados** (versão 2). Nome = `DLV - ` + chave:

`event_id` · `form_id` · `cta_position` · `perfil_paciente` · `convenio` · `visit_origin` · `error_fields` · `link_url` · `section_name` · `consent_analytics` · `consent_marketing` · `ec_phone_sha256`

**JavaScript personalizado** `JS - Dados EC Google Ads` (para quando o Google Ads entrar):

```js
function () {
  var h = {{DLV - ec_phone_sha256}};
  return h ? { sha256_phone_number: h } : undefined;
}
```

---

## 6. Acionadores

| Nome | Tipo | Condição |
|---|---|---|
| `CE - consent_update` | Evento personalizado | `consent_update` |
| `CE - generate_lead` | Evento personalizado | `generate_lead` |
| `CE - click_whatsapp` | Evento personalizado | `click_whatsapp` |
| `CE - form_open` | Evento personalizado | `form_open` |
| `CE - form_start` | Evento personalizado | `form_start` |
| `CE - form_error` | Evento personalizado | `form_error` |
| `CE - section_view` | Evento personalizado | `section_view` |
| `Inicialização - Todas as páginas` | Inicialização | todas |
| `Todas as páginas` | Visualização de página | todas |

---

## 7. Tags

Em cada tag: **Configurações avançadas → Configurações de consentimento → "Exigir consentimento adicional"** com o tipo indicado.

Nas tags de carregamento (Google tag, Meta Base, Clarity), use **"Opções de disparo: uma vez por página"** com o acionador de página **e** o `CE - consent_update`. Assim, quem aceita o aviso no meio da visita passa a ser medido sem recarregar.

| Tag | Tipo | Acionador | Consentimento | Configuração |
|---|---|---|---|---|
| **GA4 - Google tag** | Tag do Google | Inicialização + `CE - consent_update` (uma vez por página) | `analytics_storage` | ID `{{C - GA4 ID}}`. No GA4: **Google Signals desligado** |
| **GA4 - generate_lead** | Evento do GA4 | `CE - generate_lead` | `analytics_storage` | Nome `generate_lead`; parâmetros `form_id`, `cta_position`, `perfil_paciente`, `convenio`, `visit_origin`. **Não** enviar `ec_phone_sha256`. No GA4, marcar `generate_lead` como **evento principal** |
| **GA4 - interações** | Evento do GA4 | `CE - click_whatsapp`, `CE - form_open`, `CE - form_start`, `CE - form_error`, `CE - section_view` | `analytics_storage` | Nome `{{Event}}`; parâmetros `cta_position`, `form_id`, `section_name`, `error_fields` |
| **Meta - Base + PageView** | HTML personalizado | Todas as páginas + `CE - consent_update` (uma vez por página) | `ad_storage` | código 8.1 |
| **Meta - Lead** | HTML personalizado | `CE - generate_lead` | `ad_storage` | código 8.2 · Sequenciamento: depois de "Meta - Base + PageView" |
| **Meta - Contact** | HTML personalizado | `CE - click_whatsapp` | `ad_storage` | código 8.3 · mesmo sequenciamento |
| **Clarity** | HTML personalizado | Todas as páginas + `CE - consent_update` (uma vez por página) | `analytics_storage` | código 8.4 |
| **Ads - Formulário enviado** *(quando houver o ID)* | Acompanhamento de conversões do Google Ads | `CE - generate_lead` | `ad_storage`, `ad_user_data` | ID `{{C - Google Ads ID}}`, rótulo `[ROTULO_CONVERSAO]`, ID da transação `{{DLV - event_id}}`, "Incluir dados fornecidos pelo usuário" → código com `{{JS - Dados EC Google Ads}}` |
| **Ads - Vinculador** *(quando houver o ID)* | Vinculador de conversões | Todas as páginas + `CE - consent_update` (uma vez por página) | `ad_storage` | — |

---

## 8. Códigos das tags HTML

**8.1 Meta - Base + PageView**
```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('set', 'autoConfig', false, '{{C - Meta Pixel ID}}'); // não coleta cliques e textos da página sozinho
fbq('init', '{{C - Meta Pixel ID}}');
fbq('track', 'PageView');
</script>
```

**8.2 Meta - Lead.** Para a Meta vai **só o nome do evento e o `event_id`**. Posição do botão, quem será atendido e plano ou particular ficam só no GA4: o site atende pessoas idosas, e o perfil cruzado com a página pode sugerir condição de saúde.
```html
<script>
fbq('track', 'Lead', {}, { eventID: {{DLV - event_id}} });
</script>
```

**8.3 Meta - Contact** (mesma regra: só o evento e o `event_id`)
```html
<script>
fbq('track', 'Contact', {}, { eventID: {{DLV - event_id}} });
</script>
```

**8.4 Clarity**
```html
<script>
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "{{C - Clarity ID}}");
</script>
```

No painel do Clarity: **Configurações → Mascaramento → "Rígido" (Strict)**. A janela do formulário já tem `data-clarity-mask="true"`, mas o modo rígido protege também o resto da página.

---

## 9. Origem da visita (UTMs) e Tintim

O site lê `utm_source` e `utm_medium` na chegada, guarda a origem só durante a visita (`sessionStorage`, chave `correia_origin`) e a envia em `visit_origin` no `generate_lead`. Para cada campanha cair na origem certa, use:

| Origem | `utm_source` | `utm_medium` |
|---|---|---|
| Anúncio do Meta | `facebook` ou `instagram` | `paid_social` |
| Google Ads | `google` | `cpc` |
| Bio do Instagram | `instagram` | `organic` |
| Perfil do Google | `google` | `organic` |

`utm_campaign` nunca leva nome de condição ou tratamento (ex.: `correia_aracaju_dez`, nunca `avc_idoso`).

**Tintim:** quando houver os links por origem, eles entram em `LINKS_POR_ORIGEM`, no `lead-form.js` (`meta_ads`, `google_ads`, `instagram_bio`, `google_perfil`). Sem link para a origem, vale o WhatsApp padrão.

---

## 10. Testes no modo "Visualizar" (antes de publicar o contêiner)

Abra o modo Visualizar do GTM com o endereço da prévia: `[ENDEREÇO_DA_PRÉVIA]`.

1. **Antes de escolher no aviso:** nenhuma tag de GA4, Meta ou Clarity dispara. No Tag Assistant, o consentimento aparece todo como `denied`.
2. **"Recusar":** continua tudo bloqueado.
3. **"Personalizar" → só Estatística:** GA4 e Clarity disparam; Meta não.
4. **"Aceitar":** GA4, Meta e Clarity disparam uma vez cada, sem recarregar a página.
5. **Formulário:** clique em qualquer botão de WhatsApp → `form_open`; preencha → `form_start`; envie vazio → `form_error`; envie certo → `generate_lead` e `click_whatsapp`, **uma vez cada**. Confira o mesmo `event_id` no GA4 (DebugView) e no Meta (Gerenciador de Eventos → Testar eventos).
6. **Rolagem:** cada seção dispara `section_view` uma única vez.
7. **"Preferências de cookies" (rodapé) → desmarcar tudo → Salvar:** a página recarrega e nada mais dispara.

---

## 11. Pontos de atenção

1. **Não instalar GA4, Pixel ou Clarity direto no código.** Tudo pelo GTM, senão duplica.
2. **Tokens (Conversions API e afins):** só no servidor. Nunca no site, no GTM web ou em documento.
3. **Google Search Console:** verificação pelo registro TXT no DNS do domínio. Alternativa: meta tag de verificação no site.
4. **Dados de saúde:** não criar variáveis com o texto da mensagem do WhatsApp nem com queixa ou tratamento de interesse.
5. **Regras do projeto:** Meta e Google Ads recebem só o nome do evento e o `event_id` (o Google Ads também o telefone em SHA-256, com consentimento de marketing); posição do botão, perfil e convênio vão só ao GA4; Google Signals e autoConfig do Pixel desligados.

## 12. O que falta

- [ ] Contas da Correia: GTM, GA4, Meta Pixel, Clarity (e Google Ads, se houver campanha).
- [ ] Domínio e endereço da prévia.
- [ ] Links da Tintim por origem, se for usar.
- [ ] Registro TXT do Search Console no DNS.
