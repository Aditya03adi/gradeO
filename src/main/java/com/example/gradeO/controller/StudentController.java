package com.example.gradeO.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.MarksDetailsDTO;
import com.example.DTO.TestDetailsDTO;
import com.example.gradeO.model.Student;
import com.example.gradeO.repository.MarksRepository;
import com.example.gradeO.repository.StudentRepository;
import com.example.gradeO.repository.TestRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@RestController
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:4173",
                "http://127.0.0.1:4173"
        },
        allowCredentials = "true"
)
@Validated
public class StudentController {

    private final StudentRepository studentRepo;
    private final MarksRepository marksRepo;
    private final TestRepository testRepo;

    public StudentController(StudentRepository studentRepo,
                             MarksRepository marksRepo,
                             TestRepository testRepo) {
        this.studentRepo = studentRepo;
        this.marksRepo = marksRepo;
        this.testRepo = testRepo;
    }

    @GetMapping("/students")
    public List<Student> getStudents() {
        return studentRepo.findAll();
    }

    @GetMapping("/tests")
    public List<TestDetailsDTO> getTests() {
        return testRepo.findAllTestDetails().stream()
                .map(test -> new TestDetailsDTO(
                        test.getId(),
                        test.getName(),
                        test.getComponentCode(),
                        test.getSubjectName(),
                        test.getSubjectCode(),
                        test.getSubjectDept(),
                        test.getComponentName(),
                        test.getFacultyName(),
                        test.getFacultyCode(),
                        test.getDate(),
                        resolveStatus(test.getDate()),
                        test.getTotalMarks(),
                        test.getScaledMaxMarks()
                ))
                .toList();
    }

    private String resolveStatus(LocalDate testDate) {
        if (testDate == null) {
            return "Unknown";
        }
        return testDate.isBefore(LocalDate.now()) ? "Completed" : "Upcoming";
    }

    @GetMapping("/marks/{studentId}")
    public ResponseEntity<?> getMarksByStudent(
            @PathVariable
            @Min(value = 10000000000L, message = "Student PRN must be exactly 11 digits")
            @Max(value = 99999999999L, message = "Student PRN must be exactly 11 digits")
            long studentId,
            HttpSession session
    ) {
        Long loggedInStudentPrn = (Long) session.getAttribute("studentPrn");
        String role = (String) session.getAttribute("role");

        if (loggedInStudentPrn == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please log in to view marks");
        }

        boolean isAdmin = role != null && role.equalsIgnoreCase("admin");
        if (!isAdmin && loggedInStudentPrn != studentId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only view your own marks");
        }

        return ResponseEntity.ok(getMarksForStudent(studentId));
    }

    @GetMapping("/marks")
    public ResponseEntity<?> getCurrentStudentMarks(HttpSession session) {
        Long loggedInStudentPrn = (Long) session.getAttribute("studentPrn");
        if (loggedInStudentPrn == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please log in to view marks");
        }

        return ResponseEntity.ok(getMarksForStudent(loggedInStudentPrn));
    }

    private List<MarksDetailsDTO> getMarksForStudent(long studentId) {
        return marksRepo.findDetailsByStudentPrn(studentId).stream()
                .map(mark -> new MarksDetailsDTO(
                        mark.getStudentPrn(),
                        mark.getTestId(),
                        mark.getMarks(),
                        mark.getScaledMarks()
                ))
                .toList();
    }
}
