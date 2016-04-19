use cmsc128ab7l;

insert into course (code, title, description) values ('CMSC 128', 'Introduction to Software Engineering', '*insert desc here*');
insert into course (code, title, description) values ('CMSC 132', 'Computer Architecture', '*insert desc here*');
insert into course (code, title, description) values ('CMSC 141', 'Automata and Language Theory', '*insert desc here*');
insert into course (code, title, description) values ('CMSC 170', 'Introduction to Artifial Intelligence', '*insert desc here*');

insert into section (course_code, name, code) values ('CMSC 128', 'AB', '1L');
insert into section (course_code, name, code) values ('CMSC 128', 'AB', '2L');
insert into section (course_code, name, code) values ('CMSC 132', 'T', '1L');
insert into section (course_code, name, code) values ('CMSC 132', 'T', '2L');
insert into section (course_code, name, code) values ('CMSC 141', 'V', '1L');
insert into section (course_code, name, code) values ('CMSC 141', 'V', '2L');
insert into section (course_code, name, code) values ('CMSC 170', 'U', '1L');
insert into section (course_code, name, code) values ('CMSC 170', 'U', '2L');

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00289', 'CAIRA', 'LOUISE', 'BENWICK', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (1, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00615', 'FRAN', 'GABRIELLE', 'RUIZ', 'BSMATH', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (2, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-03932', 'KIARA', 'ALELI', 'ARLEGUI', 'BSFT', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (3, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-70461', 'JOHN', 'PHILIP', 'CRUZ', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (4, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-98307', 'KRISTEN', 'GAYLE', 'CATAPANG', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (5, 1);
    
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-06525', 'KYLE', 'THERESE', 'DE LUMBAN', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (6, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-07498', 'VINCE', 'AMIEL', 'CARANDANG', 'BSEE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (7, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-08071', 'JOSE', 'RENE', 'TICSAY', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (8, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-43740', 'JOANNE', 'STEPHANIE', 'JOVEN', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (9, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-56969', 'WOLTER', 'MIGUEL', 'AURE', 'BSBIO', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (10, 2);
    
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-11471', 'KATRINA', 'KEITH', 'ARATEA', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (11, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19797', 'HONEY JEAN', 'FAJARDO', 'IBIS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (12, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19897', 'JANYCA DEL', 'PRADO', 'NOOL', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (13, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-22363', 'MARIA', 'RIZALYN', 'ADAME', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (14, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68978', 'MARIANNE', 'MARIANNELL', 'RAMOS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (15, 3);
    
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-27698', 'ANNE CATHERINE', 'BERNADETTE', 'CAPISTRANO', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (16, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-28285', 'CHRISTIELLE', 'MENESES', 'GILLERA', 'BSF', 'Junior', 'CFNR');
    insert into student_section (student_id, section_id) values (17, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-31240', 'JOANNA', 'KATHLEEN', 'ABRAHAM', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (18, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-38474', 'ROSELLE', 'ANNE', 'ALANO', 'BSCHEM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (19, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68092', 'JERAM', 'NOLAN', 'TESORO', 'BSABE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (20, 4);
    
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00289', 'CAIRA', 'LOUISE', 'BENWICK', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (21, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00615', 'FRAN', 'GABRIELLE', 'RUIZ', 'BSMATH', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (22, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-03932', 'KIARA', 'ALELI', 'ARLEGUI', 'BSFT', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (23, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-70461', 'JOHN', 'PHILIP', 'CRUZ', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (24, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-98307', 'KRISTEN', 'GAYLE', 'CATAPANG', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (25, 5);
    
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-27698', 'ANNE CATHERINE', 'BERNADETTE', 'CAPISTRANO', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (26, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-28285', 'CHRISTIELLE', 'MENESES', 'GILLERA', 'BSF', 'Junior', 'CFNR');
    insert into student_section (student_id, section_id) values (27, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-31240', 'JOANNA', 'KATHLEEN', 'ABRAHAM', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (28, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-38474', 'ROSELLE', 'ANNE', 'ALANO', 'BSCHEM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (29, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68092', 'JERAM', 'NOLAN', 'TESORO', 'BSABE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (30, 6);
    
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-11471', 'KATRINA', 'KEITH', 'ARATEA', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (31, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19797', 'HONEY JEAN', 'FAJARDO', 'IBIS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (32, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19897', 'JANYCA DEL', 'PRADO', 'NOOL', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (33, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-22363', 'MARIA', 'RIZALYN', 'ADAME', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (34, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68978', 'MARIANNE', 'MARIANNELL', 'RAMOS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (35, 7);
    
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-06525', 'KYLE', 'THERESE', 'DE LUMBAN', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (36, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-07498', 'VINCE', 'AMIEL', 'CARANDANG', 'BSEE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (37, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-08071', 'JOSE', 'RENE', 'TICSAY', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (38, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-43740', 'JOANNE', 'STEPHANIE', 'JOVEN', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (39, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-56969', 'WOLTER', 'MIGUEL', 'AURE', 'BSBIO', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (40, 8);


insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user1', SHA1('user1'), '001', 'Professor', 'Reginald', 'NC', 'Reccario');
insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user2', SHA1('user2'), '002', 'Instructor 3', 'Betel', 'Marie', 'De Robles');
insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user3', SHA1('user3'), '003', 'Instructor 1', 'Angelica', 'Geeca', 'Ware');

insert into faculty_user_course (faculty_user_id, course_code) values (1, 'CMSC 128');
insert into faculty_user_course (faculty_user_id, course_code) values (1, 'CMSC 132');
insert into faculty_user_course (faculty_user_id, course_code) values (2, 'CMSC 141');
insert into faculty_user_course (faculty_user_id, course_code) values (3, 'CMSC 170');