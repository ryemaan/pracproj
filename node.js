const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '192.168.10.235';
const port = 3002;

const server = http.createServer((req, res) => {
  console.log('Запрос:', req.url);
  
  if (req.url === '/' || req.url === '/main.html') {
    // Обслуживание HTML файла
    fs.readFile('main.html', (err, data) => {
      if (err) {
        console.error('Ошибка чтения main.html:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error loading main.html');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (req.url === '/mainStyle.css') {
    // Обслуживание CSS файла
    fs.readFile('mainStyle.css', (err, data) => {
      if (err) {
        console.error('Ошибка чтения mainStyle.css:', err);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('CSS not found');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');
      res.end(data);
    });
  } else {
    // Обработка других запросов
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
