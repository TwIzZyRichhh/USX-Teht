import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.json());
app.use('/media', express.static('media'));

// ---------- Mock data ----------
const mediaItems = [
  {media_id: 9632, filename: 'ffd8.jpg', filesize: 887574, title: 'Favorite drink', description: '', user_id: 1606, media_type: 'image/jpeg', created_at: '2023-10-16T19:00:09.000Z'},
  {media_id: 9626, filename: 'dbbd.jpg', filesize: 60703, title: 'Miika', description: 'My Photo', user_id: 3671, media_type: 'image/jpeg', created_at: '2023-10-13T12:14:26.000Z'},
  {media_id: 9625, filename: '2f9b.jpg', filesize: 30635, title: 'Aksux', description: 'friends', user_id: 260, media_type: 'image/jpeg', created_at: '2023-10-12T20:03:08.000Z'},
  {media_id: 9592, filename: 'f504.jpg', filesize: 48975, title: 'Desert', description: '', user_id: 3609, media_type: 'image/jpeg', created_at: '2023-10-12T06:59:05.000Z'},
  {media_id: 9590, filename: '60ac.jpg', filesize: 23829, title: 'Basement', description: 'Light setup in basement', user_id: 305, media_type: 'image/jpeg', created_at: '2023-10-12T06:56:41.000Z'},
];

const users = [
  {user_id: 260, username: 'VCHar', password: '********', email: 'vchar@example.com', user_level_id: 1, created_at: '2020-09-12T06:56:41.000Z'},
  {user_id: 305, username: 'Donatello', password: '********', email: 'dona@example.com', user_level_id: 1, created_at: '2021-12-11T06:00:41.000Z'},
  {user_id: 3609, username: 'Anon5468', password: '********', email: 'x58df@example.com', user_level_id: 3, created_at: '2023-04-02T05:56:41.000Z'},
];

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
      {method: 'GET', path: '/api/user', info: 'Get all users'},
      {method: 'GET', path: '/api/user/:id', info: 'Get one user'},
      {method: 'POST', path: '/api/user', info: 'Add a user'},
      {method: 'PUT', path: '/api/user/:id', info: 'Modify a user'},
      {method: 'DELETE', path: '/api/user/:id', info: 'Delete a user'},
    ],
  });
});

// ---------- Media endpoints ----------
/** Get all media items */
app.get('/api/media', (req, res) => {
  res.json(mediaItems);
});

/** Get one media item by id */
app.get('/api/media/:id', (req, res) => {
  const item = mediaItems.find((m) => m.media_id === Number(req.params.id));
  if (!item) return res.status(404).json({message: 'Media item not found'});
  res.json(item);
});

/** Add a media item */
app.post('/api/media', (req, res) => {
  const {filename, title, description, user_id, media_type} = req.body;
  if (!filename || !title || !user_id || !media_type) {
    return res.status(400).json({message: 'Missing required fields'});
  }
  const newItem = {
    media_id: Math.max(...mediaItems.map((m) => m.media_id)) + 1,
    filename,
    filesize: 0,
    title,
    description: description || '',
    user_id,
    media_type,
    created_at: new Date().toISOString(),
  };
  mediaItems.push(newItem);
  res.status(201).json({message: 'Media item added', item: newItem});
});

/** Modify a media item */
app.put('/api/media/:id', (req, res) => {
  const item = mediaItems.find((m) => m.media_id === Number(req.params.id));
  if (!item) return res.status(404).json({message: 'Media item not found'});
  if (req.body.title !== undefined) item.title = req.body.title;
  if (req.body.description !== undefined) item.description = req.body.description;
  res.json({message: 'Media item updated', item});
});

/** Delete a media item */
app.delete('/api/media/:id', (req, res) => {
  const index = mediaItems.findIndex((m) => m.media_id === Number(req.params.id));
  if (index === -1) return res.status(404).json({message: 'Media item not found'});
  mediaItems.splice(index, 1);
  res.json({message: 'Media item deleted'});
});

// ---------- User endpoints ----------
/** Get all users */
app.get('/api/user', (req, res) => {
  res.json(users);
});

/** Get one user by id */
app.get('/api/user/:id', (req, res) => {
  const user = users.find((u) => u.user_id === Number(req.params.id));
  if (!user) return res.status(404).json({message: 'User not found'});
  res.json(user);
});

/** Add a user */
app.post('/api/user', (req, res) => {
  const {username, password, email} = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({message: 'Missing required fields'});
  }
  const newUser = {
    user_id: Math.max(...users.map((u) => u.user_id)) + 1,
    username,
    password: '********',
    email,
    user_level_id: 3,
    created_at: new Date().toISOString(),
  };
  users.push(newUser);
  res.status(201).json({message: 'User added', user: newUser});
});

/** Modify a user */
app.put('/api/user/:id', (req, res) => {
  const user = users.find((u) => u.user_id === Number(req.params.id));
  if (!user) return res.status(404).json({message: 'User not found'});
  if (req.body.username !== undefined) user.username = req.body.username;
  if (req.body.email !== undefined) user.email = req.body.email;
  res.json({message: 'User updated', user});
});

/** Delete a user */
app.delete('/api/user/:id', (req, res) => {
  const index = users.findIndex((u) => u.user_id === Number(req.params.id));
  if (index === -1) return res.status(404).json({message: 'User not found'});
  users.splice(index, 1);
  res.json({message: 'User deleted'});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});