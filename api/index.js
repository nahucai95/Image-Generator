// api/index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  let vercelDomain = `http://localhost:${process.env.PORT || 3000}`; // Default for local development

  if (process.env.VERCEL_URL) {
    // VERCEL_URL might be like 'my-project-abcd.vercel.app' or 'my-custom-domain.com'
    // If it's a Vercel-generated deployment URL, we want the alias part.
    if (process.env.VERCEL_URL.includes('-') && process.env.VERCEL_URL.endsWith('.vercel.app')) {
      const parts = process.env.VERCEL_URL.split('-');
      // Assuming the alias is the first part before the first hyphen in the Vercel-generated URL
      vercelDomain = `https://${parts[0]}.vercel.app`;
    } else {
      // If it's a custom domain or already a clean vercel.app alias
      vercelDomain = process.env.VERCEL_URL;
    }
  }

  // URL de imagen de ejemplo, codificada para ser segura en URLs
  const exampleImageUrl = encodeURIComponent('https://i.ibb.co/JRTpMKYb/unnamed.png'); 

  const documentationContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generador de Imágenes API</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f8f8f8; color: #333; }
        h1 { color: #0070f3; border-bottom: 2px solid #eaeaea; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        pre { background-color: #f0f0f0; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 0.9em; border: 1px solid #ddd; }
        code { font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; }
        .container { max-width: 900px; margin: auto; background: #fff; padding: 30px 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        ul { list-style: disc; padding-left: 20px; }
        li { margin-bottom: 8px; }
        a { color: #0070f3; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Generador de Imágenes</h1>
        <p>Esta es una **API serverless** construida con Node.js y Sharp, diseñada para generar imágenes dinámicamente. Puedes usarla para recortar imágenes de fondo y superponerles etiquetas de texto personalizables, ideal para miniaturas o contenido en tiempo real.</p>

        <h2>Parámetros de Uso:</h2>
        <ul>
          <li><code>imageUrl</code> (obligatorio): La URL de la imagen de fondo que se desea procesar.</li>
          <li><code>cropWidth</code> (opcional): El ancho deseado para el recorte de la imagen en píxeles (por defecto: <code>500</code>).</li>
          <li><code>cropHeight</code> (opcional): La altura deseada para el recorte de la imagen en píxeles (por defecto: <code>700</code>).</li>
          <li><code>liveText</code> (opcional): El texto que se superpondrá en la esquina superior derecha. Acepta <code>EN VIVO</code>, <code>PROXIMO</code> o <code>FINALIZADO</code>. El color de fondo de la etiqueta cambiará según el texto.</li>
        </ul>

        <h2>Ejemplos de Uso:</h2>
        <p><strong>Tu URL base de Vercel es:</strong> <code>${vercelDomain}</code></p>

        <h3>1. Imagen con etiqueta "EN VIVO" (por defecto):</h3>
        <pre><code>${vercelDomain}/api/generate-image?imageUrl=${exampleImageUrl}&liveText=EN%20VIVO</code></pre>

        <h3>2. Imagen con etiqueta "PROXIMO" y dimensiones específicas:</h3>
        <pre><code>${vercelDomain}/api/generate-image?imageUrl=${exampleImageUrl}&cropWidth=800&cropHeight=450&liveText=PROXIMO</code></pre>

        <h3>3. Imagen con etiqueta "FINALIZADO":</h3>
        <pre><code>${vercelDomain}/api/generate-image?imageUrl=${exampleImageUrl}&liveText=FINALIZADO</code></pre>

        <p>Para más detalles y el código fuente, consulta el <a href="https://github.com/nahucai95/Image-Generator/blob/main/README.md" target="_blank">README.md en GitHub</a>.</p>
      </div>
    </body>
    </html>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.send(documentationContent);
});

const port = parseInt(process.env.PORT, 10) || 3000;
const server = app.listen(port, () => {
  console.log(`Server is UP and running on http://localhost:${port}`);
});

// 2. Log any errors emitted by the HTTP server
server.on('error', (err) => {
  console.error('Server error:', err);
});

// 3. Graceful shutdown logging
const shutdown = (signal) => {
  console.log(`Received ${signal}, shutting down server…`);
  server.close(() => {
    console.log('Server has stopped.');
    process.exit(0);
  });
};
process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// 4. Catch any uncaught exceptions or promise rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // you might want to exit or restart the process here
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // you might want to exit or restart the process here
});

module.exports = app;