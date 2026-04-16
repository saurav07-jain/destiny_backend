const HARDCODED_USER = {
  id: '1',
  name: 'Gaurav',
  email: 'gaurav@destiny.app',
  role: 'admin',
};

const CREDENTIALS = {
  username: 'gaurav',
  password: '123456',
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username !== CREDENTIALS.username || password !== CREDENTIALS.password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  res.json({ user: HARDCODED_USER });
};

const getMe = (_req, res) => {
  res.json({ user: HARDCODED_USER });
};

module.exports = { login, getMe };
