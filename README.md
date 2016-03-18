CMSC128_CSV_AB7L
=====


Introduction
-----
This application uses the anytv-node-boilerplate.

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
  sudo n stable
  sudo ln -sf /usr/local/n/versions/node/<VERSION_OF_NODE>/bin/node /usr/bin/node
  ```
  
## Running the application

1. git clone https://github.com/WareAnj/CMSC128_CSV_AB7L.git

2. Import `database/schema.sql`
  ```sh
  mysql -u root -p < database/schema.sql
  ```

3. Run this commands:
  ```sh
  npm install
  sudo npm install -g nodemon
  sudo npm install -g eslint
  sudo npm install -g gulp
  ```

4. npm start
5. check http://localhost:8000

## Author

CMSC 128 AB-7L Students
