exports.get = (req, res) => {
  res.render('groups', {pageTitle: 'Your Groups', groups: []});
}
