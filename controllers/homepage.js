module.exports.index = function (req, res) {
  const sendObj = {
    title: 'Главная страница',
    //msg: req.query.msg
  };
  res.render('my_pages/index', Object.assign({}, sendObj));
}