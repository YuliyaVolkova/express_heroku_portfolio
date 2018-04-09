module.exports.admin = function (req, res) {
  res.render('my_pages/admin', {
    title: 'Admin panel'
  });
};