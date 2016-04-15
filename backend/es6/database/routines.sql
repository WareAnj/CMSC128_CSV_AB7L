USE cmsc128ab7l;

/**
 *
 * Contains all the database routines
 *
 */


-- REGISTER function
DROP FUNCTION IF EXISTS REGISTER;
DELIMITER $$
CREATE FUNCTION REGISTER (_username VARCHAR(32), _password VARCHAR(32), _employee_id VARCHAR(16), _classification VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _last_name VARCHAR(32)) RETURNS VARCHAR(64)
BEGIN
	 DECLARE _return_message VARCHAR(64) DEFAULT '';
	 DECLARE _count_username INT DEFAULT 0;
	 DECLARE _count_employee_id INT DEFAULT 0;

	 SELECT COUNT(username) INTO _count_username FROM faculty_user WHERE username = _username;

	 SELECT COUNT(employee_id) INTO _count_employee_id FROM faculty_user WHERE employee_id = _employee_id;

	IF (_count_username = 1) THEN
		SET _return_message := 'Username already exists';
	ELSEIF (_count_employee_id = 1) THEN
		SET _return_message := 'Employee id already exists';
	ELSE
		INSERT INTO faculty_user(username, password, employee_id, classification, given_name, middle_name, last_name, is_approved)
		VALUES (_username, SHA1(_password), _employee_id, _classification, _given_name, _middle_name, _last_name, false);
		SET _return_message := 'Faculty_user created';
	END IF;

	RETURN _return_message;
END $$
DELIMITER ;


-- REGISTER procedure
DROP PROCEDURE IF EXISTS REGISTER;
DELIMITER $$
CREATE PROCEDURE REGISTER (_username VARCHAR(32), _password VARCHAR(32), _employee_id VARCHAR(16), _classification VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _last_name VARCHAR(32))
BEGIN
	SELECT REGISTER(_username, _password, _employee_id, _classification, _given_name, _middle_name, _last_name) AS message;
END $$
DELIMITER ;


-- LOGIN procedure
DROP PROCEDURE IF EXISTS LOGIN;
DELIMITER $$
CREATE PROCEDURE LOGIN (_username VARCHAR(32), _password VARCHAR(32))
BEGIN
	SELECT 	id, username,
			IF(SHA1(_password) = password, TRUE, FALSE) AS is_password_valid,
			classification, given_name, middle_name,
			last_name FROM faculty_user WHERE username = _username;
END $$
DELIMITER ;


-- INSERT_LOGIN_LOGS procedure
DROP PROCEDURE IF EXISTS INSERT_LOGIN_LOGS;
DELIMITER $$
CREATE PROCEDURE INSERT_LOGIN_LOGS (user_id INT)
BEGIN
	INSERT INTO login_logs (faculty_user_id, date_login)
	VALUES (user_id, now());
END $$
DELIMITER ;


-- INSERT_LOGOUT_LOGS procedure
DROP PROCEDURE IF EXISTS INSERT_LOGOUT_LOGS;
DELIMITER $$
CREATE PROCEDURE INSERT_LOGOUT_LOGS (user_id INT)
BEGIN
	INSERT INTO logout_logs (faculty_user_id, date_logout)
	VALUES (user_id, now());
END $$
DELIMITER ;
