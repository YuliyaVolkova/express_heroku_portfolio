const nodemailer = require('nodemailer');
const config = require('../config/config.json');

module.exports.works = function (req, res) {
  const sendObj = {
    title: 'Мои работы',
    msg: req.flash('message')
  };
  res.render('my_pages/my_works', Object.assign({}, sendObj));
}

module.exports.sendEmail = function(req, res) {
  // требуем наличия имени, обратной почты и текста
  if (!req.body.name || !req.body.email || !req.body.text) {
    //если что-либо не указано - сообщаем об этом
    req.flash('message', 'Все поля нужно заполнить!')
    return res.redirect('/works');
  }
  // инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req
      .body
      .text
      .trim()
      .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
  };
  // отправляем почту
  transporter.sendMail(mailOptions, function (error, info) {
    //если есть ошибки при отправке - сообщаем об этом
    if (error) {
      req.flash('message', 'При отправке письма произошла ошибка: ' + error);
      return res.redirect('/works');
    }
    req.flash('message', 'Письмо успешно отправлено')
    res.redirect('/works');
  });
}