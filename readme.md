# Generador de Imágenes con Node.js, Sharp y Vercel

Este repositorio contiene una API serverless construida con **Node.js** y la librería **Sharp**, que permite generar imágenes dinámicamente. La API recorta una imagen de fondo y le superpone una etiqueta de texto personalizable (como "EN VIVO", "PRÓXIMO", "FINALIZADO").

Es ideal para generar miniaturas o imágenes para redes sociales con información en tiempo real, adaptable a diversas necesidades.

---

## ¡Despliega tu propia instancia en Vercel!

Puedes desplegar este proyecto directamente en tu cuenta de Vercel con un solo clic:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FWebStaticCS%2FImage-Generator.git&project-name=image-generator&repo-name=Image-Generator)

---

## Características

* **Recorte de imagen centrado**: Ajusta la imagen de fondo a las dimensiones especificadas, manteniendo el foco principal.
* **Superposición de texto personalizable**: Añade etiquetas como `EN VIVO`, `PRÓXIMO` o `FINALIZADO` con colores de fondo que cambian automáticamente.
* **Optimizado para Vercel**: Diseñado para funcionar eficientemente como una función serverless en la plataforma de Vercel.

---

## Cómo usar la API

La API acepta los siguientes **parámetros de consulta** (`query parameters`) vía GET:

* `imageUrl` (obligatorio): La URL de la imagen de fondo que se desea procesar.
* `cropWidth` (opcional): El ancho deseado para el recorte de la imagen en píxeles (por defecto: `500`).
* `cropHeight` (opcional): La altura deseada para el recorte de la imagen en píxeles (por defecto: `700`).
* `liveText` (opcional): El texto que se superpondrá en la esquina superior derecha. Acepta `EN VIVO`, `PROXIMO` o `FINALIZADO`. El color de fondo de la etiqueta cambiará según el texto:
    * `EN VIVO` (por defecto): Rojo
    * `PROXIMO`: Verde
    * `FINALIZADO`: Negro

### Ejemplos de uso:

Asegúrate de reemplazar `[TU-DOMINIO-VERCEL]` con la URL que Vercel te asigna después del despliegue (ej. `https://your-app-name.vercel.app`).

1.  **Imagen con etiqueta "EN VIVO" (por defecto):**
    `https://[TU-DOMINIO-VERCEL]/api/generate-image?imageUrl=https://i.ibb.co/JRTpMKYb/unnamed.png&liveText=EN%20VIVO`

2.  **Imagen con etiqueta "PROXIMO" y dimensiones específicas:**
    `https://[TU-DOMINIO-VERCEL]/api/generate-image?imageUrl=https://i.ibb.co/JRTpMKYb/unnamed.png&cropWidth=800&cropHeight=450&liveText=PROXIMO`

3.  **Imagen con etiqueta "FINALIZADO":**
    `https://[TU-DOMINIO-VERCEL]/api/generate-image?imageUrl=https://i.ibb.co/JRTpMKYb/unnamed.png&liveText=FINALIZADO`

---

## Despliegue en Vercel

Si no utilizas el botón de despliegue, puedes seguir estos pasos:

1.  **Crea un nuevo repositorio en GitHub** y sube los archivos de este proyecto.
2.  Ve a tu [Vercel Dashboard](https://vercel.com/dashboard).
3.  Haz clic en "Add New..." y luego en "Project".
4.  Selecciona tu repositorio de GitHub recién creado.
5.  Vercel detectará automáticamente que es un proyecto Node.js y configurará el despliegue.
6.  Haz clic en "Deploy".

Una vez desplegado, Vercel te proporcionará una **URL pública** para tu API.

---

## Desarrollo Local

Para probar la API en tu entorno local:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/WebStaticCS/Image-Generator.git](https://github.com/WebStaticCS/Image-Generator.git)
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd Image-Generator
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Inicia el servidor:**
    ```bash
    npm start
    ```
    Ahora podrás acceder a la API localmente en `http://localhost:3000/api/generate-image`.

---

## Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución de JavaScript.
* **Express.js**: Framework web para Node.js.
* **Sharp**: Librería de procesamiento de imágenes de alto rendimiento.
* **Axios**: Cliente HTTP basado en promesas para el navegador y Node.js.
* **Vercel**: Plataforma para despliegue de aplicaciones web y funciones serverless.
* **Placehold.co**: Servicio utilizado para generar las imágenes de texto dinámicamente.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una idea para mejorar, no dudes en abrir un 'issue' o enviar un 'pull request'.

---
