const HARDCODED_USER = {
  id: '1',
  name: 'Gaurav',
  email: 'gaurav@destiny.app',
  role: 'admin',
  avatar: null,
};

const getProfile = (_req, res) => {
  res.json({ user: HARDCODED_USER });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  if (name) HARDCODED_USER.name = name;
  if (avatar !== undefined) HARDCODED_USER.avatar = avatar;
  res.json({ user: HARDCODED_USER });
};

module.exports = { getProfile, updateProfile };
