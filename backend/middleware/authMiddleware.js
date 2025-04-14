const isManager = (req, res, next) => {
  // Assuming user is attached from JWT
  if (req.user.role !== 'MANAGER') {
    return res.status(403).json({ error: 'Forbidden - Manager access required' });
  }
  next();
};

module.exports = { isManager };