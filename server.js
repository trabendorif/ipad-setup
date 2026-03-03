const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp',
    '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    const nets = require('os').networkInterfaces();
    let ip = 'localhost';
    for (const iface of Object.values(nets)) {
        for (const cfg of iface) {
            if (cfg.family === 'IPv4' && !cfg.internal) { ip = cfg.address; break; }
        }
    }
    console.log(`\n  Mr Phone 67 - Serveur demarre !`);
    console.log(`  Local:   http://localhost:${PORT}`);
    console.log(`  Reseau:  http://${ip}:${PORT}`);
    console.log(`\n  Pour installer sur tablette:`);
    console.log(`  -> Ouvrez Chrome sur la tablette`);
    console.log(`  -> Allez sur http://${ip}:${PORT}`);
    console.log(`  -> Menu Chrome > "Installer l'application"\n`);
});
