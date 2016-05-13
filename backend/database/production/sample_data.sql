use reginyzr;

INSERT INTO admin(id, username, password) VALUES (1, 'admin', SHA1('admin'));

insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name, is_approved) values ('user1', SHA1('user1'), '001', 'Professor I', 'Reginald Neil', 'C', 'Recario', 1);

insert into course (code, title, description) values ('CMSC 128', 'Introduction to Software Engineering', 'Principles and methods for the design implementation validation evaluation and maintenance of software systems');
insert into course (code, title, description) values ('CMSC 132', 'Computer Architecture', 'Advanced topics in computer systems organization from a designers point of view');
insert into course (code, title, description) values ('CMSC 141', 'Automata and Language Theory', 'Abstract machines and languages');
insert into course (code, title, description) values ('CMSC 170', 'Introduction to Artifial Intelligence', 'Basic principles of Artificial Intelligence');

insert into section (course_id, name, code) values (1, 'AB', '1L');
insert into section (course_id, name, code) values (1, 'AB', '2L');
insert into section (course_id, name, code) values (2, 'T', '1L');
insert into section (course_id, name, code) values (2, 'T', '2L');
insert into section (course_id, name, code) values (3, 'V', '1L');
insert into section (course_id, name, code) values (3, 'V', '2L');
insert into section (course_id, name, code) values (4, 'U', '1L');
insert into section (course_id, name, code) values (4, 'U', '2L');

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-01230', 'CURTIS', 'ANNE', 'C', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (1, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-12382', 'GANDA', 'VICE', 'G', 'BSMATH', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (2, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-09292', 'CRAWFORD', 'BILLY', 'P', 'BSFT', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (3, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-70461', 'KETCHUM', 'ASH', 'CRUZ', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (4, 1);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-98307', 'UZUMAKI', 'NARUTO', '', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (5, 1);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-06525', 'SENSEI', 'SAITAMA', 'S', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (6, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-07498', 'PRIME', 'OPTIMUS', '', 'BSEE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (7, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-08071', 'MAX', 'MINI', 'ALGO', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (8, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-43740', 'CREEPERS', 'JEEPERS', 'E', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (9, 2);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-56969', 'CLOSURE', 'CLEAN', 'AURA', 'BSBIO', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (10, 2);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-11471', 'DEFENSOR', 'MIRIAM', 'SANTIAGO', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (11, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19797', 'DUTERTE', 'RODRIGO', 'DIGONG', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (12, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19897', 'POE', 'GRACE', 'JR', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (13, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-22363', 'ROXAS', 'MAR', '', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (14, 3);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68978', 'CARREON', 'ALLAN', 'AMBASSADOR', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (15, 3);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-27698', 'MANALOTO', 'PEPITO', 'MM', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (16, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-28285', 'WURTZBACH', 'PIA', '', 'BSF', 'Junior', 'CFNR');
    insert into student_section (student_id, section_id) values (17, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-31240', 'PERALTA', 'GIO', 'IYAK', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (18, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-38474', 'VEGA', 'JULIUS', 'BEGA', 'BSCHEM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (19, 4);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68092', 'MARTIN', 'RIKI', 'TROGDOR', 'BSABE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (20, 4);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-01230', 'CURTIS', 'ANNE', 'C', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (21, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-12382', 'GANDA', 'VICE', 'G', 'BSMATH', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (22, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-09292', 'CRAWFORD', 'BILLY', 'P', 'BSFT', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (23, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-70461', 'KETCHUM', 'ASH', 'CRUZ', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (24, 5);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-98307', 'UZUMAKI', 'NARUTO', '', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (25, 5);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-27698', 'MANALOTO', 'PEPITO', 'MM', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (26, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-28285', 'WURTZBACH', 'PIA', '', 'BSF', 'Junior', 'CFNR');
    insert into student_section (student_id, section_id) values (27, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-31240', 'PERALTA', 'GIO', 'IYAK', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (28, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-38474', 'VEGA', 'JULIUS', 'BEGA', 'BSCHEM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (29, 6);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68092', 'MARTIN', 'RIKI', 'TROGDOR', 'BSABE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (30, 6);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-11471', 'DEFENSOR', 'MIRIAM', 'SANTIAGO', 'BACA', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (31, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19797', 'DUTERTE', 'RODRIGO', 'DIGONG', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (32, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-19897', 'POE', 'GRACE', 'JR', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (33, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-22363', 'ROXAS', 'MAR', '', 'BSAM', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (34, 7);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-68978', 'CARREON', 'ALLAN', 'AMBASSADOR', 'BSA', 'Junior', 'CA');
    insert into student_section (student_id, section_id) values (35, 7);

insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-06525', 'SENSEI', 'SAITAMA', 'S', 'BSHE', 'Junior', 'CHE');
    insert into student_section (student_id, section_id) values (36, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-07498', 'PRIME', 'OPTIMUS', '', 'BSEE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (37, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-08071', 'MAX', 'MINI', 'ALGO', 'BSABM', 'Junior', 'CEM');
    insert into student_section (student_id, section_id) values (38, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-43740', 'CREEPERS', 'JEEPERS', 'E', 'BSCHE', 'Sophomore', 'CEAT');
    insert into student_section (student_id, section_id) values (39, 8);
insert into student (student_number, given_name, middle_name, last_name, degree, classification, college) values ('2013-56969', 'CLOSURE', 'CLEAN', 'AURA', 'BSBIO', 'Junior', 'CAS');
    insert into student_section (student_id, section_id) values (40, 8);

insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user2', SHA1('user2'), '002', 'Instructor III', 'Marie Betel', 'B', 'De Robles');
insert into faculty_user (username, password, employee_id, classification, given_name, middle_name, last_name) values ('user3', SHA1('user3'), '003', 'Instructor I', 'Angelica', 'Geeca', 'Ware');

insert into faculty_user_course (faculty_user_id, course_id) values (1, 1);
insert into faculty_user_course (faculty_user_id, course_id) values (1, 2);
insert into faculty_user_course (faculty_user_id, course_id) values (2, 3);
insert into faculty_user_course (faculty_user_id, course_id) values (3, 4);
