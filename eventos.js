/* ==========================================================================
   Eventos da página para o Google Tag Manager (dataLayer)
   O site só AVISA o que aconteceu. Quem decide o que vai para GA4, Meta Pixel e
   Clarity é o painel do GTM, sempre respeitando o aviso de cookies (consent.js).
   Passo a passo para o gestor de tráfego: docs/gtm-passo-a-passo.md (mude o guia junto se mudar um evento).

   Cada evento leva um event_id único, para as plataformas não contarem a mesma
   ação duas vezes. Eventos do formulário (lead-form.js): form_open, form_start,
   form_error, generate_lead e click_whatsapp. Aqui: section_view.
   Nunca entra no dataLayer: nome, telefone em texto aberto, queixa, sintoma ou
   tratamento de interesse (dado de saúde não vai para plataformas de anúncio).
   ========================================================================== */
(function () {
    "use strict";
    const dataLayer = window.dataLayer = window.dataLayer || [];

    const uuid = () => (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 3 | 8)).toString(16);
        });

    window.correiaTrack = (evento, params = {}) => {
        const eventId = uuid();
        dataLayer.push({ event: evento, event_id: eventId, ...params });
        return eventId;
    };

    /* Seção vista: metade da seção (ou da tela, se a seção for maior) visível por 1 segundo, uma vez por visita.
       Para medir outra seção, acrescente aqui o seletor e o nome. */
    const secoes = [
        { seletor: "#para-quem", nome: "para_quem" },
        { seletor: "#numeros", nome: "em_numeros" },
        { seletor: "#como-funciona", nome: "como_funciona" },
        { seletor: "#cuidados", nome: "cuidados" },
        { seletor: "#quem-somos", nome: "quem_somos" },
        { seletor: "#valores", nome: "o_que_nos_liga" },
        { seletor: "#atendimento", nome: "atendimento" },
        { seletor: "#duvidas", nome: "duvidas" }
    ];
    if (!("IntersectionObserver" in window)) return;

    secoes.forEach(({ seletor, nome }) => {
        const el = document.querySelector(seletor);
        if (!el) return;
        let timer = null;
        const obs = new IntersectionObserver(entradas => entradas.forEach(en => {
            const base = Math.min(en.boundingClientRect.height, window.innerHeight) || 1;
            const visivel = en.isIntersecting && en.intersectionRect.height / base >= .5;
            if (visivel && !timer) {
                timer = setTimeout(() => { obs.disconnect(); window.correiaTrack("section_view", { section_name: nome }); }, 1000);
            } else if (!visivel && timer) {
                clearTimeout(timer);
                timer = null;
            }
        }), { threshold: [0, .25, .5, .75, 1] });
        obs.observe(el);
    });
})();
