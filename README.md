# Generador de Imágenes con Node.js, Sharp y Vercel

Este repositorio contiene una API serverless construida con Node.js y la librería Sharp, que permite generar imágenes dinámicamente. La API recorta una imagen de fondo y le superpone una etiqueta de texto personalizable (como "EN VIVO", "PRÓXIMO", "FINALIZADO").

Ideal para generar miniaturas o imágenes para redes sociales con información en tiempo real.

---

## Características

* Recorte de imagen centrado.
* Superposición de texto personalizable (`EN VIVO`, `PRÓXIMO`, `FINALIZADO`).
* Optimizado para despliegue en Vercel como función serverless.

---

## Cómo usar la API

La API acepta los siguientes parámetros de consulta (`query parameters`):

* `imageUrl` (obligatorio): La URL de la imagen de fondo que se desea procesar.
* `cropWidth` (opcional): El ancho deseado para el recorte de la imagen (por defecto: `500`).
* `cropHeight` (opcional): La altura deseada para el recorte de la imagen (por defecto: `700`).
* `liveText` (opcional): El texto que se superpondrá en la esquina superior derecha. Acepta `EN VIVO`, `PROXIMO`, o `FINALIZADO` para cambiar el color de fondo de la etiqueta. Por defecto: `EN VIVO`.

### Ejemplos de uso:

1.  **Imagen con etiqueta "EN VIVO" (por defecto):**
    `https://[TU-DOMINIO-VERCEL]/api/generate-image?imageUrl=https://images.unsplash.com/photo-1542831371-29b0f74f94dd`

2.  **Imagen con etiqueta "PROXIMO" y dimensiones específicas:**
    `https://[TU-DOMINIO-VERCEL]/api/generate-image?imageUrl=https://images.unsplash.com/photo-1542831371-29b0f74f94dd&cropWidth=800&cropHeight=450&liveText=PROXIMO`

3.  **Imagen con etiqueta "FINALIZADO":**
    `https://[TU-DOMINIO-VERCEL]/api/generate-image?imageUrl=https://images.unsplash.com/photo-1542831371-29b0f74f94dd&liveText=FINALIZADO`

---

## Despliegue en Vercel

Puedes desplegar este proyecto en tu cuenta de Vercel de manera sencilla:

1.  **Crea un nuevo repositorio en GitHub** con estos archivos.
2.  Ve a [Vercel Dashboard](https://vercel.com/dashboard).
3.  Haz clic en "Add New..." y luego en "Project".
4.  Selecciona tu repositorio de GitHub recién creado.
5.  Vercel detectará automáticamente que es un proyecto Node.js y configurará el despliegue.
6.  Haz clic en "Deploy".

¡Una vez desplegado, Vercel te proporcionará una URL pública para tu API!

---

## Desarrollo Local

Para correr el proyecto localmente (principalmente para pruebas):

1.  Clona el repositorio:
    `git clone https://github.com/tu-usuario/nombre-del-repo.git`
2.  Navega al directorio del proyecto:
    `cd nombre-del-repo`
3.  Instala las dependencias:
    `npm install`
4.  Inicia el servidor (para probar la API en `http://localhost:3000/api/generate-image`):
    `npm start`
    (Nota: El script `start` se refiere a `api/generate-img.js` como un servidor express completo para desarrollo local. En Vercel, `api/generate-img.js` se ejecuta como una función serverless independiente).

---

## Tecnologías Utilizadas

* **Node.js**
* **Express.js**
* **Sharp**: Para procesamiento de imágenes de alto rendimiento.
* **Axios**: Para realizar solicitudes HTTP.
* **Vercel**: Plataforma de despliegue serverless.
* **Placehold.co**: Para generar las etiquetas de texto dinámicamente.

---

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o tienes una mejora, por favor abre un 'issue' o envía un 'pull request'.

---

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.