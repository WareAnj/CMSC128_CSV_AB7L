DROP DATABASE IF EXISTS cmsc128ab7l;
CREATE DATABASE cmsc128ab7l;
USE cmsc128ab7l;

DROP TABLE IF EXISTS admin;
CREATE TABLE admin(
	admin_id INT NOT NULL AUTO_INCREMENT,
	admin_username VARCHAR(32) NOT NULL UNIQUE,
	admin_password VARCHAR(256) NOT NULL,
	PRIMARY KEY(admin_id)
);

DROP TABLE IF EXISTS faculty_user;
CREATE TABLE faculty_user(
	faculty_user_id INT NOT NULL AUTO_INCREMENT,
	faculty_user_username VARCHAR(32) NOT NULL UNIQUE,
	faculty_user_password VARCHAR(256) NOT NULL,
	faculty_user_employee_id VARCHAR(16) NOT NULL UNIQUE,
	faculty_user_classification VARCHAR(32) NOT NULL,
	faculty_user_given_name VARCHAR(64) NOT NULL,
	faculty_user_middle_name VARCHAR(32) NOT NULL,
	faculty_user_last_name VARCHAR(32) NOT NULL,
	faculty_user_is_approved BOOLEAN NOT NULL,
	PRIMARY KEY(faculty_user_id)
);

DROP TABLE IF EXISTS course;
CREATE TABLE course(
	course_code VARCHAR(16) NOT NULL,
	course_title VARCHAR(64) NOT NULL,
	course_description VARCHAR(256) NOT NULL,
	PRIMARY KEY(course_code)
);

DROP TABLE IF EXISTS section;
CREATE TABLE section(
	section_id INT NOT NULL AUTO_INCREMENT,
	section_name VARCHAR(8) NOT NULL,
	section_course_code VARCHAR(16) NOT NULL,
	PRIMARY KEY(section_id),
	FOREIGN KEY(section_course_code) REFERENCES course(course_code)
);

DROP TABLE IF EXISTS student;
CREATE TABLE student(
	student_number VARCHAR(10) NOT NULL,
	student_given_name VARCHAR(64) NOT NULL,
	student_middle_name VARCHAR(32) NOT NULL,
	student_last_name VARCHAR(32) NOT NULL,
	student_degree VARCHAR(8) NOT NULL,
	student_classification ENUM('Freshman', 'Sophomore', 'Junior', 'Senior', 'Masteral', 'PhD') NOT NULL,
	student_college VARCHAR(8) NOT NULL,
	student_picture BLOB DEFAULT NULL,
	student_times_called INT NOT NULL DEFAULT 0,
	PRIMARY KEY(student_number)
);

DROP TABLE IF EXISTS student_section;
CREATE TABLE student_section(
	ss_student_number VARCHAR(10) NOT NULL,
	ss_section_id INT NOT NULL,
	ss_frequency INT NOT NULL DEFAULT 0,
	FOREIGN KEY(ss_student_number) REFERENCES student(student_number),
	FOREIGN KEY(ss_section_id) REFERENCES section(section_id)
);

DROP TABLE IF EXISTS faculty_user_course_section;
CREATE TABLE faculty_user_course_section(
	uc_user_id INT NOT NULL,
	uc_course_code VARCHAR(16) NOT NULL,
	uc_section_id INT NOT NULL,
	FOREIGN KEY(uc_course_code) REFERENCES course(course_code),
	FOREIGN KEY(uc_user_id) REFERENCES faculty_user(faculty_user_id),
	FOREIGN KEY(uc_section_id) REFERENCES section(section_id)
);

DROP TABLE IF EXISTS login_logs;
CREATE TABLE login_logs(
	login_logs_date_login TIMESTAMP NOT NULL,
	login_logs_faculty_user_id INT NOT NULL,
	FOREIGN KEY(login_logs_faculty_user_id) REFERENCES faculty_user(faculty_user_id)
);

DROP TABLE IF EXISTS logout_logs;
CREATE TABLE logout_logs(
	logout_logs_date_logout TIMESTAMP NOT NULL,
	logout_logs_faculty_user_id INT NOT NULL,
	FOREIGN KEY(logout_logs_faculty_user_id) REFERENCES faculty_user(faculty_user_id)
);

DROP TABLE IF EXISTS randomizer_logs;
CREATE TABLE randomizer_logs(
	randomizer_logs_id INT NOT NULL AUTO_INCREMENT,
	randomizer_logs_date_randomized TIMESTAMP NOT NULL,
	randomizer_logs_faculty_user_id INT NOT NULL,
	PRIMARY KEY(randomizer_logs_id),
	FOREIGN KEY(randomizer_logs_faculty_user_id) REFERENCES faculty_user(faculty_user_id)
);

DROP TABLE IF EXISTS randomizer_logs_students;
CREATE TABLE randomizer_logs_students(
	rls_randomizer_logs_id INT NOT NULL,
	rls_student_number VARCHAR(10) NOT NULL,
	FOREIGN KEY(rls_randomizer_logs_id) REFERENCES randomizer_logs(randomizer_logs_id),
	FOREIGN KEY(rls_student_number) REFERENCES student(student_number)
);
