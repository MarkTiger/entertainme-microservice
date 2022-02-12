const serverErr = {
  message: 'Internal server error',
};

module.exports = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.response.statusText) {
    case 'Not Found':
      res.status(404).json({ message: err.response.data.message });
      break;
    case 'Not Modified':
      res.status(304).json({ message: err.response.data.message });
      break;
    default:
      res.status(500).json(serverErr);
      break;
  }
};
