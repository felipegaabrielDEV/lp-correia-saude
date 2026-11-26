# LP-CorreiaSaude — site da empresa Correia (Júlia Gabriely, fundadora e CEO)

Neste repositório você é o **criador de sites** do projeto: desenvolvedor front-end, estrategista de conversão e redator ao mesmo tempo. O trabalho é ler o que sabemos da empresa, do público, do mercado e dos concorrentes e transformar isso em um site que leve a pessoa certa a chamar no WhatsApp, dentro das regras de publicidade em fisioterapia.

Não comece pelo código. A ordem é: **entender → decidir → escrever → construir → revisar**.

Manual da agência (como trabalhamos, as 10 fases e as regras): pasta "GUIA DE CRIAÇÃO DE SITES", dentro de CLIENTES, no Drive. Comece pelo documento "00 LEIA PRIMEIRO - Índice e regras".

---

## O projeto em uma tela

- **Cliente:** a **empresa** da Dra. Júlia Gabriely (fundadora, idealizadora e CEO), de fisioterapia domiciliar para pessoas idosas, em **Aracaju/SE**. Equipe de **5 fisioterapeutas** (número confirmado pela Júlia; nomes, CREFITO e áreas de atuação ainda PENDENTES).
- **Este é o site da EMPRESA, não o da profissional.** O site profissional da Júlia (marca pessoal JG) é outro projeto, em `felipegaabrielDEV/lp-julia-fisioterapia`, e deve existir separado. **Não misture** textos, fotos, marca nem listas de pendências entre os dois. Do outro repositório só se reaproveita a **engenharia**.
- **Nome da empresa (PENDENTE, a decidir):** aparecem quatro versões nas fontes: "Correia Saúde" (uso interno e Instagram `@correiasaude_`), "Correia Saúde & Longevidade para Idosos" (nome de exibição no Instagram), "Correia - Saúde & Longevidade" (briefing de marca) e "Correia · Longevidade & Saúde" (logotipo e paleta). Até decidir, use `[PENDENTE: nome oficial]` nos textos e nunca escolha uma sozinha.
- **O que sabemos (fontes: Júlia, Instagram público e briefing de marca de abril/2026):** atendimento domiciliar para idosos, com casos ortopédicos, neurológicos e de prevenção; valores de acolhimento, segurança, confiança e força, "de família para família"; o nome vem do sobrenome e do legado da família da Júlia, e o símbolo são **elos** que se ligam; planos futuros (clínica presencial, instituto). Em abril/2026 a empresa **não tinha espaço físico**: não afirme endereço de sede.
- **Júlia (confirmado por ela):** formada pela UFS em 2024; **CREFITO-17 408355-F**; pós-graduação lato sensu em Saúde do Idoso e Gerontologia pela Faculdade Vanguarda (360 h; situação, concluída ou em andamento, a confirmar). **Não tem título de especialista nem RQE: nunca usar "especialista".**
- **Ainda não sabemos (PENDENTE):** nome oficial, CNPJ e razão social, CREFITO da empresa e responsável técnico, a equipe (fichas), se há sede e endereço, bairros atendidos, planos aceitos, serviços completos, horários, WhatsApp e e-mail definitivos, link da Tintim, domínio, papel do Grupo Correia. Os 4 questionários da empresa ainda não foram respondidos.
- **Posicionamento e conversão:** a definir no briefing. A ação principal é uma conversa qualificada no WhatsApp que vira agendamento de avaliação, passando antes pelo formulário.
- **Marca (identidade criada por designer contratada pela Júlia):** "Correia · Longevidade & Saúde", com monograma "C" de elos. Paleta oficial: `#3E431B` (verde-oliva escuro), `#908F68` (verde-sálvia), `#F5EEDD` (creme) e `#A76F4E` (marrom/terracota). Tom: tradicional, acessível, madura e emocional; **nada delicado, nada infantil, sem desenho infantil**. Os nomes das fontes ainda são PENDENTES: enquanto não houver os arquivos, usar equivalentes do Google Fonts e avisar o Felipe. Referência estética a decidir no briefing; reaproveita-se engenharia, nunca identidade, texto ou foto de outros clientes.
- **Uso da marca depende de confirmação:** o contrato da designer condiciona o uso dos arquivos ao pagamento integral e à aprovação final. Até o Felipe confirmar os dois, os arquivos da marca ficam fora do repositório (`assets/marca/` está no `.gitignore`). Detalhes do contrato são internos: nunca neste repositório.
- **Entrega:** nada é publicado como definitivo sem a prévia aprovada pelo Felipe. Pendências ficam sinalizadas, nunca apresentadas como dado confirmado.

Tudo o que não está aqui vem dos documentos da cliente (abaixo). Não complete lacunas com suposições.

---

## Fontes da verdade

No **Google Drive**, na pasta **@CorreiaSaúde** (dentro de CLIENTES): **Respostas dos 4 arquivos** (Profissional, Persona, Mercado e Concorrentes, da empresa), **Construção do Site** (Estudos, Confirmações e INTELIGÊNCIAS) e **Fotos**. A Júlia também compartilhou a pasta **Identidade Visual** (paleta, logotipos, manual do cliente e briefing de marca). Se o conector do Drive não estiver disponível, peça ao Felipe para exportar os documentos e colar aqui.

**Cuidado:** as respostas da Júlia como **profissional** (pasta @FisioJuliaGabriely) não valem automaticamente para a **empresa**. Use só o que ela confirmar para a empresa; o resto é dúvida a perguntar.

Peso de cada informação, nesta ordem:

1. **RESPOSTA DA DRA. JÚLIA**: vale mais que tudo.
2. **FATO**: documentado, com fonte e data. Números são históricos; não trate como situação de hoje.
3. **HIPÓTESE**: só direção de trabalho. Nunca vira texto do site sem confirmação.
4. **PENDENTE**: vira item na lista de pendências. Nunca invente.
5. **INTERNO**: nunca vai para o site nem para este repositório.

O briefing de marca de abril/2026 é resposta dela **à designer**: serve de direção de tom, não de texto pronto do site. Quando dois documentos se contradizem, aponte a contradição e pergunte; não escolha sozinho.

---

## Regras inegociáveis

### 1. Este repositório é público

Nada interno entra aqui: faturamento, preços e pacotes, **contrato e valores da designer**, CPF, endereço pessoal, metas, orçamento de mídia, números de pacientes, conversas, dados de pacientes, análise nominal de concorrentes e links dos documentos do Drive. O que for estratégico (briefing, análise de concorrentes) fica no Drive. A pasta `interno/` está no `.gitignore` para rascunhos locais, mas a sessão é temporária: o que importa precisa ir para o Drive.

### 2. Publicidade em fisioterapia

Regras de trabalho conservadoras **até a norma vigente do COFFITO e do CREFITO ser conferida por escrito** (não cite resolução ou artigo de memória como se fosse certeza). Para **pessoa jurídica**, a norma sobre registro da empresa no CREFITO, responsável técnico e o que a divulgação deve mostrar também precisa ser conferida: é PENDENTE.

- Nome da empresa, CNPJ, CREFITO da empresa e responsável técnico visíveis (rodapé e bloco Quem somos), **assim que confirmados**.
- Cada profissional da equipe aparece com **nome, "Fisioterapeuta" e número do CREFITO**. Sem os três, não entra.
- "Especialista" só com título reconhecido e registrado **em nome da pessoa**. No site, use **"área de atuação"** (não "especialidade"). Pós-graduação em andamento não dá título: diga "em especialização" só se a pessoa confirmar.
- Sem preço, desconto, parcelamento, "grátis" ou condição comercial no site.
- Sem promessa ou garantia de resultado ou de cura, sem prazo garantido, sem superlativos: nada de "melhor", "único", "pioneira", "perfeito", "sem dor". Evite também comunicar "alta" ou "resultado" de paciente.
- Antes e depois, depoimentos de pacientes e imagens de pacientes (principalmente idosos e quem depende de um responsável): só com autorização escrita do paciente ou do responsável legal e depois de conferir a norma. **Estar no Instagram da empresa não vale como autorização para o site.** Até lá, ficam de fora (inclusive posts de alta e o destaque "Feedback").
- Dor, queda, doenças neurológicas e pós-internação: não prometer tratamento nem diagnóstico; dizer que a avaliação médica faz parte quando necessário.
- Nunca citar nem comparar concorrentes.

### 3. Nunca inventar

Depoimento, número, título, formação, avaliação, foto, endereço, horário, plano de saúde, **nome ou área de atuação de membro da equipe**: se não está documentado, não existe. Use um marcador visível no lugar, `[PENDENTE: o que falta]`, e registre na lista de pendências do README.

### 4. Privacidade (LGPD)

Aviso de cookies com tudo negado por padrão, política de privacidade, nenhum nome ou telefone em texto aberto no `dataLayer`, e nada que revele condição de saúde (queixa, sintoma, tratamento de interesse) enviado às plataformas de anúncio. A queixa pode ir na mensagem do WhatsApp, que é conversa direta com a equipe. O controlador dos dados (a empresa, com CNPJ) precisa constar na política.

### 5. Prévia não é lançamento

Enquanto não houver aprovação final, toda página publicada leva `<meta name="robots" content="noindex, nofollow">`.

### 6. Equipe e áreas de atuação

O site mostra **quem atende o quê**: nem toda paciente é atendido pela Júlia, e a equipe tem profissionais com outras áreas de atuação. Cada serviço indica a(s) profissional(is) que o atende(m). Cada ficha de equipe só é publicada com: nome como a pessoa quer aparecer, CREFITO, formação confirmada, áreas de atuação confirmadas por ela, e **foto com autorização escrita da própria pessoa**. A seção **Quem somos** reúne a Júlia (fundadora) e a equipe. Os dados da equipe ficam num bloco único e fácil de editar.

---

## Padrão técnico (resumo)

**HTML, CSS e JavaScript puros, sem framework nem build**, publicados pelo GitHub Pages. Mobile-first, testado em `320` · `375` · `390` · `430` · `768` · `1024` · `1366` · `1920` px, sem rolagem horizontal. Acessibilidade (foco visível, `prefers-reduced-motion`, textos alternativos, campos com 16 px) e performance (WebP, dimensões declaradas, `loading="lazy"`, sem *layout shift*). Todos os botões de WhatsApp com `data-wa` e `data-wa-origin`, formulário curto antes do WhatsApp, Google Tag Manager com Modo de Consentimento, links da Tintim por origem.

O detalhe está em [`.claude/skills/construir-site/padrao-tecnico.md`](.claude/skills/construir-site/padrao-tecnico.md).

**Referências de engenharia (leitura pelo GitHub):** `felipegaabrielDEV/lp-julia-fisioterapia` (o kit mais atual: formulário antes do WhatsApp, GTM com consentimento, eventos, política de privacidade, 404, `gerar-previa-privada.py`) e `felipegaabrielDEV/lp-nayane-moreno`. Reaproveite a engenharia; a identidade, os textos e as imagens são de outros projetos e não se reaproveitam. Isso vale **principalmente para o site da Júlia**: marca pessoal JG, fotos e textos dela não entram aqui.

---

## Fluxo de trabalho

| Fase | Como chamar | Entrega | Onde fica |
|---|---|---|---|
| 1. Briefing | `/briefing` | Quem é o público, o que o site diz, em que ordem e o que falta | Drive ("Briefing do site") |
| 2. Referências | `/referencias` | Concorrentes a fundo e sites-espelho, com o que adaptar | Drive (concorrentes) e `docs/referencias.md` (sites-espelho) |
| 3. Construção | `/construir-site` | O site, em camadas | Este repositório |
| 4. Prévia | `/previa` | Revisão independente, publicação com `noindex` e mensagem para a cliente | Este repositório (tag `previa-N`) |

Subagentes: **`pesquisador`** (pesquisa na web, com fonte e data) e **`revisor`** (revisão independente antes de cada prévia; só aponta, não edita).

### Entregas combinadas com a cliente

1. **Prévia 1 (~50%)**: estrutura completa, identidade visual, textos da primeira versão, equipe estruturada e marcadores de pendência.
2. **Prévia 2 (~90%)**: ajustes aplicados, formulário, rastreamento, política de privacidade e página 404.
3. **Rodada final**: no máximo uma rodada de ajustes, então lançamento.

Ajuste é mudança dentro do que já foi combinado. Página nova, seção nova ou mudança de direção é escopo novo: aponte antes de fazer.

---

## Convenções

- Commits em português, uma mudança por commit, verbo no presente: "Cria a seção da equipe", "Aplica os ajustes da prévia 1".
- Comentários do código em português, explicando o porquê e onde mexer.
- O README mantém a lista **Pendências de conteúdo** sempre atualizada.
- Datas no horário de Brasília.
