# Paleta y sistema de diseño

_Started 2026-09-20 02:41 UTC_

---

## User

Colores

crema 
#F8F5F3 — fondo principal
hueso 
#EAE6E2 — fondo secundario (footer, tarjetas)
terracota 
#CF6F4C — acento principal (CTAs)
terracota claro 
#D97757 — hover
carbón 
#282828 — texto principal
blanco 
#FFFFFF — texto sobre fotos oscuras
Texto secundario: carbón 70%. Texto sutil: carbón 46%. Bordes: carbón 12% / 24%.

Tipografía

Roobert (o Inter como fallback) — titulares en peso 300 (light), no 700. Ese es el rasgo distintivo frente al sistema anterior.
H1: 44px / H2: 32–44px, siempre light, interlineado 1.1–1.2
Eyebrows y botones: mayúsculas, tracking 0.125–0.19em

Forma — mezcla, no un solo lenguaje:

Botones: radio 0px (rectos)
Tarjetas: radio 12–20px
Badges/etiquetas: cápsula (9999px)
Solo fotos/iconos destacados: círculo perfecto

Espaciado — ad-hoc, no escala de 4px: 30–50px entre elementos, 70–126px entre secciones.

Movimiento — tres velocidades: hover 150–300ms, transiciones de contenido 400ms–1s, loops ambientales 2–8s. Sin escala al presionar botones.

Detalle de marca — reemplaza el punto lavanda: isotipo romboidal geométrico junto al wordmark, una sola vez en el header.

Las reglas duras (sin gradientes, sin emojis, textos en inglés) se mantienen igual.

## Assistant



## Assistant

_[tool: list_files]_

Tengo la guía de estilo clara, pero no qué construir con ella.

_[tool: ask_user]_

Esperando tus respuestas para empezar.

## User

Answered — deliverable: Landing page completa; product: Spec — Grace Renovations 
1. PROBLEMA
Los clientes potenciales no confían en contratar renovaciones sin ver trabajos previos ni tener una idea rápida del costo.
2. USUARIO
Un propietario que quiere r…; sections: Hero, Servicios, Sobre nosotros, Casos / portfolio, Testimonios, Footer; variations: Sí, 2-3 direcciones

## Assistant

_[tool: copy_starter_component]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Dos direcciones lado a lado, en canvas (pan/zoom):

**1a Editorial** — hero partido, mucho aire, tarjetas de servicio en hueso, portfolio en grilla de tres.
**1b Full-bleed** — hero fotográfico oscuro con titular de 64px, barra negra de CTA con el precio como promesa, servicios como tabla de precios, portfolio asimétrico, testimonios en carbón.

Ambas usan el mismo sistema: titulares en light, botones rectos, tarjetas 12–20px, badges cápsula, rombo terracota una vez en el header. Las fotos son slots — arrastra imágenes encima y se quedan.

Dime cuál sigo (o qué mezclar) y me quedo con una sola. Falta la sección de cotización rápida que mencionaste en el spec (las seis preguntas) — ¿la construyo como flujo interactivo?

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Corregido: ambas opciones ahora fijas a 1280px y lado a lado.

