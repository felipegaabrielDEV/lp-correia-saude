/* ==========================================================================
   Correia · Longevidade & Saúde — interações da página
   Menu, links do WhatsApp, "Quem atende" (a partir das fichas da equipe), perguntas
   frequentes, animações ao rolar e o botão da prévia que esconde os marcadores.
   O formulário antes do WhatsApp fica em lead-form.js, os eventos em eventos.js e
   o aviso de cookies em consent.js.
   ========================================================================== */
(function () {
    "use strict";
    document.documentElement.classList.add("js");
    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- WhatsApp ----------
       O número vem da meta tag "whatsapp-number" no <head>.
       Para mudar o texto de um botão, mexa em "mensagens" pela origem (data-wa-origin). */
    const numero = (document.querySelector('meta[name="whatsapp-number"]')?.content || "").replace(/\D/g, "");
    const base = "Olá! Vim pelo site da Correia e quero agendar uma avaliação de fisioterapia em casa.";
    const mensagens = {
        para_quem: "Olá! Vim pelo site da Correia e quero conversar sobre a fisioterapia em casa para um familiar.",
        como_funciona: "Olá! Vim pelo site da Correia e quero entender como funciona o atendimento em casa.",
        cuidados: "Olá! Vim pelo site da Correia e tenho uma dúvida sobre os cuidados da equipe.",
        quem_somos: "Olá! Vim pelo site da Correia e quero falar com a equipe.",
        regiao: "Olá! Vim pelo site da Correia e quero saber se vocês atendem no meu bairro.",
        plano: "Olá! Vim pelo site da Correia e quero saber sobre o atendimento em casa pelo meu plano de saúde.",
        horarios: "Olá! Vim pelo site da Correia e quero combinar um horário de atendimento em casa.",
        faq: "Olá! Vim pelo site da Correia e tenho uma dúvida sobre a fisioterapia em casa."
    };
    const linkWhats = origem => {
        const texto = encodeURIComponent(mensagens[origem] || base);
        return numero ? `https://wa.me/${numero}?text=${texto}` : `https://wa.me/?text=${texto}`;
    };
    // O formulário (lead-form.js) usa o mesmo número e as mesmas mensagens por origem.
    window.correiaWhats = { numero, mensagem: origem => mensagens[origem] || base };
    document.querySelectorAll("[data-wa]").forEach(el => {
        el.href = linkWhats(el.dataset.waOrigin);
        el.target = "_blank";
        el.rel = "noopener";
    });

    /* ---------- Quem atende cada cuidado ----------
       A fonte é o bloco da EQUIPE no index.html: cada ficha tem data-nome e data-areas (ex.: "neurologica prevencao").
       Cada cartão de Cuidados (data-cuidado) recebe a lista de quem atende. Sem ninguém confirmado, mostra a pendência.
       Sem JavaScript, o cartão mantém o link para Quem somos. */
    const membros = [...document.querySelectorAll("[data-membro]")]
        .map(m => ({ nome: (m.dataset.nome || "").trim(), areas: (m.dataset.areas || "").split(/\s+/).filter(Boolean) }))
        .filter(m => m.nome && m.areas.length);
    document.querySelectorAll("[data-cuidado]").forEach(cartao => {
        const alvo = cartao.querySelector("[data-quem-atende]");
        if (!alvo) return;
        const nomes = membros.filter(m => m.areas.includes(cartao.dataset.cuidado)).map(m => m.nome);
        alvo.textContent = "";
        const rotulo = document.createElement("strong");
        rotulo.textContent = "Quem atende: ";
        alvo.appendChild(rotulo);
        if (nomes.length) {
            const link = document.createElement("a");
            link.href = "#quem-somos";
            link.textContent = nomes.join(", ");
            alvo.appendChild(link);
        } else {
            const pend = document.createElement("span");
            pend.className = "pendente";
            pend.textContent = "[PENDENTE: fisioterapeutas desta área]";
            alvo.appendChild(pend);
        }
    });

    /* ---------- Menu ---------- */
    const topo = document.getElementById("topo");
    const botaoMenu = document.querySelector(".menu-botao");
    const menuMovel = document.getElementById("menu-movel");
    const abrirMenu = abrir => {
        botaoMenu.setAttribute("aria-expanded", String(abrir));
        botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
        menuMovel.hidden = !abrir;
        document.body.classList.toggle("menu-aberto", abrir);
    };
    botaoMenu.addEventListener("click", () => abrirMenu(menuMovel.hidden));
    menuMovel.addEventListener("click", e => { if (e.target.closest("a")) abrirMenu(false); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && !menuMovel.hidden) { abrirMenu(false); botaoMenu.focus(); }
    });
    const aoRolar = () => topo.classList.toggle("rolou", window.scrollY > 10);
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();

    // Destaca no menu a seção que está na tela.
    const linksMenu = [...document.querySelectorAll(".menu a")];
    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver(entradas => {
            entradas.forEach(en => {
                if (!en.isIntersecting) return;
                linksMenu.forEach(a => a.classList.toggle("ativo", a.getAttribute("href") === "#" + en.target.id));
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        linksMenu.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) obs.observe(s); });
    }

    /* ---------- Perguntas frequentes: só uma aberta por vez ---------- */
    const botoesFaq = document.querySelectorAll(".faq-item button");
    botoesFaq.forEach(botao => {
        botao.addEventListener("click", () => {
            const abrir = botao.getAttribute("aria-expanded") !== "true";
            botoesFaq.forEach(outro => {
                outro.setAttribute("aria-expanded", "false");
                outro.closest(".faq-item").classList.remove("aberto");
            });
            botao.setAttribute("aria-expanded", String(abrir));
            botao.closest(".faq-item").classList.toggle("aberto", abrir);
        });
    });

    /* ---------- Topo: o título aparece palavra por palavra e depois o resto da dobra ----------
       Cada palavra do título (data-palavras) vira um <span class="palavra"> com atraso próprio (--k).
       A classe .pronto na seção dispara a entrada de tudo, inclusive os elos em volta da foto (o CSS cuida do movimento). */
    const hero = document.querySelector(".hero");
    const titulo = document.querySelector("[data-palavras]");
    if (titulo && !reduzMovimento) {
        let k = 0;
        const quebrar = no => [...no.childNodes].forEach(filho => {
            if (filho.nodeType === 3) {
                const frag = document.createDocumentFragment();
                filho.textContent.split(/(\s+)/).forEach(parte => {
                    if (!parte.trim()) { frag.appendChild(document.createTextNode(parte)); return; }
                    const sp = document.createElement("span"); sp.className = "palavra"; sp.style.setProperty("--k", k++); sp.textContent = parte; frag.appendChild(sp);
                });
                no.replaceChild(frag, filho);
            } else if (filho.nodeType === 1) quebrar(filho);
        });
        quebrar(titulo);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => hero && hero.classList.add("pronto")));

    /* ---------- Barra de progresso da leitura ---------- */
    const barra = document.querySelector(".progresso");
    if (barra) {
        const atualizarBarra = () => {
            const alto = document.documentElement.scrollHeight - window.innerHeight;
            barra.style.setProperty("--p", alto > 0 ? Math.min(1, window.scrollY / alto).toFixed(4) : 0);
        };
        window.addEventListener("scroll", atualizarBarra, { passive: true });
        window.addEventListener("resize", atualizarBarra);
        atualizarBarra();
    }

    /* ---------- Como funciona: a linha enche conforme a pessoa rola e o passo no meio da tela "acende" ---------- */
    const listaPassos = document.querySelector(".passos");
    if (listaPassos) {
        const passos = [...listaPassos.querySelectorAll(".passo")];
        const quadro = () => {
            const r = listaPassos.getBoundingClientRect();
            const alvo = window.innerHeight * 0.55;
            const p = Math.max(0, Math.min(1, (alvo - r.top) / r.height));
            listaPassos.style.setProperty("--prog", p.toFixed(3));
            passos.forEach(pa => { const b = pa.getBoundingClientRect(); pa.classList.toggle("em-foco", b.top < alvo && b.bottom > alvo - 40 || b.bottom < alvo); });
        };
        window.addEventListener("scroll", quadro, { passive: true });
        window.addEventListener("resize", quadro);
        quadro();
    }

    /* ---------- Em números: o valor conta de zero até o final quando a seção entra na tela ----------
       O número final já está escrito no HTML (vale para quem reduz animações ou está sem JavaScript). */
    const contadores = document.querySelectorAll("[data-contar]");
    if (contadores.length && !reduzMovimento && "IntersectionObserver" in window) {
        const formatar = (valor, casas, sufixo) => valor.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas }) + (sufixo || "");
        const contar = el => {
            const alvo = parseFloat(el.dataset.contar), casas = parseInt(el.dataset.casas || "0", 10), sufixo = el.dataset.sufixo || "";
            const inicio = performance.now(), duracao = 1500;
            const quadro = agora => {
                const t = Math.min(1, (agora - inicio) / duracao);
                el.textContent = formatar(alvo * (1 - Math.pow(1 - t, 3)), casas, sufixo);
                if (t < 1) requestAnimationFrame(quadro);
            };
            requestAnimationFrame(quadro);
        };
        const obsContar = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { contar(en.target); obsContar.unobserve(en.target); } }), { threshold: .6 });
        contadores.forEach(el => obsContar.observe(el));
    }

    /* ---------- Revelar ao rolar (e desenhar os elos da chamada final) ---------- */
    const revelar = document.querySelectorAll(".revelar, .chamada, .ponte");
    if (reduzMovimento || !("IntersectionObserver" in window)) {
        revelar.forEach(el => el.classList.add("visivel"));
    } else {
        const obs = new IntersectionObserver(entradas => {
            entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visivel"); obs.unobserve(en.target); } });
        }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
        revelar.forEach(el => obs.observe(el));
    }

    /* ---------- Botões de chamada: a animação só roda enquanto o botão está na tela ----------
       O CSS pausa tudo o que tem a classe .parada (ver .botao-destaque no styles.css). */
    const botoesDestaque = document.querySelectorAll(".botao-destaque");
    if ("IntersectionObserver" in window && botoesDestaque.length) {
        const obsBotoes = new IntersectionObserver(es => es.forEach(en => en.target.classList.toggle("parada", !en.isIntersecting)), { rootMargin: "80px" });
        botoesDestaque.forEach(b => obsBotoes.observe(b));
    }

    /* ---------- Prévia: mostrar/ocultar marcadores de rascunho e pendência ---------- */
    const alternar = document.querySelector(".previa-alternar");
    if (alternar) {
        alternar.addEventListener("click", () => {
            const ocultar = document.body.classList.toggle("sem-marcadores");
            alternar.setAttribute("aria-pressed", String(!ocultar));
            alternar.querySelector("span").textContent = ocultar ? "mostrar marcadores" : "ocultar marcadores";
        });
    }

    const ano = document.querySelector("[data-ano]");
    if (ano) ano.textContent = new Date().getFullYear();
})();
