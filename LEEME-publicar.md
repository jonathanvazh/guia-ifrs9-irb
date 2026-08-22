# Cómo publicar esta guía

El sitio es estático puro: HTML, CSS y JavaScript. No necesita servidor de
aplicación, ni base de datos, ni proceso de compilación. No carga **nada** de
Internet: sin CDN, sin fuentes remotas, sin analítica, sin rastreo. Los únicos
enlaces externos son referencias a legislation.gov.uk en las secciones de fuentes.

- 40 páginas (portada más 39 capítulos), unos 600 KB por página.
- CSS, JavaScript e índice de búsqueda compartidos y cacheados entre páginas.
- Buscador de texto completo sobre las 1.536 secciones, bilingüe: encuentra una
  sección escrita en español aunque busques el término en inglés, porque el
  índice se enriquece con los 301 pares del glosario del capítulo 38.

## Opción 1 — Netlify Drop (lo más rápido, sin cuenta ni configuración)

1. Entra a `app.netlify.com/drop`.
2. Arrastra **esta carpeta completa**.
3. Te devuelve una URL pública en segundos. Desde la cuenta gratuita puedes
   cambiarle el subdominio o conectar tu propio dominio.

## Opción 2 — GitHub Pages

```bash
git init && git add . && git commit -m "Guía IFRS 9 e IRB Wholesale"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

Después, en `Settings → Pages`, elige `Deploy from a branch`, rama `main`,
carpeta `/ (root)`. Queda en `https://<usuario>.github.io/<repo>/`.
El archivo `.nojekyll` ya está incluido para que GitHub no procese el sitio.

## Opción 3 — Cloudflare Pages

`Create a project → Direct Upload`, arrastra la carpeta. Sin comando de
compilación y sin directorio de salida. Da HTTPS y red global sin costo.

## Opción 4 — Servidor interno o intranet

Copia la carpeta a cualquier directorio servido por Apache, nginx o IIS.
Funciona también abriendo `index.html` directamente desde el disco, sin
servidor, aunque en ese modo algunos navegadores restringen la carga del
archivo del índice de búsqueda.

## Si quieres acceso restringido

- **Netlify**: protección con contraseña en el plan de pago; control de acceso
  por identidad en el gratuito.
- **Cloudflare Pages**: Cloudflare Access permite limitar por dominio de correo
  sin costo para pocos usuarios.
- **GitHub Pages**: los sitios son públicos salvo en planes Enterprise; si
  necesitas privacidad, usa una de las dos anteriores.

## Antes de publicarla abiertamente

El contenido está construido sobre fuentes oficiales y todos los ejemplos
numéricos son sintéticos, pero refleja de cerca el trabajo de un banco
supervisado. Publicarla en abierto y a título personal puede caer bajo las
políticas internas de publicaciones y de propiedad intelectual de tu empleador.
Un enlace privado o un despliegue interno no plantea ese problema.

## Cómo regenerarla

El código fuente completo va en `codigo-fuente-guia.zip`. Tras editar cualquier
capítulo en `chapters/`:

```bash
python3 figs/run.py        # figuras
python3 build/build_site.py  # este sitio
python3 build/build.py       # además, la versión de archivo único
```
