const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');

const hostname = '192.168.10.254';
const port = 3001;

const server = http.createServer((req, res) => {
  // Читаем файл index.html и отправляем его клиенту
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error loading index.html');
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

// Запускаем сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  
  // Автоматически открываем браузер (на Windows, Linux или Mac)
  const url = `http://${hostname}:${port}/`;
  // Для Windows
  if (process.platform === 'win32') {
    exec(`start ${url}`);
  } 
  // Для MacOS
  else if (process.platform === 'darwin') {
    exec(`open ${url}`);
  } 
  // Для Linux
  else {
    exec(`xdg-open ${url}`);
  }
});
