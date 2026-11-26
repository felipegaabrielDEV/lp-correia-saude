#!/usr/bin/env python3
"""
Gera a PRÉVIA PRIVADA do site: um único arquivo HTML (CSS, JS, fotos e vídeo embutidos) para abrir direto
no navegador, sem internet para as imagens e sem publicar nada. Serve para mostrar ajustes novos ao Felipe e
à Júlia antes de irem para o site público.

Uso (na raiz do repositório):  python3 ferramentas/gerar-previa-privada.py
Saída: interno/previa-privada-felipe.html e interno/politica-de-privacidade.html (a pasta interno/ está no .gitignore e nunca é publicada).
"""
import base64, mimetypes, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, "interno", "previa-privada-felipe.html")
cache = {}

def ler(caminho):
    with open(os.path.join(RAIZ, caminho), "rb") as f:
        return f.read()

def data_uri(caminho):
    if caminho not in cache:
        tipo = mimetypes.guess_type(caminho)[0] or "application/octet-stream"
        cache[caminho] = f"data:{tipo};base64,{base64.b64encode(ler(caminho)).decode()}"
    return cache[caminho]

html = ler("index.html").decode("utf-8")

# 1) Estilos e script embutidos
html = re.sub(r'<link rel="stylesheet" href="styles\.css[^"]*">',
              lambda m: "<style>" + ler("styles.css").decode("utf-8") + "</style>", html)
for arquivo in ("eventos.js", "consent.js", "script.js", "lead-form.js"):
    html = re.sub(r'<script src="' + re.escape(arquivo) + r'[^"]*" defer></script>',
                  lambda m, a=arquivo: "<script>" + ler(a).decode("utf-8") + "</script>", html)

# 2) A pré-carga da foto do topo não serve num arquivo único
html = re.sub(r'<link rel="preload"[^>]*>\s*', "", html)

# 3) srcset tem vírgulas dentro do data URI; o src de cada <img> já cobre a imagem
html = re.sub(r'\s(?:imagesrcset|srcset)="[^"]*"', "", html)

# 4) Todo arquivo local de assets/ vira data URI
html = re.sub(r'assets/[\w./-]+\.(?:webp|jpg|jpeg|png|mp4)', lambda m: data_uri(m.group(0)), html)

# 5) Marca a página como prévia privada
html = html.replace("<title>", "<title>[PRÉVIA PRIVADA] ", 1)

os.makedirs(os.path.dirname(SAIDA), exist_ok=True)
with open(SAIDA, "w", encoding="utf-8") as f:
    f.write(html)

# 6) A política de privacidade sai como arquivo irmão (mesma pasta), com CSS e script embutidos.
#    No arquivo único, o link "politica-de-privacidade.html" abre esse segundo arquivo.
politica = ler("politica-de-privacidade.html").decode("utf-8")
politica = re.sub(r'<link rel="stylesheet" href="styles\.css[^"]*">', lambda m: "<style>" + ler("styles.css").decode("utf-8") + "</style>", politica)
politica = re.sub(r'<script src="consent\.js[^"]*" defer></script>', lambda m: "<script>" + ler("consent.js").decode("utf-8") + "</script>", politica)
politica = re.sub(r'assets/[\w./-]+\.(?:webp|jpg|jpeg|png)', lambda m: data_uri(m.group(0)), politica)
with open(os.path.join(os.path.dirname(SAIDA), "politica-de-privacidade.html"), "w", encoding="utf-8") as f:
    f.write(politica)

restos = re.findall(r'(?:src|href|poster)="(assets/[^"]*)"', html)
print(f"Gerado: {SAIDA} ({os.path.getsize(SAIDA)/1024/1024:.1f} MB)")
if restos:
    print("ATENÇÃO: referências locais que sobraram:", restos[:5]); sys.exit(1)
