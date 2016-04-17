CMSC128_CSV_AB7L
=====


Introduction
-----
The CSVs is an online application that allows teachers to select random ‘volunteers’. The volunteers are students enrolled in a class.


## Prerequisites
1. MySQL 5.6, run:
  ```sh
  sudo apt-get install mysql-client-core-5.6
  sudo apt-get install mysql-server-5.6
  ```

  then set the password of the `root` user to `user`

2. git:
  ```sh
  sudo apt-get install git
  ```

3. npm:
  ```sh
  sudo apt-get install npm
  ```

4. Node.js version 5.0 or above:
  ```sh
  sudo npm cache clean -f
  sudo npm install -g n
  sudo n 5.6
  sudo ln -sf /usr/local/n/versions/node/5.6.0/bin/node /usr/bin/node
  ```

5. Redis (this will be the storage of user sessions)
  Go to the website `redis.io` and download the latest version of Redis (WARNING: Version may vary)

  ```sh
  tar xzf redis-3.0.7.tar.gz
  cd redis-3.0.7
  make
  ```

  Run the test to make sure that the compilation is successful:
  ```sh
  make test
  ```

  To run the redis server:
  ```sh
  src/redis-server
  ```


## Running the application

1. git clone https://github.com/WareAnj/CMSC128_CSV_AB7L.git

2. Import all files in the folder `backend/es6/database/`
  ```sh
  ./setup_database.sh
  ```

3. Run this commands:
  ```sh
  npm install
  sudo npm install -g nodemon
  sudo npm install -g gulp
  ```

4. npm start
5. check http://localhost:8000

## To check if you follow the conventions, run
```sh
gulp
```

## To run tests
-----
```
sudo npm install -g mocha
npm test
```

If the output is too long and the terminal can't scroll up anymore, output the test to a file
```
npm test >> tests.log
```

DON'T FORGET to also put the test cases in the test/cases folder

## Author

CMSC 128 AB-7L Students
