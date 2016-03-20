USE cmsc128ab7l;



-- LOGIN procedure
DROP PROCEDURE IF EXISTS LOGIN;
DELIMITER ;;
CREATE PROCEDURE `LOGIN` (_faculty_user_username VARCHAR(32), _faculty_user_password VARCHAR(32))
BEGIN
	SELECT 	faculty_user_id, faculty_user_username,
			IF(SHA1(_faculty_user_password) = faculty_user_password, TRUE, FALSE) AS is_password_valid,
			faculty_user_classification, faculty_user_given_name, faculty_user_middle_name,
			faculty_user_last_name FROM faculty_user WHERE faculty_user_username = _faculty_user_username;
END ;;
DELIMITER ;



-- INSERT_LOGIN_LOGS procedure
DROP PROCEDURE IF EXISTS INSERT_LOGIN_LOGS;
DELIMITER ;;
CREATE PROCEDURE `INSERT_LOGIN_LOGS` (_faculty_user_user_id INT)
BEGIN
	INSERT INTO login_logs (login_logs_date_login, login_logs_faculty_user_id)
	VALUES (now(), _faculty_user_user_id);
END ;;
DELIMITER ;
