const express = require('express');
const sharp = require('sharp');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.get('/api/generate-image', async (req, res) => {
    try {
        const { imageUrl, cropWidth, cropHeight, liveText } = req.query;

        if (!imageUrl) {
            return res.status(400).send('El parámetro "imageUrl" es obligatorio.');
        }

        const cw = parseInt(cropWidth) || 500;
        const ch = parseInt(cropHeight) || 700;
        const liveTxt = liveText || 'EN VIVO';

        // 1. Descargar la imagen de fondo
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const backgroundBuffer = Buffer.from(imageResponse.data);

        // 2. Obtener metadatos y calcular recorte centrado
        const metadata = await sharp(backgroundBuffer).metadata();
        const centerX = Math.round(metadata.width / 2);
        const centerY = Math.round(metadata.height / 2);

        const cropX = Math.max(0, centerX - Math.round(cw / 2));
        const cropY = Math.max(0, centerY - Math.round(ch / 2));

        const croppedImage = sharp(backgroundBuffer)
            .extract({ left: cropX, top: cropY, width: cw, height: ch });

        const croppedBuffer = await croppedImage.toBuffer();
        const croppedMetadata = await sharp(croppedBuffer).metadata();

        // 3. Preparar los parámetros para la imagen de texto de Placehold.co
        const textOverlayHeight = 70;
        // Placehold.co no tiene un cálculo dinámico del ancho del texto, así que usaremos
        // un ancho generoso o fijo que sirva para la mayoría de los casos.
        // Opcionalmente, puedes estimar un ancho un poco más grande si el texto varía mucho.
        const textOverlayWidth = 200; // Ancho fijo para la etiqueta de Placehold.co

        let bgColorCode = 'FF0000'; // Rojo por defecto para Placehold.co (sin '#')
        let textColorCode = 'FFFFFF'; // Blanco por defecto para Placehold.co (sin '#')

        if (liveTxt.toUpperCase() === 'PROXIMO') {
            bgColorCode = '008000'; // Verde
        } else if (liveTxt.toUpperCase() === 'FINALIZADO') {
            bgColorCode = '000000'; // Negro
        }

        // Codificar el texto para la URL
        const encodedLiveText = encodeURIComponent(liveTxt.toUpperCase());

        // Construir la URL de Placehold.co
        // Formato: /WIDTHxHEIGHT/BACKGROUND_HEX/TEXT_HEX?text=YOUR%20TEXT
        const placeholdCoUrl = `https://placehold.co/${textOverlayWidth}x${textOverlayHeight}/${bgColorCode}/${textColorCode}?text=${encodedLiveText}`;

        // 4. Descargar la imagen del texto desde Placehold.co
        const textImageResponse = await axios.get(placeholdCoUrl, { responseType: 'arraybuffer' });
        const textOverlayBuffer = Buffer.from(textImageResponse.data);

        // 5. Calcular la posición para superponer el texto (superior derecha)
        const topRightX = Math.round(croppedMetadata.width - textOverlayWidth);
        const topRightY = Math.round(0);

        // 6. Superponer la imagen del texto sobre la imagen principal
        const finalImageBuffer = await sharp(croppedBuffer)
            .composite([{
                input: textOverlayBuffer, // Usamos el buffer de la imagen de Placehold.co
                top: topRightY,
                left: topRightX
            }])
            .png({ quality: 90 })
            .toBuffer();

        // 7. Enviar la imagen resultante como respuesta HTTP
        res.setHeader('Content-Type', 'image/png');
        res.send(finalImageBuffer);

    } catch (error) {
        console.error('Error al generar la imagen:', error);
        if (error.response) {
            console.error('Respuesta de error de la URL externa:', error.response.status, error.response.data.toString('utf8'));
        }
        res.status(500).send('Error interno al generar la imagen. Por favor, verifica la URL de la imagen y los parámetros.');
    }
});

module.exports = app;