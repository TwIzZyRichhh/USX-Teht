# USX-teht: Assignment 5, Part A: User Authentication


## Implementation

User authentication is implemented with JSON Web Tokens (JWT) using the `jsonwebtoken` package. The code follows the MVC pattern, and `express.Router` is used to keep the auth routes in their own module.

### Files

| File | Purpose |
|---|---|
| `src/routes/auth-router.js` | Defines `POST /api/auth/login` and `GET /api/auth/me` |
| `src/controllers/auth-controller.js` | `postLogin` creates the token, `getMe` returns the logged-in user |
| `src/models/user-model.js` | `selectUserByUsernameAndPassword` checks the credentials in the database |
| `src/middlewares/authentication.js` | `authenticateToken` verifies the JWT on protected routes |

### How it works

1. **Login:** `POST /api/auth/login` takes a `username` and `password` in the request body. The model looks for a matching user in the `Users` table (the password is not included in the query result).
2. **Token creation:** if the user is found, the controller signs a JWT with `jsonwebtoken` (valid for 24 hours). The token payload contains `user_id`, `username`, `email` and `user_level_id`. The user info and the token are returned in the response. If no user matches, the API responds with 401.
3. **Secret key:** the signing secret is stored in `.env` as `JWT_SECRET`, which is not committed to Git.
4. **Authentication middleware:** `authenticateToken` reads the `Authorization: Bearer <token>` header and verifies the token. On success, the decoded user is stored in `req.user` and the request continues. A missing token returns 401 and an invalid or expired token returns 403.
5. **Protected route:** `GET /api/auth/me` uses the middleware and returns the user decoded from the token.
