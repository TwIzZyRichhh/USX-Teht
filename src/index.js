// src/index.js
import http from 'http';
import {sendJson} from './utils.js';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from './items.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const {method} = req;
  const itemMatch = url.pathname.match(/^\/items\/(\d+)$/);
  const id = itemMatch ? Number(itemMatch[1]) : null;

  if (url.pathname === '/' && method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    return res.end('Welcome to my REST API!');
  }
  if (url.pathname === '/items' && method === 'GET') {
    return getItems(req, res);
  }
  if (url.pathname === '/items' && method === 'POST') {
    return createItem(req, res);
  }
  if (itemMatch && method === 'GET') {
    return getItemById(req, res, id);
  }
  if (itemMatch && method === 'PUT') {
    return updateItem(req, res, id);
  }
  if (itemMatch && method === 'DELETE') {
    return deleteItem(req, res, id);
  }

  // Anything else: resource doesn't exist
  sendJson(res, 404, {error: 'Not found'});
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});