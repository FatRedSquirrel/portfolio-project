const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'User not found' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
  console.log('server is running on 8000 port');
});

// "profile": [
//   {
//     "id": "1",
//     "first": "jgh",
//     "lastname": "asf",
//     "age": 465,
//     "currency": "RUB",
//     "country": "Belarus",
//     "city": "Moscow",
//     "username": "admin213",
//     "avatar": "https://mobimg.b-cdn.net/v3/fetch/0f/0fa2ad47af6d1440a1662c1651724ab0.jpeg",
//     "firstname": "123123123",
//     "userId": "1"
//   },
//   {
//     "id": "2",
//     "first": "123",
//     "lastname": "a112312312",
//     "age": 46513,
//     "currency": "RUB",
//     "country": "Belarus",
//     "city": "Moscow",
//     "username": "admin213",
//     "avatar": "https://www.hdwallpapers.in/download/boy_zenitsu_agatsuma_hd_demon_slayer_kimetsu_no_yaiba-HD.jpg",
//     "firstname": "xasan",
//     "userId": "2"
//   }
// ]
