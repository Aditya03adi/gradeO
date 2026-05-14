UPDATE student
SET
    branch = CASE SUBSTRING(CAST(PRN AS CHAR), 8, 1)
        WHEN '1' THEN 'Civil'
        WHEN '2' THEN 'CSE'
        WHEN '3' THEN 'E&TC'
        WHEN '5' THEN 'MECH'
        WHEN '6' THEN 'AIML'
        WHEN '7' THEN 'R&A'
        ELSE branch
    END,
    dept = CASE SUBSTRING(CAST(PRN AS CHAR), 8, 1)
        WHEN '1' THEN 'Civil Engineering'
        WHEN '2' THEN 'Computer Science and Engineering'
        WHEN '3' THEN 'Electronics and Telecommunication Engineering'
        WHEN '5' THEN 'Mechanical Engineering'
        WHEN '6' THEN 'Artificial Intelligence and Machine Learning Engineering'
        WHEN '7' THEN 'Robotics and Automation Engineering'
        ELSE dept
    END,
    id = PRN
WHERE CHAR_LENGTH(CAST(PRN AS CHAR)) = 11;

INSERT INTO faculty (F_code, Name) VALUES
    (9, 'Dr. Kavita Joshi'),
    (10, 'Prof. Nilesh Bhosale'),
    (11, 'Dr. Meenal Patwardhan'),
    (12, 'Prof. Sagar Kulkarni'),
    (13, 'Dr. Rutuja Deshpande'),
    (14, 'Prof. Prasad Jadhav'),
    (15, 'Dr. Neha Kulshreshtha'),
    (16, 'Prof. Yash Patil'),
    (17, 'Dr. Trupti Kale'),
    (18, 'Prof. Rohit Shinde'),
    (19, 'Dr. Priya Salunkhe'),
    (20, 'Prof. Atharva Mane')
ON DUPLICATE KEY UPDATE Name = VALUES(Name);

INSERT INTO subjects (S_code, Name, Dept) VALUES
    (301, 'Analog Communication', 'Electronics and Telecommunication Engineering'),
    (302, 'Microcontrollers', 'Electronics and Telecommunication Engineering'),
    (303, 'Signals and Systems', 'Electronics and Telecommunication Engineering'),
    (401, 'Machine Design', 'Mechanical Engineering'),
    (402, 'Fluid Mechanics', 'Mechanical Engineering'),
    (403, 'Manufacturing Processes', 'Mechanical Engineering'),
    (501, 'Machine Learning Foundations', 'Artificial Intelligence and Machine Learning Engineering'),
    (502, 'Neural Networks', 'Artificial Intelligence and Machine Learning Engineering'),
    (503, 'Data Analytics', 'Artificial Intelligence and Machine Learning Engineering'),
    (601, 'Robot Kinematics', 'Robotics and Automation Engineering'),
    (602, 'Embedded Control Systems', 'Robotics and Automation Engineering'),
    (603, 'Industrial Automation', 'Robotics and Automation Engineering')
ON DUPLICATE KEY UPDATE
    Name = VALUES(Name),
    Dept = VALUES(Dept);

INSERT INTO faculty_subject (F_code, S_code) VALUES
    (9, 301),
    (10, 302),
    (11, 303),
    (12, 401),
    (13, 402),
    (14, 403),
    (15, 501),
    (16, 502),
    (17, 503),
    (18, 601),
    (19, 602),
    (20, 603)
ON DUPLICATE KEY UPDATE
    F_code = VALUES(F_code),
    S_code = VALUES(S_code);

INSERT INTO test (Test_ID, C_code, S_code, Date, F_code, Max_Marks, Scaled_Max_Marks, id, total_marks) VALUES
    (12, 202, 301, '2026-03-02', 9, 100, 10.00, 12, 100),
    (13, 204, 302, '2026-03-05', 10, 20, 2.00, 13, 20),
    (14, 201, 303, '2026-03-08', 11, 50, 5.00, 14, 50),
    (15, 202, 401, '2026-03-03', 12, 100, 10.00, 15, 100),
    (16, 204, 402, '2026-03-06', 13, 20, 2.00, 16, 20),
    (17, 205, 403, '2026-03-09', 14, 100, 10.00, 17, 100),
    (18, 201, 501, '2026-03-04', 15, 50, 5.00, 18, 50),
    (19, 202, 502, '2026-03-07', 16, 100, 10.00, 19, 100),
    (20, 204, 503, '2026-03-10', 17, 20, 2.00, 20, 20),
    (21, 201, 601, '2026-03-11', 18, 50, 5.00, 21, 50),
    (22, 202, 602, '2026-03-13', 19, 100, 10.00, 22, 100),
    (23, 205, 603, '2026-03-15', 20, 100, 10.00, 23, 100)
ON DUPLICATE KEY UPDATE
    C_code = VALUES(C_code),
    S_code = VALUES(S_code),
    Date = VALUES(Date),
    F_code = VALUES(F_code),
    Max_Marks = VALUES(Max_Marks),
    Scaled_Max_Marks = VALUES(Scaled_Max_Marks),
    id = VALUES(id),
    total_marks = VALUES(total_marks);

INSERT INTO test (Test_ID, C_code, S_code, Date, F_code, Max_Marks, Scaled_Max_Marks, id, total_marks) VALUES
    (27, 204, 102, '2026-04-24', 3, 10, 10.00, 27, 10),
    (28, 203, 201, '2026-04-25', 7, 10, 10.00, 28, 10),
    (29, 205, 301, '2026-04-26', 9, 10, 10.00, 29, 10),
    (30, 202, 401, '2026-04-28', 18, 20, 10.00, 30, 20),
    (31, 204, 503, '2026-04-30', 17, 10, 10.00, 31, 10),
    (32, 203, 603, '2026-05-02', 14, 10, 10.00, 32, 10)
ON DUPLICATE KEY UPDATE
    C_code = VALUES(C_code),
    S_code = VALUES(S_code),
    Date = VALUES(Date),
    F_code = VALUES(F_code),
    Max_Marks = VALUES(Max_Marks),
    Scaled_Max_Marks = VALUES(Scaled_Max_Marks),
    id = VALUES(id),
    total_marks = VALUES(total_marks);

INSERT INTO student (PRN, name, branch, dept, id, email) VALUES
    (24070121010, 'Aarya Patil', 'Civil', 'Civil Engineering', 24070121010, 'aarya.civil@gradeo.local'),
    (24070123011, 'Omkar More', 'E&TC', 'Electronics and Telecommunication Engineering', 24070123011, 'omkar.entc@gradeo.local'),
    (24070125012, 'Sakshi Pawar', 'MECH', 'Mechanical Engineering', 24070125012, 'sakshi.mech@gradeo.local'),
    (24070126014, 'Ishaan Kulkarni', 'AIML', 'Artificial Intelligence and Machine Learning Engineering', 24070126014, 'ishaan.aiml@gradeo.local'),
    (24070127015, 'Tanvi Shinde', 'R&A', 'Robotics and Automation Engineering', 24070127015, 'tanvi.ra@gradeo.local'),
    (24070122016, 'Riya Deshmukh', 'CSE', 'Computer Science and Engineering', 24070122016, 'riya.cse@gradeo.local')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    branch = VALUES(branch),
    dept = VALUES(dept),
    id = VALUES(id),
    email = VALUES(email);

INSERT INTO user (email, name, password, role, student_prn)
SELECT 'aarya.civil@gradeo.local', 'Aarya Patil', 'gradeo123', 'student', 24070121010
WHERE NOT EXISTS (SELECT 1 FROM user WHERE student_prn = 24070121010);

INSERT INTO user (email, name, password, role, student_prn)
SELECT 'omkar.entc@gradeo.local', 'Omkar More', 'gradeo123', 'student', 24070123011
WHERE NOT EXISTS (SELECT 1 FROM user WHERE student_prn = 24070123011);

INSERT INTO user (email, name, password, role, student_prn)
SELECT 'sakshi.mech@gradeo.local', 'Sakshi Pawar', 'gradeo123', 'student', 24070125012
WHERE NOT EXISTS (SELECT 1 FROM user WHERE student_prn = 24070125012);

INSERT INTO user (email, name, password, role, student_prn)
SELECT 'ishaan.aiml@gradeo.local', 'Ishaan Kulkarni', 'gradeo123', 'student', 24070126014
WHERE NOT EXISTS (SELECT 1 FROM user WHERE student_prn = 24070126014);

INSERT INTO user (email, name, password, role, student_prn)
SELECT 'tanvi.ra@gradeo.local', 'Tanvi Shinde', 'gradeo123', 'student', 24070127015
WHERE NOT EXISTS (SELECT 1 FROM user WHERE student_prn = 24070127015);

INSERT INTO user (email, name, password, role, student_prn)
SELECT 'riya.cse@gradeo.local', 'Riya Deshmukh', 'gradeo123', 'student', 24070122016
WHERE NOT EXISTS (SELECT 1 FROM user WHERE student_prn = 24070122016);

INSERT INTO marks_scored (PRN, Test_ID, Marks, Scaled_Marks) VALUES
    (24070121010, 6, 84, 8.40),
    (24070121010, 8, 79, 7.90),
    (24070123011, 12, 88, 8.80),
    (24070123011, 13, 18, 1.80),
    (24070125012, 15, 82, 8.20),
    (24070125012, 16, 17, 1.70),
    (24070126014, 18, 45, 4.50),
    (24070126014, 19, 91, 9.10),
    (24070127015, 21, 44, 4.40),
    (24070127015, 22, 89, 8.90),
    (24070122016, 1, 90, 9.00),
    (24070122016, 4, 93, 9.30)
ON DUPLICATE KEY UPDATE
    Marks = VALUES(Marks),
    Scaled_Marks = VALUES(Scaled_Marks);
