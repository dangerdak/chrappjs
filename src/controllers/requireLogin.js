const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    // store user's original destination for redirection after login
    req.session.destination = req.originalUrl;
    res.status(401).render('login', {
      pageTitle: 'Login',
      messages: [{ content: 'Please login to continue', error: true }],
    });
  }
  else {
    next('route');
  }
};

module.exports = requireLogin;
