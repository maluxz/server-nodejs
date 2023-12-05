const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Obtén la dirección IP de origen de la solicitud
    const clientIP = req.connection.remoteAddress;

    // Registra la solicitud y la dirección IP en la consola
    console.log(`Request for: ${req.url} from IP: ${clientIP}`);

    // Obtener la ruta del archivo solicitado
    const filePath = req.url === '/' ? 'index.html' : req.url.slice(1);

    // Obtener la ruta completa del archivo
    const fullPath = path.join(__dirname, filePath);

    // Verificar si el archivo existe
    fs.exists(fullPath, (exists) => {
        if (exists) {
            // Leer el contenido del archivo
            fs.readFile(fullPath, (err, data) => {
                if (err) {
                    // Manejar errores de lectura del archivo
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor');
                } else {
                    // Configurar la respuesta con el contenido del archivo
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else {
            // Archivo no encontrado, responder con 404.html
            const notFoundPath = path.join(__dirname, '404.html');
            fs.readFile(notFoundPath, (err, data) => {
                if (err) {
                    // Manejar errores de lectura del archivo 404.html
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor');
                } else {
                    // Configurar la respuesta con el contenido de 404.html
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }
    });
});

const PORT = 3000;
const ADDRESS = '127.0.0.1';

server.listen(PORT, ADDRESS, () => {
    console.log(`Servidor web corriendo en http://${ADDRESS}:${PORT}/`);
});
