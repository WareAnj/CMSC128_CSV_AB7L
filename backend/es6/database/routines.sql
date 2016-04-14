USE cmsc128ab7l;

/**
 *
 * Contains all the database routines
 *
 */


-- REGISTER function
DROP FUNCTION IF EXISTS REGISTER;
DELIMITER $$
CREATE FUNCTION REGISTER (username VARCHAR(32), password VARCHAR(32), employee_id VARCHAR(16), classification VARCHAR(32), given_name VARCHAR(64), middle_name VARCHAR(32), last_name VARCHAR(32)) RETURNS VARCHAR(64)
BEGIN
	 DECLARE _return_message VARCHAR(64) DEFAULT '';
	 DECLARE _count_username INT DEFAULT 0;
	 DECLARE _count_employee_id INT DEFAULT 0;

	 SELECT COUNT(username) INTO _count_username FROM faculty_user WHERE username = username;

	 SELECT COUNT(employee_id) INTO _count_employee_id FROM faculty_user WHERE employee_id = employee_id;

	IF (_count_username = 1) THEN
		SET _return_message := 'Username already exists';
	ELSEIF (_count_employee_id = 1) THEN
		SET _return_message := 'Employee id already exists';
	ELSE
		INSERT INTO faculty_user(username, password, employee_id, classification, given_name, middle_name, last_name, is_approved)
		VALUES (username, SHA1(password), employee_id, classification, given_name, middle_name, last_name, false);
		SET _return_message := 'Faculty_user created';
	END IF;

	RETURN _return_message;
END $$
DELIMITER ;


-- REGISTER procedure
DROP PROCEDURE IF EXISTS REGISTER;
DELIMITER $$
CREATE PROCEDURE REGISTER (username VARCHAR(32), password VARCHAR(32), employee_id VARCHAR(16), classification VARCHAR(32), given_name VARCHAR(64), middle_name VARCHAR(32), last_name VARCHAR(32))
BEGIN
	SELECT REGISTER(username, password, employee_id, classification, given_name, middle_name, last_name) AS message;
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
	INSERT INTO login_logs (login_logs_date_login, login_logsid)
	VALUES (now(), user_id);
END $$
DELIMITER ;
