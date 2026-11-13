import express from 'express';
import mediaRouter from '../routes/media-router.js';
import userRouter from '../routes/user-router.js';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.json());
app.use('/media', express.static('media'));

// ---------- Landing page ----------
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Media Sharing REST API',
    message: 'Available endpoints:',
    endpoints: [
      {method: 'GET', path: '/api/media', info: 'Get all media items'},
      {method: 'GET', path: '/api/media/:id', info: 'Get one media item'},
      {method: 'POST', path: '/api/media', info: 'Add a media item'},
      {method: 'PUT', path: '/api/media/:id', info: 'Modify a media item'},
      {method: 'DELETE', path: '/api/media/:id', info: 'Delete a media item'},
      {method: 'GET', path: '/api/users', info: 'Get all users'},
      {method: 'GET', path: '/api/users/:id', info: 'Get one user'},
      {method: 'POST', path: '/api/users', info: 'Add a user'},
      {method: 'PUT', path: '/api/users/:id', info: 'Modify a user'},
      {method: 'DELETE', path: '/api/users/:id', info: 'Delete a user'},
    ],
  });
});

// ---------- API routes ----------
app.use('/api/media', mediaRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});