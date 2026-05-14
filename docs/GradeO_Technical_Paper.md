# GradeO: A Department-Aware Academic Performance Tracking and Student Information System

**Authors:** [Student Name(s)]  
**Institution:** [Institution Name]  
**Department:** [Department Name]  
**Course / Project:** Project-Based Learning (PBL)  
**Date:** April 2026

## Abstract

Academic performance data in many institutions is still handled through fragmented systems such as paper records, spreadsheets, institution-specific portals, or general learning management systems. These approaches often provide limited visibility, weak personalization, poor usability, and little support for continuous academic monitoring. GradeO is a full-stack academic performance tracking system designed to address these limitations through a centralized, student-oriented web application. The system provides secure login and signup, department-aware views, student records, test schedules, marks tracking, subject-wise total marks, password management, and academic information dashboards. The backend is implemented using Spring Boot with MySQL, while the frontend uses React with Vite for a modern responsive interface. GradeO emphasizes structured data access, role-aware information visibility, consistent academic categorization by PRN, and a cleaner user experience than traditional academic record systems. This paper presents the motivation, system design, implementation details, key features, current outcomes, limitations, and future scope of the GradeO platform.

**Keywords:** academic tracking, student information system, performance monitoring, React, Spring Boot, MySQL, educational software

## 1. Introduction

Student academic performance is influenced not only by classroom learning but also by how easily learners and institutions can access, interpret, and act on academic data. In many college environments, performance records are distributed across registers, spreadsheet files, notice-board-style portals, and isolated software tools. As a result, students often receive information only in fragmented form, while faculty and administrators face unnecessary effort in record maintenance and retrieval.

GradeO was developed as a web-based academic tracking system that improves visibility, organization, and accessibility of student academic data. Rather than functioning only as a results portal, the system is designed as a usable academic workspace where students can view test records, marks, department-specific data, and consolidated performance information in one place. The platform aims to reduce friction in academic monitoring and create a more meaningful digital experience for students.

## 2. Problem Statement

Existing academic record solutions commonly suffer from one or more of the following problems:

- manual maintenance and high dependence on human intervention
- inconsistent formatting and lack of centralization
- poor visualization of academic progress
- weak personalization for students
- limited integration between marks, tests, and student records
- inadequate support for real-time or department-specific filtering

These issues make it difficult for students to understand their progress and for institutions to manage academic information in a consistent and scalable way.

## 3. Objectives

The main objectives of GradeO are:

- to centralize student academic information in a single web application
- to provide secure student access to marks and profile information
- to display department-specific tests, students, and academic data
- to track completed and upcoming tests through a dashboard interface
- to summarize subject-wise performance using scaled marks
- to improve academic usability through a cleaner and more intuitive interface

## 4. Existing Solutions and Their Limitations

Traditional academic data handling methods still dominate in many institutions:

1. **Manual or traditional record-keeping:** Physical registers and paper-based academic records are time-consuming, error-prone, and difficult to retrieve quickly.
2. **Spreadsheet-based systems:** Tools such as Microsoft Excel or Google Sheets provide digital storage, but they remain isolated, inconsistent, and dependent on manual interpretation.
3. **Standalone learning management systems:** Platforms such as Moodle or Blackboard mainly support course delivery and assignment management rather than holistic academic performance tracking.
4. **Institution-specific portals:** Many portals publish grades and semester results but offer limited interaction, weak visualization, and poor continuity across semesters or subjects.
5. **Mobile apps with limited features:** Personal tracking applications often require manual input and do not integrate with institutional academic records.

GradeO improves on these approaches by combining centralized data, subject-wise tracking, department-aware filtering, secure student-specific access, and a more interactive interface.

## 5. Proposed System

GradeO is a centralized academic performance tracking platform designed for students and academic stakeholders. The current implementation supports:

- PRN-based signup and login
- secure session persistence for authenticated users
- department and branch inference from student PRN
- dashboard-based academic summaries
- student list views filtered by department
- test list views with status and date filters
- marks display for the logged-in student
- subject-wise total marks analysis
- schema and department information display
- password reset functionality
- restricted signup using institutional email addresses ending with `@sitpune.edu.in`

The system is intended to make academic data easier to access, understand, and use for continuous progress monitoring.

## 6. System Architecture

GradeO follows a client-server architecture with a React frontend, a Spring Boot backend, and a MySQL relational database.

### 6.1 Frontend Layer

The frontend is implemented using React and Vite. It provides:

- a landing page with product overview
- authentication pages for login and signup
- protected routes for authenticated users
- dashboard, profile, students, tests, marks, total marks, and information pages
- client-side filtering and presentation logic
- a modern, student-friendly user experience

### 6.2 Backend Layer

The backend is implemented using Spring Boot with REST-style endpoints. It handles:

- authentication and signup requests
- password validation and reset
- student, marks, and test retrieval
- schema overview and academic metadata access
- global validation and exception handling
- department and branch classification using PRN rules

### 6.3 Data Layer

MySQL is used as the persistent data store. The database manages:

- student details
- user accounts
- tests and subjects
- faculty and faculty-subject mapping
- marks and scaled marks

Seeded data is used to maintain realistic department-wise academic records and upcoming tests across branches.

## 7. Technology Stack

### Frontend

- React 19
- React Router
- Vite
- JavaScript
- CSS

### Backend

- Java 17
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Spring Data JDBC
- Spring Validation
- Spring Security Crypto

### Database and Tools

- MySQL 8
- Maven
- npm
- ESLint

## 8. Functional Modules

### 8.1 Authentication Module

Students can create accounts using PRN, name, institutional email, and password. Login is PRN-based. Passwords are stored securely using BCrypt hashing for supported records. Signup is restricted to `@sitpune.edu.in` email addresses to ensure institutional relevance.

### 8.2 Academic Classification Module

The system infers branch and department from the PRN structure. This logic ensures consistent academic classification and allows the system to automatically assign users to the correct department context without additional manual mapping.

### 8.3 Dashboard Module

The dashboard presents useful academic indicators such as:

- number of completed tests
- number of upcoming tests
- total branch tests
- subjects covered
- faculty involved
- branch student count
- next upcoming test
- progress overview based on current branch data

### 8.4 Tests Module

The tests page shows department-specific academic tests and allows filtering by:

- subject
- status
- date range

This helps students focus on relevant assessments rather than navigating the entire institutional dataset.

### 8.5 Marks Module

The marks page displays marks only for the authenticated student. It includes test context such as component, subject code, and scaled marks, which supports privacy and student-specific access control.

### 8.6 Total Marks Module

The total marks page provides subject-wise aggregated performance by displaying:

- total marks scored
- total marks tested so far

The tested-so-far total is computed using the scaled maximum marks available from completed assessments, allowing consistent subject-level comparison.

### 8.7 Department Information Module

The information page filters academic metadata such as subjects, faculties, and mappings by the logged-in student’s department. This supports department-aware visibility rather than exposing unrelated academic records.

### 8.8 Profile and Password Management Module

The profile page displays account and academic identity details and allows secure password reset with input validation.

## 9. Database Design Overview

The GradeO system uses relational entities that support both academic records and user access. Core tables include:

- `student`
- `user`
- `test`
- `subjects`
- `faculty`
- `faculty_subject`
- `marks_scored`
- `component`

Relationships between these entities allow the system to connect students with tests, tests with subjects and faculty, and marks with both the test and the student.

## 10. Security and Validation

The current implementation includes several practical security and validation measures:

- PRN validation using fixed-length numeric constraints
- email format validation and institutional domain restriction
- password length validation
- BCrypt password hashing for secure storage
- session-based access for logged-in users
- role and identity checks for marks access
- centralized exception handling for validation failures

These measures improve trustworthiness and reduce invalid data entry.

## 11. Implementation Highlights

Some key technical implementation decisions in GradeO include:

- using REST endpoints to separate frontend and backend responsibilities
- normalizing department names across the frontend and backend
- deriving academic classification from PRN digits
- filtering views by department to improve relevance
- seeding realistic branch-wise data and upcoming tests
- grouping scaled marks subject-wise to provide higher-level academic summaries

The system has evolved from a basic academic portal into a more integrated and student-aware platform.

## 12. Results and Current Outcomes

As of the current version, GradeO successfully demonstrates:

- centralized access to students, tests, marks, and department information
- secure and restricted access to personal marks
- branch-wise and department-wise visibility
- improved usability compared to spreadsheet or portal-based tracking
- dashboard-based academic summaries
- upcoming test tracking across all branches
- subject-wise total marks aggregation
- enforcement of institution-only email registration

These results indicate that GradeO is already a stronger academic monitoring solution than manual records, isolated spreadsheets, and static result portals.

## 13. Limitations

Although GradeO provides a strong foundation, the current project version still has limitations:

- attendance management is not yet integrated
- analytics are currently descriptive rather than predictive
- faculty and administrator workflows are limited
- semester-wise longitudinal analysis is not yet implemented
- deployment, audit logs, and advanced reporting can be improved further

These limitations represent opportunities for future system growth.

## 14. Future Scope

The following enhancements can significantly improve the project:

- semester-wise and year-wise trend analysis
- attendance integration
- CGPA and performance prediction analytics
- notifications for upcoming assessments
- role-specific faculty and administrator dashboards
- downloadable reports and printable academic summaries
- stronger session control and audit mechanisms
- deployment to cloud infrastructure for multi-user institutional access

## 15. Conclusion

GradeO demonstrates how a focused academic tracking application can improve the way student performance data is managed and experienced. By combining a React-based frontend, a Spring Boot backend, and a MySQL database, the system delivers centralized academic visibility with department-aware filtering, secure access, and meaningful subject-level summaries. Compared with traditional academic record methods, GradeO offers better organization, personalization, and usability. In its current form, it is already suitable as a strong academic software project and a meaningful foundation for a larger institutional student information system.

## References

1. Spring Boot Documentation.
2. React Documentation.
3. Vite Documentation.
4. MySQL Reference Manual.
5. General literature on student information systems and academic performance tracking.
