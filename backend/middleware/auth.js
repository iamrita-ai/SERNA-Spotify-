export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized - Please login' });
};

export const isAdmin = (req, res, next) => {
  const { password } = req.body;
  
  if (password === process.env.ADMIN_PASSWORD) {
    return next();
  }
  
  res.status(403).json({ message: 'Invalid admin password' });
};
