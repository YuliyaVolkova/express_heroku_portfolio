module.exports.about = function (req, res) {
  const sendObj = {
    title: 'Обо мне',
  };
  res.render('my_pages/about', Object.assign({}, sendObj));
}