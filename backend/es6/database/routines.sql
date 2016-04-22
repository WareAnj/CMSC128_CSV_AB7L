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

-- POST_VOLUNTEER function
DROP FUNCTION IF EXISTS POST_VOLUNTEER;
DELIMITER $$
CREATE FUNCTION POST_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _section_code VARCHAR(4), _student_number VARCHAR(16), _last_name VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _classification VARCHAR(32), _college VARCHAR(8), _degree VARCHAR(8)) RETURNS VARCHAR(64)
-- CREATE FUNCTION POST_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _section_code VARCHAR(4), _student_number VARCHAR(16), _last_name VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _classification VARCHAR(32), _college VARCHAR(8), _degree VARCHAR(8)) RETURNS INT
BEGIN
	 DECLARE _count INT DEFAULT 0;
	 DECLARE _student_id INT;
	 DECLARE _section_id INT;
	 DECLARE _return_message VARCHAR(64) DEFAULT '';

	 SELECT COUNT(*) INTO _count
	 FROM student s, section sect, student_section ss, faculty_user f, course c, faculty_user_course fc
	 WHERE s.id = ss.student_id AND ss.section_id = sect.id AND sect.course_id = c.id AND f.id = fc.faculty_user_id
	 AND c.id = fc.course_id AND f.id = _id AND c.code = _course_code AND sect.name = _section_name AND s.student_number = _student_number;

	IF (_count = 1) THEN
		SET _return_message := 'Student already exists';
	ELSE
		INSERT INTO student(student_number, given_name, middle_name, last_name, degree, classification, college)
		VALUES (_student_number, _given_name, _middle_name, _last_name, _degree, _classification, _college);

		SELECT MAX(id) INTO _student_id FROM student s;

		SELECT sect.id INTO _section_id FROM section sect, course c
		WHERE c.id = sect.course_id AND sect.name = _section_name
		AND sect.code = _section_code AND c.code = _course_code;

		INSERT INTO student_section(student_id, section_id) VALUES (_student_id, _section_id);

		SET _return_message := 'Student created';
	END IF;

	RETURN _return_message;
	-- RETURN _student_id;

END $$
DELIMITER ;

-- POST_VOLUNTEER procedure
DROP PROCEDURE IF EXISTS POST_VOLUNTEER;
DELIMITER $$
CREATE PROCEDURE POST_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _section_code VARCHAR(4), _student_number VARCHAR(16), _last_name VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _classification VARCHAR(32), _college VARCHAR(8), _degree VARCHAR(8))
BEGIN
	 SELECT POST_VOLUNTEER(_id, _course_code, _section_name, _section_code, _student_number, _last_name, _given_name, _middle_name, _classification, _college, _degree) AS message;

END $$
DELIMITER ;


-- DELETE_VOLUNTEER function
DROP FUNCTION IF EXISTS DELETE_VOLUNTEER;
DELIMITER $$
CREATE FUNCTION DELETE_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _section_code VARCHAR(4), _student_number VARCHAR(16)) RETURNS VARCHAR(64)
BEGIN
	 DECLARE _count INT DEFAULT 0;
	 DECLARE _student_id INT;
	 DECLARE _section_id INT;
	 DECLARE _return_message VARCHAR(64) DEFAULT '';

	 SELECT COUNT(*) INTO _count
	 FROM student s, section sect, student_section ss, faculty_user f, course c, faculty_user_course fc
	 WHERE s.id = ss.student_id AND ss.section_id = sect.id AND sect.course_id = c.id AND f.id = fc.faculty_user_id
	 AND c.id = fc.course_id AND f.id = _id AND c.code = _course_code AND sect.name = _section_name AND s.student_number = _student_number;

	IF (_count = 1) THEN
		SELECT s.id INTO _student_id
		FROM student s, section sect, student_section ss, faculty_user f, course c, faculty_user_course fc
		WHERE s.id = ss.student_id AND ss.section_id = sect.id AND sect.course_id = c.id AND f.id = fc.faculty_user_id
		AND c.id = fc.course_id AND f.id = _id AND c.code = _course_code AND sect.name = _section_name AND s.student_number = _student_number;

		SELECT sect.id INTO _section_id FROM section sect, course c
		WHERE c.id = sect.course_id AND sect.name = _section_name AND sect.code = _section_code
		AND c.code = _course_code;

		DELETE FROM student_section WHERE section_id = _section_id AND student_id = _student_id;

		DELETE FROM student WHERE id = _student_id;

		SET _return_message := 'Student deleted';
	ELSE
		SET _return_message := 'Student does not exist';
	END IF;

	RETURN _return_message;

END $$
DELIMITER ;

-- DELETE_VOLUNTEER procedure
DROP PROCEDURE IF EXISTS DELETE_VOLUNTEER;
DELIMITER $$
CREATE PROCEDURE DELETE_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _section_code VARCHAR(4), _student_number VARCHAR(16))
BEGIN
	 SELECT DELETE_VOLUNTEER(_id, _course_code, _section_name, _section_code, _student_number) AS message;

END $$
DELIMITER ;

