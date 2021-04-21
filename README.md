<h1 align="center">ExpressJS - Uvies RESTfull API</h1>

#background_projek. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open the app's directory in CMD or Terminal
2. Type `npm install`
3. Create a new file and name it as **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL using Third-party tool like xampp, etc.
5. Create a database with the name uvies_app, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension you have installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/9852901/TzJoEfvL)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST = localhost // Database host
DB_USER = root
DB_PASS =
PORT = 3001
```

## License

© [Teguh Wicaksono](https://github.com/twicks95/)