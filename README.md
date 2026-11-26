# Correia — Landing Page | Fisioterapia domiciliar para idosos

> 🚧 **Em preparação (fase 1: Preparação).** Ainda não há site: este repositório tem o kit de trabalho adaptado para a empresa. Toda página publicada leva `noindex, nofollow` até a aprovação final.

Landing page da **empresa Correia**, de fisioterapia domiciliar para pessoas idosas em Aracaju/SE, fundada pela fisioterapeuta **Júlia Gabriely** (CREFITO-17 408355-F) e com equipe de fisioterapeutas: levar a pessoa certa a agendar a avaliação pelo WhatsApp, e mostrar **quem da equipe atende o quê**.

> Este é o site da **empresa**. O site profissional da Júlia (marca pessoal) é outro projeto, em `felipegaabrielDEV/lp-julia-fisioterapia`. Não misturar textos, fotos, marca nem pendências.

## Situação

| Fase | Estado |
|---|---|
| 1. Preparação | Em andamento: pasta no Drive criada, repositório criado, kit adaptado. Faltam nome oficial, dados da empresa e domínio |
| 2. Questionários | Os 4 da empresa foram criados e o "Nosso levantamento" foi preenchido (dados públicos, normas e concorrentes, em 25 e 26/11/2026). Aguardam as respostas da Júlia |
| 3. Roteiro | Depende das respostas |
| 4 em diante | Não iniciadas |

## O que o site terá (plano, a validar no briefing)

Página única, no padrão das LPs anteriores: topo · sinais que a família reconhece · como a equipe avalia · serviços, cada um com quem atende · atendimento em casa · região atendida · **Quem somos (Júlia e a equipe, com CREFITO e área de atuação)** · primeira avaliação · planos de saúde (se liberados) · perguntas frequentes · chamada final · rodapé com dados da empresa.

Formulário curto antes do WhatsApp, aviso de cookies (LGPD) com tudo negado por padrão, política de privacidade, página 404, GTM com Modo de Consentimento e links da Tintim por origem.

## Identidade visual

"Correia · Longevidade & Saúde", com o monograma "C" de elos. Paleta oficial: `#3E431B` verde-oliva escuro · `#908F68` verde-sálvia · `#F5EEDD` creme · `#A76F4E` marrom. Tom: tradicional, acessível, madura e emocional; nada delicado nem infantil. Fontes: PENDENTES (usar equivalentes do Google Fonts e avisar). Os arquivos da marca ficam **fora do repositório** (`assets/marca/` no `.gitignore`) até o Felipe confirmar o pagamento e a aprovação final com a designer.

## Estrutura

```
├── CLAUDE.md        # Regras do projeto (leia primeiro)
├── .claude/         # Skills (briefing, referencias, construir-site, previa) e agentes (pesquisador, revisor)
│   └── skills/construir-site/  # padrao-tecnico.md e capturar.js
├── ferramentas/     # gerar-previa-privada.py (prévia em arquivo único, para mostrar antes de publicar)
├── docs/            # (a criar) sites-espelho e passo a passo do GTM
└── .gitignore
```

O site em si (`index.html`, `styles.css`, scripts, política e 404) será construído na fase 3, a partir do padrão técnico.

## Como trabalhar

1. Abra o Claude Code neste repositório e siga o `CLAUDE.md`.
2. Fase 1 (briefing): `/briefing`. Fase 2 (referências): `/referencias`. Fase 3: `/construir-site`. Prévias: `/previa`.
3. Documentos estratégicos (briefing, concorrentes, contrato) ficam no **Drive**, nunca aqui.

## Pendências de conteúdo

**Empresa**
- [PENDENTE] Nome oficial no site (versões em uso: "Correia Saúde", "Correia Saúde & Longevidade para Idosos", "Correia - Saúde & Longevidade" e "Correia · Longevidade & Saúde")
- [PENDENTE] CNPJ, razão social, CREFITO da empresa e responsável técnico
- [PENDENTE] Se há sede e endereço (em abril/2026 não havia espaço físico) ou só atendimento domiciliar
- [PENDENTE] Bairros e região atendidos em Aracaju/SE
- [PENDENTE] Serviços completos e perfis de paciente atendidos
- [PENDENTE] Planos de saúde atendidos e autorização para usar as logos
- [PENDENTE] Horários de atendimento
- [PENDENTE] WhatsApp definitivo e link completo da Tintim por origem
- [PENDENTE] E-mail definitivo da empresa
- [PENDENTE] Papel do Grupo Correia no site
- [PENDENTE] Domínio (Registro.br, em nome do titular da empresa)
- [PENDENTE] Controlador dos dados e e-mail de contato para a política de privacidade (revisão jurídica)

**Equipe e Júlia**
- [PENDENTE] Ficha de cada fisioterapeuta da equipe (5 confirmadas pela Júlia): nome como quer aparecer, CREFITO, formação, áreas de atuação, o que não atende
- [PENDENTE] Foto de cada pessoa e autorização escrita para usar a imagem
- [PENDENTE] Se alguma profissional tem título de especialista e RQE (a Júlia não tem; nunca usar "especialista" sem título registrado)
- [PENDENTE] Situação da pós-graduação da Júlia em Saúde do Idoso e Gerontologia (concluída ou em andamento) e uso de "em especialização"
- [PENDENTE] Confirmar o uso de "Dra." junto ao CREFITO

**Marca**
- [PENDENTE] Confirmar pagamento integral e aprovação final da identidade com a designer (condição de uso dos arquivos)
- [PENDENTE] Arquivos finais da marca: vetores (SVG/AI), símbolo com fundo transparente, logotipo vertical e fontes com licença
- [PENDENTE] Nomes das fontes tipográficas da marca
- [PENDENTE] Papel do mockup de aplicações (imagens de banco; não usar no site sem conferir a licença)

**Normas e fotos**
- [PENDENTE] Registrar a empresa no CREFITO-17 e obter o número de registro (obrigatório; o CREFITO-17 não atende nem processa registros de 23 a 27/11/2026, por migração de sistema)
- [PENDENTE] Confirmar por escrito com o CREFITO-17 os pontos da seção "Normas lidas" que ficaram em dúvida (lista ao fim dela)
- [PENDENTE] Fotos e vídeos de atendimento e de eventos: autorização escrita de quem aparece e conferência da norma. Posts de alta, depoimentos e o destaque "Feedback" do Instagram não vão ao site sem isso
- [PENDENTE] Respostas dos 4 questionários da empresa (Profissional, Persona, Mercado, Concorrentes)

**Rastreamento (depois)**
- [PENDENTE] ID do Google Tag Manager (gestor de tráfego) e conferência das tags no painel
- [PENDENTE] Dados para o Google (`ld+json`, `canonical`, `og:*`, `sitemap.xml`): endereço ou área de atendimento, horários e domínio final

## Normas lidas em fontes oficiais

Leitura da agência em 25 e 26/11/2026, em coffito.gov.br, crefito17.org.br e planalto.gov.br. **Não é parecer jurídico**: serve de regra de trabalho até a confirmação por escrito com o CREFITO-17.

- **Publicidade:** nome, profissão e número do CREFITO são obrigatórios (Código de Ética, Resolução COFFITO 424/2013, art. 48). Promessa de resultado infalível e sensacionalismo são vedados (arts. 15 e 46; Resolução 532/2021, art. 3º). Publicações de imagens, textos e áudios levam nome, CREFITO e data (Resolução 532/2021, art. 4º). Nenhuma norma nova de publicidade apareceu nas resoluções de 2024 a 2026.
- **Preço:** o art. 40, I do Código veda afixar valor de honorários fora do local da assistência. A cartilha do CREFITO-16 (jan/2026; outro estado, não vinculante em Sergipe) lê o artigo de forma ampla. Padrão do projeto: sem preço, desconto, parcelamento nem "grátis".
- **Empresa:** a empresa de fisioterapia precisa de registro no CREFITO, inclusive a que atende em domicílio (Lei 6.316/1975, art. 12; Resolução COFFITO 565/2022, art. 8º). O número de registro da empresa deve constar em anúncio e propaganda (Resolução COFFITO 37/1984, art. 28). O responsável técnico é fisioterapeuta inscrito na região (Resolução COFFITO 139/1992). A palavra "fisioterapia" só pode ser usada por empresa registrada (Resolução COFFITO 80/1987, art. 5º). Razão social e CNPJ no rodapé são boa prática (Decreto 7.962/2013; a aplicação ao site é leitura nossa).
- **Título de especialista:** só com o título do COFFITO e o RQE (Resoluções COFFITO 627/2025, 630/2025 e 636/2025). A pós-graduação lato sensu é "especialização acadêmica" e não dá o título (Resolução 630/2025). A gerontologia é especialidade reconhecida (Resolução 476/2016): cuidado com a palavra.
- **Imagem, depoimento e antes e depois:** só com autorização prévia em termo de consentimento do paciente ou do representante legal (Resolução 532/2021, arts. 1º, 2º e 5º; Código, arts. 10, V e 15, V). Vale também para avaliações do Google reproduzidas no site (leitura nossa).
- **Equipe:** é vedado deixar o nome de alguém no quadro de um serviço em que não trabalha (Código, art. 25, VI).
- **Agulhamento seco:** reconhecido como recurso fisioterapêutico pelo Acórdão COFFITO 481/2016; anulado em 2019 e, segundo o COFFITO, reafirmado pelo TRF1 em 28/04/2026 (acórdão não lido; pode caber recurso). Nunca chamar de "acupuntura".
- **Planos de saúde (ANS):** desde 01/08/2022 não há limite de sessões de fisioterapia (RN 541/2022). A atenção domiciliar não é cobertura obrigatória, salvo contrato ou Rol (parecer técnico da ANS de 2024): o site não diz que "o plano cobre".

**A confirmar por escrito com o CREFITO-17:** (1) como exibir o registro da empresa e se o nome do responsável técnico deve aparecer; (2) se o art. 29 da Resolução 37/1984 (logotipo e fotografia em anúncio) está em vigor; (3) como citar a pós-graduação lato sensu, concluída ou em andamento; (4) uso de "Dra."; (5) se avaliações e depoimentos pedem termo individual; (6) a situação do agulhamento seco depois da decisão do TRF1; (7) a situação do registro 408355-F (a consulta pública tem captcha).

## Autor

Projeto da agência do Felipe, para a Correia.
