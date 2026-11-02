# Media Sharing REST API (Assignment 2)

A simple REST API built with Node.js and Express. It uses Pug for the landing page and mock data stored in memory.


The server runs at http://localhost:3000/

## What I implemented

- **Landing page** (`GET /`) rendered with Pug. The list of endpoints is passed to the template as data and shown with a loop.
- **Media API** (`/api/media`) with get all, get one, add, modify and delete.
- **User API** (`/api/user`) with get all, get one, add, modify and delete.
- **Static files** are served from the `media` folder at `/media`.
- **jsDoc comments** are used above the route handlers.

All code is in `src/index.js` and the Pug template is in `src/views/index.pug`.

## Endpoints and status codes

| Method | Path | Success | Errors |
|---|---|---|---|
| GET | /api/media | 200 | - |
| GET | /api/media/:id | 200 | 404 if not found |
| POST | /api/media | 201 | 400 if fields are missing |
| PUT | /api/media/:id | 200 | 404 if not found |
| DELETE | /api/media/:id | 200 | 404 if not found |
| GET | /api/user | 200 | - |
| GET | /api/user/:id | 200 | 404 if not found |
| POST | /api/user | 201 | 400 if fields are missing |
| PUT | /api/user/:id | 200 | 404 if not found |
| DELETE | /api/user/:id | 200 | 404 if not found |

Note: data is stored in memory only, so it resets when the server restarts.

