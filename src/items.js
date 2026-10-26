// src/items.js
import {sendJson, readJsonBody} from './utils.js';

const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];
let nextId = 3;

// GET /items
export const getItems = (req, res) => {
  sendJson(res, 200, items);
};

// GET /items/:id
export const getItemById = (req, res, id) => {
  const item = items.find((i) => i.id === id);
  if (!item) {
    return sendJson(res, 404, {error: 'Item not found'});
  }
  sendJson(res, 200, item);
};

// POST /items
export const createItem = async (req, res) => {
  try {
    const body = await readJsonBody(req);
    if (!body.name) {
      return sendJson(res, 400, {error: 'Name is required'});
    }
    const newItem = {id: nextId++, name: body.name};
    items.push(newItem);
    sendJson(res, 201, newItem);
  } catch {
    sendJson(res, 400, {error: 'Invalid JSON'});
  }
};

// PUT /items/:id
export const updateItem = async (req, res, id) => {
  const item = items.find((i) => i.id === id);
  if (!item) {
    return sendJson(res, 404, {error: 'Item not found'});
  }
  try {
    const body = await readJsonBody(req);
    if (!body.name) {
      return sendJson(res, 400, {error: 'Name is required'});
    }
    item.name = body.name;
    sendJson(res, 200, item);
  } catch {
    sendJson(res, 400, {error: 'Invalid JSON'});
  }
};

// DELETE /items/:id
export const deleteItem = (req, res, id) => {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return sendJson(res, 404, {error: 'Item not found'});
  }
  items.splice(index, 1);
  res.writeHead(204);
  res.end();
};