# GradeO

GradeO is a full-stack academic performance tracking platform built to give students a cleaner, smarter, and more department-aware way to monitor tests, marks, and academic information. The project replaces fragmented academic workflows such as spreadsheets, manual records, and static result portals with a centralized web application that is easier to use and easier to scale.

## Why GradeO

Many academic systems only publish results, while students still struggle to track progress across subjects, tests, and departments. GradeO addresses that gap by combining secure student access, structured academic data, dashboard-level visibility, and department-specific filtering in one platform.

## Key Features

- Secure PRN-based authentication with password reset support
- Institution-only signup validation using `@sitpune.edu.in` email addresses
- Branch and department inference from PRN
- Department-aware dashboard with completed and upcoming test insights
- Tests page with subject, status, and date filters
- Student-specific marks visibility
- Subject-wise total marks aggregation using scaled marks
- Department information view for subjects, faculty, and academic mappings
- Upcoming tests available across all branches
- Modern React frontend with a cleaner academic UX

## Tech Stack

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
- Spring Validation
- Spring Security Crypto

### Database

- MySQL 8

## Repository Structure

```text
GradeO/
├── frontend/           # React + Vite frontend
├── src/                # Spring Boot backend source
├── docs/               # Technical paper and project documents
├── pom.xml             # Backend Maven configuration
└── README.md           # Project landing page
```

## Modules Implemented

- Authentication
- Dashboard
- Profile and password reset
- Students view
- Tests view
- Marks view
- Total marks view
- Department info view

## Advantages of GradeO

- Centralizes academic information that is otherwise scattered
- Improves clarity through dashboard-style summaries
- Makes academic data easier to access and interpret
- Restricts marks access to the correct logged-in student
- Supports department-specific views instead of showing irrelevant records
- Provides a more polished and student-friendly experience than traditional portals

## Current Highlights

- Full-stack working prototype with backend API and frontend UI
- Department name normalization across backend, frontend, and database
- Live-ready codebase structure for GitHub sharing
- Submission-ready technical paper included in the `docs` folder

## Future Improvements

- Attendance integration
- Semester-wise and year-wise trend analysis
- CGPA and predictive performance analytics
- Faculty and administrator dashboards
- Downloadable reports and printable summaries
- Notification system for upcoming tests and deadlines
- Cloud deployment with public live demo links

## How to Run Locally

### Backend

1. Open the backend folder in a terminal.
2. Configure MySQL and update `src/main/resources/application.properties` if needed.
3. Run:

```powershell
./mvnw.cmd spring-boot:run
```

The backend starts on `http://localhost:8088`.

### Frontend

1. Open the `frontend` folder in a terminal.
2. Install dependencies if needed.
3. Run:

```powershell
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`.

## Project Impact

GradeO demonstrates how a student information and academic tracking system can move beyond static grade publishing and become a practical, interactive academic workspace. It is suitable as a portfolio project, academic submission, and a foundation for further institutional deployment.

## Documentation

Technical papers are available in the `docs` folder:

- `GradeO_Technical_Paper.docx`
- `GradeO_Technical_Paper_IEEE.docx`
- `GradeO_Technical_Paper.md`

## Resume-Friendly One-Line Summary

Built **GradeO**, a full-stack academic performance tracking system using **React, Spring Boot, and MySQL**, featuring secure student authentication, department-aware dashboards, test and marks management, and subject-wise performance analytics.
