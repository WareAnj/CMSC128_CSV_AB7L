
/**
 *
 * Contains all the database triggers
 *
 */


-- INSERT_LOGIN_LOGS procedure
DROP TRIGGER IF EXISTS INSERT_LOGIN_LOGS;
DELIMITER $$
CREATE TRIGGER INSERT_LOGIN_LOGS
	AFTER INSERT ON login_logs
	FOR EACH ROW
BEGIN
	INSERT INTO login_logs (login_logs_date_login, login_logs_faculty_user_id)
	VALUES (now(), _faculty_user_user_id);
END $$
DELIMITER ;
