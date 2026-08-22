# Modelos IFRS 9 e IRB para cartera Wholesale

Guía técnica sobre modelos de probabilidad de incumplimiento, severidad y
exposición para cartera corporativa y grandes corporativos, bajo el marco de
Basilea 3.1 y la supervisión de la Prudential Regulation Authority del Reino
Unido y de la Comisión Nacional Bancaria y de Valores de México.

**Sitio publicado:** https://USUARIO.github.io/REPO/ *(sustituye por tu URL)*

## Qué contiene

| | |
|---|---|
| Capítulos | 39, en nueve partes |
| Extensión | ~467.000 palabras |
| Figuras | 203, generadas con matplotlib |
| Secciones indexadas | 1.536 |
| Recuadros | 841 |
| Tablas | 411 |
| Fórmulas | 483 en bloque, 2.289 nodos en total |
| Ejercicios resueltos | 47, más 6 casos de comité |
| Preguntas de entrevista | 94, con respuesta modelo |

Cubre el universo de banca mayorista y sus productos; la definición de
incumplimiento; la arquitectura de datos; el análisis de estados financieros y
de razones por industria; el desarrollo, la validación y la calibración de
modelos de PD, LGD y EAD bajo el método basado en calificaciones internas; el
marco de IFRS 9 de punta a punta, desde el incremento significativo del riesgo
hasta los ajustes fuera de modelo; el uso de los parámetros en capital, precio y
rentabilidad; y el gobierno del riesgo de modelo.

## Sobre la veracidad del contenido

- Toda afirmación regulatoria cita el documento y el artículo o párrafo, con
  enlace a la fuente oficial.
- **Todos los ejemplos numéricos son sintéticos e ilustrativos** y están
  marcados como tales. Ninguna cifra corresponde a una institución real ni a una
  cartera real.
- Lo que no pudo verificarse contra fuente primaria está señalado capítulo por
  capítulo y consolidado en el capítulo 38, con la distinción entre dato
  verificado, verificación indirecta, fuente secundaria y criterio del autor.
- No sustituye el texto normativo. Antes de usar cualquier afirmación en un
  documento formal, confírmala contra la fuente primaria.

## Cómo está construido

El sitio es estático puro y no carga nada de Internet: sin CDN, sin fuentes
remotas, sin analítica, sin rastreo. Las fórmulas se renderizan como SVG
generado desde matplotlib, no con una biblioteca de terceros.

```
chapters/   los 39 capítulos en Markdown extendido
src/        un módulo por bloque de capítulos: genera las figuras y verifica
            la aritmética de todos los ejemplos numéricos
build/      el motor: paleta y renderizado de fórmulas (viz.py), Markdown a
            HTML (render.py), plantilla (shell.py), ensamblado (build.py),
            sitio multipágina (build_site.py) y versión Word (build_docx.py)
research/   los dosieres de investigación con las citas y las URL de todas
            las fuentes oficiales
```

Para regenerar el sitio:

```bash
pip install matplotlib numpy pandas scipy statsmodels scikit-learn markdown
python3 figs/run.py          # figuras
python3 build/build_site.py  # este sitio
```

## Buscador

El panel izquierdo busca en el texto completo de las 1.536 secciones y ordena
por relevancia. Es bilingüe: el índice se enriquece con los 301 pares
español-inglés del glosario del capítulo 38, así que buscar *margin of
conservatism* encuentra las secciones sobre margen de conservadurismo aunque
estén escritas en español. Atajo: la tecla `/`.
