CMSC128_CSV_AB7L
=====


Introduction
-----
This application uses the anytv-node-boilerplate.

The CSVs is an online application that allows teachers to select random ‘volunteers’. The volunteers are students enrolled in a class.


## Prerequisites
1. MySQL 5.6, run
  `sudo apt-get install mysql-client-core-5.6` and 
  `sudo apt-get install mysql-server-5.6`
  then set the password of the `root` user to `user`
2. git (`sudo apt-get install git`)
3. npm (`sudo apt-get install npm`)
4. Node.js version 5.0 or above.
  `sudo npm cache clean -f`
  `sudo npm install -g n`
  `sudo n stable`
  `sudo ln -sf /usr/local/n/versions/node/<VERSION_OF_NODE>/bin/node /usr/bin/node`
  
## Running the application

1. git clone https://github.com/WareAnj/CMSC128_CSV_AB7L.git
2. Import `database/schema.sql` and `database/seed.sql`
  ```sh
  mysql -uroot -puser < database/schema.sql
  mysql -uroot -puser test < database/seed.sql
  ```

3. Run this commands :
  ```sh
  npm install
  sudo npm install -g nodemon
  ```
4. npm start
4. check http://localhost:5000


Creating a controller
-----

Controllers are the heart of your application, as they determine how HTTP requests should be handled. They are located at the `controllers` folder. They are not automatically routed. You must explicitly route them in `config/router.js`. Using sub-folders for file organization is allowed.

Here's a typical controller:

```javascript
// user.js

const util   = require(__dirname + '/../helpers/util'),
const mysql  = require('anytv-node-mysql'),
const moment = require('moment');



exports.update_user = (req, res, next) => {
    const data = util.get_data(
        {
            user_id: '',
            _first_name: '',
            _last_name: ''
        },
        req.body
    );

    function start () {
        let id;

        if (data instanceof Error) {
            return res.warn(400, {message: data.message});
        }

        id = data.user_id;
        delete data.user_id;

        mysql.use('my_db')
            .query(
                'UPDATE users SET ? WHERE user_id = ? LIMIT 1;',
                [data, id],
                send_response
            )
            .end();
    }

    function send_response (err, result) {
        if (err) {
            return next(err);
        }

        res.send({message: 'User successfully updated'});
    }

    start();
};



exports.delete_user = (req, res, next) => {
...
```

Detailed explanation:

```javascript
const config = require(__dirname + '/../config/config');
const util   = require(__dirname + '/../helpers/util');
const mysql  = require('anytv-node-mysql');
const moment = require('moment');
```

- The first part of the controller contains the config, helpers, and libraries to be used by the controller's functions
- Notice the order of imported files, local files first followed by 3rd-party libraries
- This block should always be followed by at least one new line to separate them visually easily



```javascript
exports.update_user = (req, res, next) => {
```

- snake_case on exported function names
- `req` is an object from express, it contains user's request
- `res` also an object from express, use this object to respond to the request
- `next` a function from express, use this to pass to the next middleware which is the error handler


```javascript
    const data = util.get_data(
        {
            user_id: '',
            _first_name: '',
            _last_name: ''
        },
        req.body
    ),
```

- it is common to use `data` as the variable to store the parameters given by the user
- `util.get_data` helps on filtering the request payload
- putting an underscore as first character makes it optional
- non-function variables are also declared first
- new line after non-function variables to make it more readable

```javascript
    function start () {
        let id;

        if (data instanceof Error) {
            return res.warn(400, {message: data.message});
        }

        id = data.id;
        delete data.id;

        mysql.use('my_db')
            .query(
                'UPDATE users SET ? WHERE user_id = ? LIMIT 1;',
                [id, data],
                send_response
            )
            .end();
    }
```

- `start` function is required for uniformity
- the idea is to have the code be readable like a book, from top-to-bottom
- since variables are declared first and functions are assigned to variables, we thought of having `start` function to denote the start of the process
- as much as possible, there should be no more named functions inside this level except for `forEach`, `map`, `filter`, and `reduce`. If lodash is available, use it.

```javascript
    function send_response (err, result) {
        if (err) {
            return next(err);
        }

        res.send({message: 'User successfully updated'});
    }

    start();
```

- `send_response` is common to be the last function to be executed
- use `next` for passing server fault errors
- after all variable and function declarations, call `start`

Notes:
- use `res.warn(status, obj)` or `res.warn(obj)`  instead of `next(error)` if the error is caused by the API caller




<!-- Install the tools needed:
```sh
npm install istanbul -g
npm install apidoc -g
npm install mocha -g
npm install --dev
```

## Running test

```sh
npm test
```

## Code coverage

```sh
npm run coverage
```
Then open coverage/lcov-report/index.html.

## API documentation

```sh
npm run docs
```
Then open apidoc/index.html. -->

## Author

CMSC 128 AB-7L Students
