## Сервер с Express настроен для хостинга на Heroku: проект Portfolio_Loftschool
## Посмотреть мой проект можно здесь: https://serverportfolio.herokuapp.com/
#### Чтобы запустить сервер с express локально:
* npm install
* npm run server (это запустит сервер с express)
#### Проект будет доступен по адресу localhost:5000
#### Сервер работает с БД Mongo.db, настроен роутинг, авторизация через Passport.js, с формы на странице "Мои работы", сервер отправляет письмо на email. Чтобы потестить эти возможности в папке config создайте файл config.json, в котором пропишите host вашего сервера, данные доступа к вашей базе Mongo.db, email, на который должно уходить письмо:

````{
## укажите путь к серверу
  "server": {
    "path": "http://localhost:5000",
    "blog": "/api/blog",
    "skill": "/api/skill",
    "slider": "/api/slider"
  },
 ## настройки вашей БД
  "db": {
    "host": "<db host>", 
    "port": "<db port>",			
    "name": "<db name>",		
    "user": "<user name>",				
    "password": "<password>"	
  },
 ## настройки почты
  "mail": {
    "subject": "Сообщение с сайта",
    "smtp": {
      "host": "<email host>",
      "port": 465,
      "secure": true,
      "auth": {
        "user": "<email>",
        "pass": "<password>"
      }
    }
  }
}
````
