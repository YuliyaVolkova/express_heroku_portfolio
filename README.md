## Сервер с Express, настроен для хостинга на Heroku,
## проект Portfolio
#### Чтобы запустить сервер с express:
* npm install
* npm run server (это запустит сервер с express)

#### Проект будет доступен по адресу localhost:5000
#### Сервер работает с БД Mongo.db, настроен роутинг, авторизация через Passport.js, с формы на странице "Мои работы", сервер отправляет письмо на email. Чтобы потестить эти возможности в папке config создайте файл config.json, в котором пропишите данные доступа к вашей базе Mongo.db, email, на который должно уходить письмо:

`{
  "server": { ## укажите путь к серверу
    "path": "<path>",
    "blog": "/api/blog",
    "skill": "/api/skill",
    "slider": "/api/slider"
  },
  "db": { ## настройки вашей БД
    "host": "<db host>", 
    "port": "<db port>",			
    "name": "<db name>",		
    "user": "<user name>",				
    "password": "<password>"	
  },
  "mail": { ## настройки почты
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
