

export async function authorizeAdmin(req, res, next) {
  if ('ADMIN' !== req.user.role) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}