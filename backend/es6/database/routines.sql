USE cmsc128ab7l;

/**
 *
 * Contains all the database routines
 *
 */

-- REGISTER function
DROP FUNCTION IF EXISTS REGISTER;
DELIMITER $$
CREATE FUNCTION `REGISTER` (_faculty_user_username VARCHAR(32), _faculty_user_password VARCHAR(32), _faculty_user_employee_id VARCHAR(16), _faculty_user_classification VARCHAR(32), _faculty_user_given_name VARCHAR(64), _faculty_user_middle_name VARCHAR(32), _faculty_user_last_name VARCHAR(32)) RETURNS VARCHAR(20) CHARSET latin1
BEGIN
	 DECLARE _return_message VARCHAR(20) DEFAULT '';
	 DECLARE _count_username INT DEFAULT 0;
	 DECLARE _count_employee_id INT DEFAULT 0;

	 SELECT COUNT(faculty_user_username) INTO _count_username FROM faculty_user WHERE faculty_user_username = _faculty_user_username;

	 SELECT COUNT(faculty_user_employee_id) INTO _count_employee_id FROM faculty_user WHERE faculty_user_employee_id = _faculty_user_employee_id;

	IF (_count_username = 1) THEN
		SET _return_message := 'Username already exists';
	ELSEIF (_count_employee_id = 1) THEN
		SET _return_message := 'Employee id already exists';
	ELSE
		INSERT INTO faculty_user(faculty_user_username, faculty_user_password, faculty_user_employee_id, faculty_user_classification, faculty_user_given_name, faculty_user_middle_name, faculty_user_last_name, faculty_user_is_approved)
		VALUES (_faculty_user_username, SHA1(_faculty_user_password), _faculty_user_employee_id, _faculty_user_classification, _faculty_user_given_name, _faculty_user_middle_name, _faculty_user_last_name, false);
		SET _return_message := 'Faculty_user created';
	END IF;

	RETURN _return_message;
END $$
DELIMITER ;

-- LOGIN procedure
DROP PROCEDURE IF EXISTS LOGIN;
DELIMITER $$
CREATE PROCEDURE LOGIN (_faculty_user_username VARCHAR(32), _faculty_user_password VARCHAR(32))
BEGIN
	SELECT 	faculty_user_id, faculty_user_username,
			IF(SHA1(_faculty_user_password) = faculty_user_password, TRUE, FALSE) AS is_password_valid,
			faculty_user_classification, faculty_user_given_name, faculty_user_middle_name,
			faculty_user_last_name FROM faculty_user WHERE faculty_user_username = _faculty_user_username;
END $$
DELIMITER ;

-- INSERT_LOGIN_LOGS procedure
DROP PROCEDURE IF EXISTS INSERT_LOGIN_LOGS;
DELIMITER $$
CREATE PROCEDURE INSERT_LOGIN_LOGS (_faculty_user_user_id INT)
BEGIN
	INSERT INTO login_logs (login_logs_date_login, login_logs_faculty_user_id)
	VALUES (now(), _faculty_user_user_id);
END $$
DELIMITER ;
