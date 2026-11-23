# USX-teht: Assignment 5, Part B: Input Validation and Error Handling

**Branch:** <link to your validation branch on GitHub>

## Implementation

Server-side validation and sanitization are implemented with `express-validator`. Errors are handled with a central JSON error handler, so controllers no longer send hard-coded error responses and instead pass errors on with `next(error)`.

### Files

| File | Purpose |
|---|---|
| `src/middlewares/error-handlers.js` | `notFoundHandler`, `errorHandler` and `validationErrors` |
| `src/middlewares/upload.js` | Multer configuration with file size limit and file type filter |
| `src/routes/*.js` | Validation rules for each endpoint |
| `src/views/index.js` | Registers the error handlers as the last middlewares |

## Error handling

- **`notFoundHandler`:** catches requests that matched no route, creates a 404 error and forwards it with `next(error)`.
- **`errorHandler`:** a four-argument middleware (`err, req, res, next`) registered last in the chain. It responds with JSON in the format `{ "error": { "message": "...", "status": 404 } }`. The status is taken from `err.status` and defaults to 500. Multer's file size error is mapped to 400.
- **`validationErrors`:** reads the result of the `express-validator` rules, and if any rule failed it creates a 400 error listing every failed field (e.g. `username: must be 3-20 alphanumeric characters`) and forwards it to the error handler. It runs in the routers just before the controller.
- **Controllers:** error responses were removed from the controllers. They now create an `Error`, set `error.status` (400, 401, 403, 404, 409) and call `next(error)`. Unexpected errors from the database are caught and forwarded the same way.

## Validation and sanitization rules

Validation rejects invalid input, and sanitization cleans the accepted input (`trim` removes surrounding whitespace, `escape` replaces HTML characters to prevent XSS, `normalizeEmail` standardizes email addresses, `toInt` converts ids to numbers). SQL injection is additionally prevented by using parameterized queries (`?` placeholders) in all models.
