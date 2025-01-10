function notFound(req, res, next) {
  req.status(404);
  res.json({
    status: "KO",
    message: "Page not found",
  });
}

module.exports = notFound;
