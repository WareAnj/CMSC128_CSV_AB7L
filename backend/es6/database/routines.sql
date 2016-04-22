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
	SELECT id, username, IF(SHA1(_password) = password, TRUE, FALSE) AS is_password_valid,
	classification, given_name, middle_name, last_name, is_approved, date_approved
	FROM faculty_user WHERE username = _username;
END $$
DELIMITER ;


-- ADMIN_LOGIN procedure
DROP PROCEDURE IF EXISTS ADMIN_LOGIN;
DELIMITER $$
CREATE PROCEDURE ADMIN_LOGIN (_username VARCHAR(32), _password VARCHAR(32))
BEGIN
	SELECT username,
	IF(SHA1(_password) = password, TRUE, FALSE) AS is_password_valid
	FROM admin WHERE username = _username;
END $$
DELIMITER ;


-- APPROVE_USER procedure
DROP PROCEDURE IF EXISTS APPROVE_USER;
DELIMITER $$
CREATE PROCEDURE APPROVE_USER (_faculty_user_id INT)
BEGIN
	UPDATE faculty_user SET is_approved = TRUE WHERE id = _faculty_user_id;
	SELECT 'Faculty user successfully approved!' AS message;
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


-- GET_LOGIN_LOGS procedure
DROP PROCEDURE IF EXISTS GET_LOGIN_LOGS;
DELIMITER $$
CREATE PROCEDURE GET_LOGIN_LOGS ()
BEGIN
	SELECT fu.id, fu.username, fu.employee_id, fu.classification, fu.given_name,
	fu.middle_name, fu.last_name, fu.is_approved, fu.date_approved, ll.date_login
	FROM login_logs ll, faculty_user fu WHERE ll.faculty_user_id = fu.id;
END $$
DELIMITER ;


-- GET_LOGOUT_LOGS procedure
DROP PROCEDURE IF EXISTS GET_LOGOUT_LOGS;
DELIMITER $$
CREATE PROCEDURE GET_LOGOUT_LOGS ()
BEGIN
	SELECT fu.id, fu.username, fu.employee_id, fu.classification, fu.given_name,
	fu.middle_name, fu.last_name, fu.is_approved, fu.date_approved, ll.date_logout
	FROM logout_logs ll, faculty_user fu WHERE ll.faculty_user_id = fu.id;
END $$
DELIMITER ;


-- GET_LOGIN_LOGS_BY_USER procedure
DROP PROCEDURE IF EXISTS GET_LOGIN_LOGS_BY_USER;
DELIMITER $$
CREATE PROCEDURE GET_LOGIN_LOGS_BY_USER (_id INT)
BEGIN
	SELECT fu.id, fu.username, fu.employee_id, fu.classification, fu.given_name,
	fu.middle_name, fu.last_name, fu.is_approved, fu.date_approved, ll.date_login
	FROM login_logs ll, faculty_user fu WHERE fu.id = _id AND ll.faculty_user_id = fu.id;
END $$
DELIMITER ;


-- GET_LOGOUT_LOGS_BY_USER procedure
DROP PROCEDURE IF EXISTS GET_LOGOUT_LOGS_BY_USER;
DELIMITER $$
CREATE PROCEDURE GET_LOGOUT_LOGS_BY_USER (_id INT)
BEGIN
	SELECT fu.id, fu.username, fu.employee_id, fu.classification, fu.given_name,
	fu.middle_name, fu.last_name, fu.is_approved, fu.date_approved, ll.date_logout
	FROM logout_logs ll, faculty_user fu WHERE fu.id = _id AND ll.faculty_user_id = fu.id;
END $$
DELIMITER ;


-- INSERT_LECTURE_SECTION procedure
DROP PROCEDURE IF EXISTS INSERT_LECTURE_SECTION;
DELIMITER $$
CREATE PROCEDURE INSERT_LECTURE_SECTION (_faculty_user_id INT, _course_code VARCHAR(16), _name VARCHAR(8))
BEGIN
	DECLARE _course_id INT;

	-- Check if there is already a lecture section under that course
	IF (SELECT COUNT(*) FROM section s, course c WHERE s.course_id = c.id AND s.name = _name AND c.code = _course_code) THEN
		SELECT CONCAT('Lecture section ', _name, ' under that course is already existing') AS message;
	ELSE
		INSERT INTO course (code, title, description) VALUES ('CMSC 128', 'Introduction to Software Engineering', '*insert desc here*');

		SELECT COUNT(*) INTO _course_id FROM course;

		INSERT INTO section (course_id, name) VALUES (_course_id, _name);
		INSERT INTO faculty_user_course (faculty_user_id, course_id) VALUES (_faculty_user_id, _course_id);

		SELECT 'Lecture section was successfully created' AS message;
	END IF;
END $$
DELIMITER ;


-- UPDATE_LECTURE_SECTION procedure
DROP PROCEDURE IF EXISTS UPDATE_LECTURE_SECTION;
DELIMITER $$
CREATE PROCEDURE UPDATE_LECTURE_SECTION (_faculty_user_id INT, _course_code VARCHAR(16), _section_name VARCHAR(8), _new_section_name VARCHAR(8))
BEGIN
	DECLARE _course_id INT DEFAULT 0;

	SELECT DISTINCT c.id INTO _course_id FROM course c, section s, faculty_user_course fc WHERE c.id = fc.faculty_user_id AND c.code = _course_code AND s.name = _section_name AND c.id = s.course_id AND fc.course_id = c.id;

	IF (_course_id = 0) THEN
		SELECT CONCAT('Section name ', _section_name, ' does not exist') AS message;
	ELSEIF (SELECT COUNT(*) FROM section s, course c WHERE s.course_id = _course_id AND s.name = _new_section_name AND c.code = _course_code)
	THEN
		SELECT CONCAT('Lecture section name ', _new_section_name, ' under ', _course_code, ' already exists') AS message;
	ELSE
		UPDATE section SET name = _new_section_name WHERE course_id = _course_id;

		SELECT 'Lecture section name was successfully updated' AS message;
	END IF;
END $$
DELIMITER ;
