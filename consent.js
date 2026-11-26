/* ==========================================================================
   Aviso de cookies (LGPD) e Modo de Consentimento do Google
   Tudo começa NEGADO (script no <head> do index.html, antes do GTM).
   A escolha fica salva só no navegador da pessoa (localStorage "correia_consent"):
     a = estatística (Google Analytics e Microsoft Clarity)
     m = marketing (Google Ads e Meta)
   Ao escolher, o script atualiza o Modo de Consentimento, avisa o GTM com o
   evento consent_update e avisa o resto da página com o evento "correia:consent".
   Pelo rodapé ("Preferências de cookies") a pessoa revê a escolha. Ao retirar uma
   permissão que tinha dado, os cookies daquela categoria são apagados e a página
   recarrega, para as ferramentas pararem de vez.
   Engenharia reaproveitada das LPs anteriores da agência.
   ========================================================================== */
(function () {
    "use strict";
    const CHAVE = "correia_consent";
    const aviso = document.getElementById("aviso-cookies");
    if (!aviso) return;

    const opcoes = aviso.querySelector(".cookie-opcoes");
    const estatistica = document.getElementById("cookie-estatistica");
    const marketing = document.getElementById("cookie-marketing");
    const botao = nome => aviso.querySelector(`[data-consent="${nome}"]`);
    const gtag = window.gtag || function () { (window.dataLayer = window.dataLayer || []).push(arguments); };

    const ler = () => {
        try { return JSON.parse(localStorage.getItem(CHAVE) || "null"); } catch (erro) { return null; }
    };
    window.correiaConsent = { ler };

    function apagarCookies(prefixos) {
        const host = location.hostname;
        const partes = host.split(".");
        const dominios = ["", host, `.${host}`];
        if (partes.length > 2) dominios.push(`.${partes.slice(-3).join(".")}`, `.${partes.slice(-2).join(".")}`);
        document.cookie.split(";").forEach(cookie => {
            const nome = cookie.split("=")[0].trim();
            if (!prefixos.some(prefixo => nome.startsWith(prefixo))) return;
            dominios.forEach(dominio => {
                document.cookie = `${nome}=; Max-Age=0; path=/${dominio ? `; domain=${dominio}` : ""}`;
            });
        });
    }

    function mostrar(personalizar) {
        opcoes.hidden = !personalizar;
        botao("personalizar").hidden = personalizar;
        botao("salvar").hidden = !personalizar;
        aviso.hidden = false;
        document.body.classList.add("cookie-aberto"); // o CSS tira o botão flutuante do caminho no celular
        requestAnimationFrame(() => aviso.classList.add("visivel"));
    }

    function esconder() {
        aviso.classList.remove("visivel");
        aviso.hidden = true;
        document.body.classList.remove("cookie-aberto");
    }

    function salvar(a, m) {
        const antes = ler();
        try {
            localStorage.setItem(CHAVE, JSON.stringify({ v: 1, a: !!a, m: !!m, ts: new Date().toISOString() }));
        } catch (erro) { }
        gtag("consent", "update", {
            analytics_storage: a ? "granted" : "denied",
            ad_storage: m ? "granted" : "denied",
            ad_user_data: m ? "granted" : "denied",
            ad_personalization: m ? "granted" : "denied"
        });
        window.dataLayer.push({ event: "consent_update", consent_analytics: !!a, consent_marketing: !!m });
        document.dispatchEvent(new CustomEvent("correia:consent", { detail: { a: !!a, m: !!m } }));
        esconder();

        // Retirou uma permissão que tinha dado: apaga os cookies daquela categoria e recarrega
        const tirouEstatistica = antes && antes.a && !a;
        const tirouMarketing = antes && antes.m && !m;
        if (tirouEstatistica) {
            apagarCookies(["_ga", "_clck", "_clsk"]);
            if (typeof window.clarity === "function") window.clarity("consent", false);
        }
        if (tirouMarketing) apagarCookies(["_gcl", "_fbp", "_fbc"]);
        if (tirouEstatistica || tirouMarketing) location.reload();
    }

    aviso.addEventListener("click", evento => {
        const acao = evento.target.closest("[data-consent]")?.dataset.consent;
        if (acao === "aceitar") salvar(true, true);
        if (acao === "recusar") salvar(false, false);
        if (acao === "salvar") salvar(estatistica.checked, marketing.checked);
        if (acao === "personalizar") {
            mostrar(true);
            estatistica.focus();
        }
    });

    // "Preferências de cookies" (rodapé e política de privacidade) reabre o aviso com a escolha atual marcada.
    document.addEventListener("click", evento => {
        if (!evento.target.closest("[data-consent-open]")) return;
        evento.preventDefault();
        const atual = ler() || {};
        estatistica.checked = !!atual.a;
        marketing.checked = !!atual.m;
        mostrar(true);
        estatistica.focus();
    });

    if (!ler()) mostrar(false);
})();
