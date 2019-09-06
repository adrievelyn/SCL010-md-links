# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.


¿Como instalarlo?
Este modulo lo puedes instalar de dos maneras:

Desde la terminal debes posicionarte en la carpeta donde está ubicado tu proyecto

1. Debes escribir npm install y luego sudo npm link

2. También puedes instalarlo escribiendo: npm install https://github.com/adrievelyn/SCL010-md-links

Este modulo también lo puedes usar directamente desde tu archivo donde estas programando, exportándolo de la siguiente manera:

const extract_link_markdown = require('extract_link_markdown')

¿Como se usa Extract Link Markdown ?
Desde la terminal desde escribir lo siguiente

node (nombre de tu archivo.js) (directorio o archivo que quieres analizar)

Ejemplo:

Si tu archivo desde donde exportaste se llama index.js y quieres analizar una carpeta llamada "proyecto" debes ingresar lo siguiente:

node index.js ./proyecto

Si quieres analizar sólo un archivo y se llama README.md debes ingresar lo siguiente desde la terminal y al igual que lo anterior debes señalar el archivo desde donde estas programando, en este caso sería index.js

node index.js README.md

## Diagrama de Flujo
![Diagrama de Flujo](SCLO10-md-links/img/DiagramaDeFlujo.jpg)
https://assets.adobe.com/cloud-documents/urn:aaid:sc:us:0db8c94b-801d-4f26-8c36-5a18c1aeec9c

## Checklist

### General

- [X] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [X] Pseudo codigo o diagrama de flujo con el algoritmo que soluciona el problema.
- [X] Un board con el backlog para la implementación de la librería.
- [X] Documentación técnica de la librería.
- [X] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [X] El módulo exporta una función con la interfaz (API) esperada.
- [X] Implementa soporte para archivo individual
- [X] Implementa soporte para directorios
- [X] Implementa `options.validate`

### CLI

- [X] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [X] Se ejecuta sin errores / output esperado
- [X] Implementa `--validate`
- [X] Implementa `--stats`
- [X] El ejecutable implementa `--validate` y `--stats` juntos.

### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).
