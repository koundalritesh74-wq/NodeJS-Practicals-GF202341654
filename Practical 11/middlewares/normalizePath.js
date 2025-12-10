import path from 'path';

function normalizePath(req, res, next) {
  const originalPath = req.path;
  const normalizedPath = path.posix.normalize(originalPath);

  if (normalizedPath !== originalPath) {
    console.log(`Redirecting from ${originalPath} to ${normalizedPath}`);
    return res.redirect(301, normalizedPath);
  }

  next();
}

export default normalizePath;
