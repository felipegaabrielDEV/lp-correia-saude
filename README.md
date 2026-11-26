# Correia — Landing Page | Fisioterapia domiciliar para idosos

> 🚧 **Em preparação (fase 1: Preparação).** Ainda não há site: este repositório tem o kit de trabalho adaptado para a empresa. Toda página publicada leva `noindex, nofollow` até a aprovação final.

Landing page da **empresa Correia**, de fisioterapia domiciliar para pessoas idosas em Aracaju/SE, fundada pela fisioterapeuta **Júlia Gabriely** (CREFITO-17 408355-F) e com equipe de fisioterapeutas: levar a pessoa certa a agendar a avaliação pelo WhatsApp, e mostrar **quem da equipe atende o quê**.

> Este é o site da **empresa**. O site profissional da Júlia (marca pessoal) é outro projeto, em `felipegaabrielDEV/lp-julia-fisioterapia`. Não misturar textos, fotos, marca nem pendências.

## Situação

| Fase | Estado |
|---|---|
| 1. Preparação | Em andamento: pasta no Drive criada, repositório criado, kit adaptado. Faltam nome oficial, dados da empresa e domínio |
| 2. Questionários | Os 4 da empresa ainda não foram respondidos |
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
- [PENDENTE] Conferir por escrito as normas do COFFITO e do CREFITO, inclusive para pessoa jurídica (registro da empresa, responsável técnico, o que a divulgação deve mostrar)
- [PENDENTE] Fotos e vídeos de atendimento e de eventos: autorização escrita de quem aparece e conferência da norma. Posts de alta, depoimentos e o destaque "Feedback" do Instagram não vão ao site sem isso
- [PENDENTE] Respostas dos 4 questionários da empresa (Profissional, Persona, Mercado, Concorrentes)

**Rastreamento (depois)**
- [PENDENTE] ID do Google Tag Manager (gestor de tráfego) e conferência das tags no painel
- [PENDENTE] Dados para o Google (`ld+json`, `canonical`, `og:*`, `sitemap.xml`): endereço ou área de atendimento, horários e domínio final

## Autor

Projeto da agência do Felipe, para a Correia.
