DROP DATABASE IF EXISTS cmsc128ab7l;
CREATE DATABASE cmsc128ab7l;
USE cmsc128ab7l;


-- Table 'admin'
DROP TABLE IF EXISTS admin;
CREATE TABLE admin(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(32) NOT NULL UNIQUE,
	password VARCHAR(256) NOT NULL,
	PRIMARY KEY(id)
);


-- Table 'faculty_user'
DROP TABLE IF EXISTS faculty_user;
CREATE TABLE faculty_user(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(32) NOT NULL UNIQUE,
	password VARCHAR(256) NOT NULL,
	employee_id VARCHAR(16) NOT NULL UNIQUE,
	classification VARCHAR(32) NOT NULL,
	given_name VARCHAR(64) NOT NULL,
	middle_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	is_approved BOOLEAN NOT NULL DEFAULT FALSE,
	date_approved TIMESTAMP,
	PRIMARY KEY(id)
);


-- Table 'course'
DROP TABLE IF EXISTS course;
CREATE TABLE course(
	course_code VARCHAR(16) NOT NULL,
	course_title VARCHAR(64) NOT NULL,
	course_description VARCHAR(256) NOT NULL,
	PRIMARY KEY(course_code)
);

-- Table 'section'
DROP TABLE IF EXISTS section;
CREATE TABLE section(
	section_id INT NOT NULL AUTO_INCREMENT,
	section_name VARCHAR(8) NOT NULL,
	course_code VARCHAR(16) NOT NULL,
	PRIMARY KEY(section_id),
	FOREIGN KEY(course_code) REFERENCES course(course_code)
);


-- Table 'student'
DROP TABLE IF EXISTS student;
CREATE TABLE student(
	student_number VARCHAR(10) NOT NULL,
	given_name VARCHAR(64) NOT NULL,
	middle_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	degree VARCHAR(8) NOT NULL,
	classification ENUM('Freshman', 'Sophomore', 'Junior', 'Senior', 'Masteral', 'PhD') NOT NULL,
	college VARCHAR(8) NOT NULL,
	picture BLOB DEFAULT NULL,
	times_called INT NOT NULL DEFAULT 0,
	PRIMARY KEY(student_number)
);


-- Table 'student_section'
DROP TABLE IF EXISTS student_section;
CREATE TABLE student_section(
	ss_student_number VARCHAR(10) NOT NULL,
	ss_section_id INT NOT NULL,
	ss_frequency INT NOT NULL DEFAULT 0,
	FOREIGN KEY(ss_student_number) REFERENCES student(student_number),
	FOREIGN KEY(ss_section_id) REFERENCES section(section_id)
);


-- Table 'faculty_user_course_section'
DROP TABLE IF EXISTS faculty_user_course_section;
CREATE TABLE faculty_user_course_section(
	uc_user_id INT NOT NULL,
	uc_course_code VARCHAR(16) NOT NULL,
	uc_section_id INT NOT NULL,
	FOREIGN KEY(uc_user_id) REFERENCES faculty_user(id),
	FOREIGN KEY(uc_course_code) REFERENCES course(course_code),
	FOREIGN KEY(uc_section_id) REFERENCES section(section_id)
);


-- Table 'login_logs'
DROP TABLE IF EXISTS login_logs;
CREATE TABLE login_logs(
	date_login TIMESTAMP NOT NULL,
	faculty_user_id INT NOT NULL,
	FOREIGN KEY(faculty_user_id) REFERENCES faculty_user(id)
);


-- Table 'logout_logs'
DROP TABLE IF EXISTS logout_logs;
CREATE TABLE logout_logs(
	date_logout TIMESTAMP NOT NULL,
	faculty_user_id INT NOT NULL,
	FOREIGN KEY(faculty_user_id) REFERENCES faculty_user(id)
);


-- Table 'randomizer_logs'
DROP TABLE IF EXISTS randomizer_logs;
CREATE TABLE randomizer_logs(
	id INT NOT NULL AUTO_INCREMENT,
	date_randomized TIMESTAMP NOT NULL,
	faculty_user_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(faculty_user_id) REFERENCES faculty_user(id)
);


-- Table 'randomizer_logs_students'
DROP TABLE IF EXISTS randomizer_logs_students;
CREATE TABLE randomizer_logs_students(
	rls_randomizer_logs_id INT NOT NULL,
	rls_student_number VARCHAR(10) NOT NULL,
	FOREIGN KEY(rls_randomizer_logs_id) REFERENCES randomizer_logs(id),
	FOREIGN KEY(rls_student_number) REFERENCES student(student_number)
);
