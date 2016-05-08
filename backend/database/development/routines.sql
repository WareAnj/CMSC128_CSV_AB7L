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
	SELECT id, username, IF(SHA1(_password) = password, TRUE, FALSE) AS is_password_valid, employee_id,
	classification, given_name, middle_name, last_name, is_approved, date_approved, design_setting
	FROM faculty_user WHERE username = _username;
END $$
DELIMITER ;

-- UPDATE_FACULTY_PASSWORD procedure
DROP PROCEDURE IF EXISTS UPDATE_FACULTY_PASSWORD;
DELIMITER $$
CREATE PROCEDURE UPDATE_FACULTY_PASSWORD (_username VARCHAR(32), _password VARCHAR(32))
BEGIN
	UPDATE faculty_user SET password=SHA1(_password) WHERE username=_username;
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


-- GET_PENDING_USERS procedure
DROP PROCEDURE IF EXISTS GET_PENDING_USERS;
DELIMITER $$
CREATE PROCEDURE GET_PENDING_USERS()
BEGIN
	SELECT * FROM faculty_user WHERE is_approved = 0;
END $$
DELIMITER ;

-- GET_APPROVED_USERS procedure
DROP PROCEDURE IF EXISTS GET_APPROVED_USERS;
DELIMITER $$
CREATE PROCEDURE GET_APPROVED_USERS()
BEGIN
	SELECT * FROM faculty_user WHERE is_approved = 1;
END $$
DELIMITER ;


-- APPROVE_USER procedure
DROP PROCEDURE IF EXISTS APPROVE_USER;
DELIMITER $$
CREATE PROCEDURE APPROVE_USER (_faculty_user_id INT)
BEGIN
	UPDATE faculty_user SET is_approved = TRUE, date_approved = CURRENT_TIMESTAMP WHERE id = _faculty_user_id;
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

-- UPDATE_VOLUNTEER function
DROP FUNCTION IF EXISTS UPDATE_VOLUNTEER;
DELIMITER $$
CREATE FUNCTION UPDATE_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _old_section_code VARCHAR(4), _section_code VARCHAR(4), _old_student_number VARCHAR(16), _student_number VARCHAR(16), _last_name VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _classification VARCHAR(32), _college VARCHAR(8), _degree VARCHAR(8)) RETURNS VARCHAR(64)
-- CREATE FUNCTION UPDATE_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _section_code VARCHAR(4), _student_number VARCHAR(16), _last_name VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _classification VARCHAR(32), _college VARCHAR(8), _degree VARCHAR(8)) RETURNS INT
BEGIN
	DECLARE _student_id INT;
	DECLARE _old_section_id INT;
	DECLARE _section_id INT;
	DECLARE _return_message VARCHAR(64) DEFAULT '';

	SELECT s.id INTO _student_id
	FROM student s, section sect, student_section ss, faculty_user f, course c, faculty_user_course fc
	WHERE s.id = ss.student_id AND ss.section_id = sect.id AND sect.course_id = c.id AND f.id = fc.faculty_user_id
	AND c.id = fc.course_id AND f.id = _id AND c.code = _course_code AND sect.name = _section_name AND s.student_number = _old_student_number;

	SELECT sect.id INTO _section_id FROM section sect, course c
	WHERE c.id = sect.course_id AND sect.name = _section_name AND sect.code = _section_code
	AND c.code = _course_code;

	SELECT sect.id INTO _old_section_id FROM section sect, course c
	WHERE c.id = sect.course_id AND sect.name = _section_name AND sect.code = _old_section_code
	AND c.code = _course_code;

	IF (_student_number IS NOT NULL AND _student_number != '') THEN
		UPDATE student SET
		student_number = _student_number
		WHERE id = _student_id;
	END IF;

	IF (_given_name IS NOT NULL AND _given_name != '') THEN
		UPDATE student SET
		given_name = _given_name
		WHERE id = _student_id;
	END IF;

	IF (_middle_name IS NOT NULL AND _middle_name != '') THEN
		UPDATE student SET
		middle_name = _middle_name
		WHERE id = _student_id;
	END IF;

	IF (_last_name IS NOT NULL AND _last_name != '') THEN
		UPDATE student SET
		last_name = _last_name
		WHERE id = _student_id;
	END IF;

	IF (_degree IS NOT NULL AND _degree != '') THEN
		UPDATE student SET
		degree = _degree
		WHERE id = _student_id;
	END IF;

	IF (_classification IS NOT NULL AND _classification != '') THEN
		UPDATE student SET
		classification = _classification
		WHERE id = _student_id;
	END IF;

	IF (_college IS NOT NULL AND _college != '') THEN
		UPDATE student SET
		college = _college
		WHERE id = _student_id;
	END IF;

	IF (_section_id IS NOT NULL AND _section_id != '') THEN
		UPDATE student_section SET
		section_id = _section_id
		WHERE section_id = _old_section_id AND student_id = _student_id;
	END IF;

	IF (_student_id IS NOT NULL) THEN
		SET _return_message := 'Student updated';
	ELSE
		SET _return_message := 'Student does not exist';
	END IF;

	RETURN _return_message;

END $$
DELIMITER ;

-- UPDATE_VOLUNTEER procedure
DROP PROCEDURE IF EXISTS UPDATE_VOLUNTEER;
DELIMITER $$
CREATE PROCEDURE UPDATE_VOLUNTEER (_id INT, _course_code VARCHAR(32), _section_name VARCHAR(8), _old_section_code VARCHAR(4), _section_code VARCHAR(4), _old_student_number VARCHAR(16), _student_number VARCHAR(16), _last_name VARCHAR(32), _given_name VARCHAR(64), _middle_name VARCHAR(32), _classification VARCHAR(32), _college VARCHAR(8), _degree VARCHAR(8))
BEGIN
	 SELECT UPDATE_VOLUNTEER(_id, _course_code, _section_name, _old_section_code, _section_code, _old_student_number, _student_number, _last_name, _given_name, _middle_name, _classification, _college, _degree) AS message;

END $$
DELIMITER ;


-- INSERT_LECTURE_SECTION procedure
DROP PROCEDURE IF EXISTS INSERT_LECTURE_SECTION;
DELIMITER $$
CREATE PROCEDURE INSERT_LECTURE_SECTION (_faculty_user_id INT, _course_code VARCHAR(16), _name VARCHAR(8))
BEGIN
	DECLARE _course_id INT;
    DECLARE _course_title VARCHAR(64);
    DECLARE _course_description VARCHAR(256);

	-- Check if there is already a lecture section under that course
	IF (SELECT COUNT(*) FROM section s, course c WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name) THEN
		SELECT CONCAT('Lecture section ', _name, ' under ', _course_code, ' already exists') AS message;
	ELSE
        SELECT c.title INTO _course_title
        FROM faculty_user_course fc, course c
        WHERE c.id = fc.course_id AND c.code = _course_code AND fc.faculty_user_id = _faculty_user_id;

		SELECT c.description INTO _course_description
        FROM faculty_user_course fc, course c
        WHERE c.id = fc.course_id AND c.code = _course_code AND fc.faculty_user_id = _faculty_user_id;

        INSERT INTO course (code, title, description) VALUES (_course_code, _course_title, _course_description);

		SELECT LAST_INSERT_ID() INTO _course_id;

		INSERT INTO section (course_id, name) VALUES (_course_id, _name);
		INSERT INTO faculty_user_course (faculty_user_id, course_id) VALUES (_faculty_user_id, _course_id);

		SELECT 'Lecture section was successfully created' AS message;
	END IF;
END $$
DELIMITER ;


-- UPDATE_LECTURE_SECTION procedure
DROP PROCEDURE IF EXISTS UPDATE_LECTURE_SECTION;
DELIMITER $$
CREATE PROCEDURE UPDATE_LECTURE_SECTION (_course_code VARCHAR(16), _section_name VARCHAR(8), _new_section_name VARCHAR(8))
BEGIN
	-- Check for invalid course code and section name
	IF ((SELECT COUNT(*) FROM course c WHERE c.code = _course_code) = 0) THEN
		SELECT CONCAT('Course code ', _course_code, ' does not exist') AS message;
	ELSEIF ((SELECT COUNT(*) FROM course c, section s WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _section_name) = 0) THEN
		SELECT CONCAT('Section name ', _section_name, ' under ', _course_code, ' does not exist') AS message;
	ELSEIF (SELECT COUNT(*) FROM section s, course c WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _new_section_name) THEN
		SELECT CONCAT('Lecture section ', _new_section_name, ' under ', _course_code, ' already exists') AS message;
	ELSE
		UPDATE section SET name = _new_section_name WHERE id IN
		(SELECT sid FROM (SELECT s.id AS sid FROM section s, course c WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _section_name) AS id);

		SELECT 'Lecture section name was successfully updated' AS message;
	END IF;
END $$
DELIMITER ;


-- DELETE_LECTURE_SECTION procedure
DROP PROCEDURE IF EXISTS DELETE_LECTURE_SECTION;
DELIMITER $$
CREATE PROCEDURE DELETE_LECTURE_SECTION (_course_code VARCHAR(16), _name VARCHAR(8))
BEGIN
	-- Check for invalid course code and section name
	IF ((SELECT COUNT(*) FROM course c WHERE c.code = _course_code) = 0) THEN
		SELECT CONCAT('Course code ', _course_code, ' does not exist') AS message;
	ELSEIF ((SELECT COUNT(*) FROM course c, section s WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name) = 0) THEN
		SELECT CONCAT('Section name ', _name, ' under ', _course_code, ' does not exist') AS message;
	ELSE
		-- Delete the students referencing to the section ids
		DELETE FROM student_section WHERE section_id IN
		(SELECT sid FROM (SELECT s.id AS sid FROM section s, course c WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name) AS id);

		-- Finally, delete the sections with the specified name and course_code
		DELETE FROM section WHERE course_id =
		(SELECT cid FROM (SELECT DISTINCT c.id AS cid FROM course c, section s WHERE s.course_id = c.id AND c.code = _course_code AND s.name = _name) AS id);

		SELECT 'Lecture section was deleted successfully' AS message;
	END IF;
END $$
DELIMITER ;


-- INSERT_SUB_SECTION procedure
DROP PROCEDURE IF EXISTS INSERT_SUB_SECTION;
DELIMITER $$
CREATE PROCEDURE INSERT_SUB_SECTION (_course_code VARCHAR(16), _name VARCHAR(8), _code VARCHAR(4))
BEGIN
	DECLARE _course_id INT;

	-- Check for invalid course code and section name
	IF ((SELECT COUNT(*) FROM course c WHERE c.code = _course_code) = 0) THEN
		SELECT CONCAT('Course code ', _course_code, ' does not exist') AS message;
	ELSEIF ((SELECT COUNT(*) FROM course c, section s WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name) = 0) THEN
		SELECT CONCAT('Section name ', _name, ' under ', _course_code, ' does not exist') AS message;
	ELSEIF (SELECT COUNT(*) FROM section s, course c WHERE s.course_id = c.id AND s.name = _name AND c.code = _course_code AND s.code IS NULL) THEN
		UPDATE section SET code = _code WHERE id =
		(SELECT sid FROM (SELECT MIN(s.id) AS sid FROM section s, course c WHERE s.course_id = c.id AND c.code = _course_code AND s.name = _name) AS sid);

		SELECT 'Sub section was successfully created' AS message;
	ELSEIF (SELECT COUNT(*) FROM section s, course c WHERE s.course_id = c.id AND s.name = _name AND c.code = _course_code AND s.code = _code) THEN
		SELECT CONCAT('Sub section with course code ', _code, ' already exist under lecture section ', _name) AS message;
	ELSE
		SELECT DISTINCT c.id INTO _course_id FROM section s, course c WHERE s.course_id = c.id AND c.code = _course_code AND s.name = _name;

		-- Insert a new lecture section if there are no rows with NULL section code
		INSERT INTO section (course_id, name, code) VALUES (_course_id, _name, _code);

		SELECT 'Sub section was successfully created' AS message;
	END IF;
END $$
DELIMITER ;


-- DELETE_SUB_SECTION procedure
DROP PROCEDURE IF EXISTS DELETE_SUB_SECTION;
DELIMITER $$
CREATE PROCEDURE DELETE_SUB_SECTION (_course_code VARCHAR(16), _name VARCHAR(8), _code VARCHAR(4))
BEGIN
	-- Check for invalid course code and section name
	IF ((SELECT COUNT(*) FROM course c WHERE c.code = _course_code) = 0) THEN
		SELECT CONCAT('Course code ', _course_code, ' does not exist') AS message;
	ELSEIF ((SELECT COUNT(*) FROM course c, section s WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name) = 0) THEN
		SELECT CONCAT('Section name ', _name, ' under ', _course_code, ' does not exist') AS message;
	ELSEIF ((SELECT COUNT(*) FROM course c, section s WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name AND s.code = _code) = 0) THEN
		SELECT CONCAT('Section code ', _code, ' under ', _name, ' of course ', _course_code, ' does not exist') AS message;
	ELSE
		-- Delete the students referencing to the section id
		DELETE FROM student_section WHERE section_id =
		(SELECT sid FROM (SELECT s.id AS sid FROM section s, course c WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name AND s.code = _code) AS id);

		-- Finally, delete the section with the specified name, code and course_code
		DELETE FROM section WHERE id =
		(SELECT sid FROM (SELECT s.id AS sid FROM course c, section s WHERE c.id = s.course_id AND c.code = _course_code AND s.name = _name AND s.code = _code) AS id);

		SELECT 'Sub section was deleted successfully' AS message;
	END IF;
END $$
DELIMITER ;

-- CHEAT_MODE function
DROP FUNCTION IF EXISTS CHEAT_MODE;
DELIMITER $$
CREATE FUNCTION CHEAT_MODE (_student_number VARCHAR(16), _id INT, _course_code VARCHAR(32), _section_name VARCHAR(8)) RETURNS VARCHAR(64)
-- CREATE FUNCTION CHEAT_MODE () RETURNS MESSAGE VARCHAR(64)
BEGIN
	DECLARE _student_id INT;
	DECLARE _return_message VARCHAR(64);

	SELECT s.id INTO _student_id
	FROM student s, section sect, student_section ss, faculty_user f, course c, faculty_user_course fc
	WHERE s.id = ss.student_id AND ss.section_id = sect.id AND sect.course_id = c.id AND f.id = fc.faculty_user_id
	AND c.id = fc.course_id AND f.id = _id AND c.code = _course_code AND sect.name = _section_name
	AND s.student_number = _student_number;

	UPDATE student SET
	frequency = frequency + 1
	WHERE id = _student_id;

	SET _return_message := 'Frequency Updated';

	RETURN _return_message;

END $$
DELIMITER ;

-- CHEAT_MODE procedure
DROP PROCEDURE IF EXISTS CHEAT_MODE;
DELIMITER $$
CREATE PROCEDURE CHEAT_MODE (_student_number VARCHAR(16), _id INT, _course_code VARCHAR(32), _section_name VARCHAR(8))
BEGIN
	 SELECT CHEAT_MODE(_student_number, _id, _course_code, _section_name) AS message;

END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS DELETE_STUDENT;
DELIMITER $$
CREATE PROCEDURE DELETE_STUDENT (_course_id int)
BEGIN
	 CREATE TEMPORARY TABLE _student_table (_id int);

   INSERT INTO _student_table SELECT st.id from student st, course c, section s, student_section ss WHERE c.id = _course_id AND c.id = s.course_id AND s.id = ss.section_id and ss.student_id = st.id;

	 DELETE FROM student_section WHERE section_id IN (SELECT s.id from course c, section s WHERE c.id = _course_id and c.id = s.course_id);
	 DELETE FROM student WHERE id IN (SELECT * FROM _student_table);
	 DELETE FROM section WHERE course_id = _course_id;
   DELETE FROM faculty_user_course WHERE course_id = _course_id;
	 DELETE FROM course WHERE id = _course_id;
	 DROP TABLE _student_table;

END $$
DELIMITER ;
