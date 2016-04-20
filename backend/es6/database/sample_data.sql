use cmsc128ab7l;

INSERT INTO admin(id, username, password) VALUES (1, 'admin', 'admin');

insert into course (code, title, description) values ('CMSC 128', 'Introduction to Software Engineering', '*insert desc here*');
insert into course (code, title, description) values ('CMSC 132', 'Computer Architecture', '*insert desc here*');
insert into course (code, title, description) values ('CMSC 141', 'Automata and Language Theory', '*insert desc here*');
insert into course (code, title, description) values ('CMSC 170', 'Introduction to Artifial Intelligence', '*insert desc here*');

insert into section (course_id, name, code) values (1, 'AB', '1L');
insert into section (course_id, name, code) values (1, 'AB', '2L');
insert into section (course_id, name, code) values (2, 'T', '1L');
insert into section (course_id, name, code) values (2, 'T', '2L');
insert into section (course_id, name, code) values (3, 'V', '1L');
insert into section (course_id, name, code) values (3, 'V', '2L');
insert into section (course_id, name, code) values (4, 'U', '1L');
insert into section (course_id, name, code) values (4, 'U', '2L');

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00289', 'CAIRA', 'LOUISE', 'BENWICK', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_number, section_id) values ('2013-00289', 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00615', 'FRAN', 'GABRIELLE', 'RUIZ', 'BSMATH', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-00615', 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-03932', 'KIARA', 'ALELI', 'ARLEGUI', 'BSFT', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-03932', 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-70461', 'JOHN', 'PHILIP', 'CRUZ', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-70461', 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-98307', 'KRISTEN', 'GAYLE', 'CATAPANG', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-98307', 1);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-06525', 'KYLE', 'THERESE', 'DE LUMBAN', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_number, section_id) values ('2013-06525', 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-07498', 'VINCE', 'AMIEL', 'CARANDANG', 'BSEE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-07498', 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-08071', 'JOSE', 'RENE', 'TICSAY', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_number, section_id) values ('2013-08071', 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-43740', 'JOANNE', 'STEPHANIE', 'JOVEN', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-43740', 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-56969', 'WOLTER', 'MIGUEL', 'AURE', 'BSBIO', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-56969', 2);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-11471', 'KATRINA', 'KEITH', 'ARATEA', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-11471', 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19797', 'HONEY JEAN', 'FAJARDO', 'IBIS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-19797', 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19897', 'JANYCA DEL', 'PRADO', 'NOOL', 'BSA', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-19897', 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-22363', 'MARIA', 'RIZALYN', 'ADAME', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-22363', 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68978', 'MARIANNE', 'MARIANNELL', 'RAMOS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-68978', 3);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-27698', 'ANNE CATHERINE', 'BERNADETTE', 'CAPISTRANO', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-27698', 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-28285', 'CHRISTIELLE', 'MENESES', 'GILLERA', 'BSF', 'Junior', 'CFNR');
    insert into student_section (student_number, section_id) values ('2013-28285', 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-31240', 'JOANNA', 'KATHLEEN', 'ABRAHAM', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_number, section_id) values ('2013-31240', 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-38474', 'ROSELLE', 'ANNE', 'ALANO', 'BSCHEM', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-38474', 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68092', 'JERAM', 'NOLAN', 'TESORO', 'BSABE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-68092', 4);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00289', 'CAIRA', 'LOUISE', 'BENWICK', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_number, section_id) values ('2013-00289', 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-00615', 'FRAN', 'GABRIELLE', 'RUIZ', 'BSMATH', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-00615', 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-03932', 'KIARA', 'ALELI', 'ARLEGUI', 'BSFT', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-03932', 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-70461', 'JOHN', 'PHILIP', 'CRUZ', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-70461', 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-98307', 'KRISTEN', 'GAYLE', 'CATAPANG', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-98307', 5);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-27698', 'ANNE CATHERINE', 'BERNADETTE', 'CAPISTRANO', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-27698', 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-28285', 'CHRISTIELLE', 'MENESES', 'GILLERA', 'BSF', 'Junior', 'CFNR');
    insert into student_section (student_number, section_id) values ('2013-28285', 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-31240', 'JOANNA', 'KATHLEEN', 'ABRAHAM', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_number, section_id) values ('2013-31240', 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-38474', 'ROSELLE', 'ANNE', 'ALANO', 'BSCHEM', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-38474', 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68092', 'JERAM', 'NOLAN', 'TESORO', 'BSABE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-68092', 6);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-11471', 'KATRINA', 'KEITH', 'ARATEA', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-11471', 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19797', 'HONEY JEAN', 'FAJARDO', 'IBIS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-19797', 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19897', 'JANYCA DEL', 'PRADO', 'NOOL', 'BSA', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-19897', 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-22363', 'MARIA', 'RIZALYN', 'ADAME', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-22363', 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68978', 'MARIANNE', 'MARIANNELL', 'RAMOS', 'BSA', 'Junior', 'CA');
    insert into student_section (student_number, section_id) values ('2013-68978', 7);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-06525', 'KYLE', 'THERESE', 'DE LUMBAN', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_number, section_id) values ('2013-06525', 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-07498', 'VINCE', 'AMIEL', 'CARANDANG', 'BSEE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-07498', 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-08071', 'JOSE', 'RENE', 'TICSAY', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_number, section_id) values ('2013-08071', 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-43740', 'JOANNE', 'STEPHANIE', 'JOVEN', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_number, section_id) values ('2013-43740', 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-56969', 'WOLTER', 'MIGUEL', 'AURE', 'BSBIO', 'Junior', 'CAS');
    insert into student_section (student_number, section_id) values ('2013-56969', 8);


insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user1', SHA1('user1'), '001', 'Professor', 'Reginald', 'NC', 'Reccario');
insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user2', SHA1('user2'), '002', 'Instructor 3', 'Betel', 'Marie', 'De Robles');
insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user3', SHA1('user3'), '003', 'Instructor 1', 'Angelica', 'Geeca', 'Ware');

insert into faculty_user_course (faculty_user_id, course_id) values (1, 1);
insert into faculty_user_course (faculty_user_id, course_id) values (1, 2);
insert into faculty_user_course (faculty_user_id, course_id) values (2, 3);
insert into faculty_user_course (faculty_user_id, course_id) values (3, 4);
