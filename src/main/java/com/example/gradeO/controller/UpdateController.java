package com.example.gradeO.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.StudentUpdateRequestDTO;
import com.example.gradeO.model.Student;
import com.example.gradeO.repository.StudentRepository;

import jakarta.validation.Valid;
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
public class UpdateController {

    private final StudentRepository studentRepo;

    public UpdateController(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    @PutMapping("/students/{studentId}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable
            @Min(value = 10000000000L, message = "Student PRN must be exactly 11 digits")
            @Max(value = 99999999999L, message = "Student PRN must be exactly 11 digits")
            long studentId,
            @Valid @RequestBody StudentUpdateRequestDTO updatedStudent
    ) {
        Optional<Student> existingStudent = studentRepo.findById(studentId);

        if (existingStudent.isEmpty()) {
            throw new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Student not found for PRN " + studentId);
        }

        Student student = existingStudent.get();
        student.setName(normalizeText(updatedStudent.name));
        student.setBranch(normalizeText(updatedStudent.branch));
        student.setEmail(normalizeText(updatedStudent.email).toLowerCase());
        student.setDept(normalizeText(updatedStudent.dept));

        return ResponseEntity.ok(studentRepo.save(student));
    }

    private String normalizeText(String value) {
        return value == null ? null : value.trim().replaceAll("\\s+", " ");
    }
}
