package com.example.gradeO.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.LoginRequestDTO;
import com.example.DTO.LoginResponseDTO;
import com.example.DTO.ResetPasswordRequestDTO;
import com.example.DTO.SignupRequestDTO;
import com.example.gradeO.model.Student;
import com.example.gradeO.model.User;
import com.example.gradeO.repository.StudentRepository;
import com.example.gradeO.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

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
@RequestMapping("/auth")
@Validated
public class AuthController {
    private final UserRepository userRepo;
    private final StudentRepository studentRepo;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public AuthController(UserRepository userRepo, StudentRepository studentRepo) {
        this.userRepo = userRepo;
        this.studentRepo = studentRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request, HttpSession session) {
        Optional<User> userOpt = userRepo.findByStudentPrn(request.prn);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        User user = userOpt.get();
        if (!passwordMatches(request.password, user)) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        refreshStudentClassification(user);
        storeLoggedInUser(session, user);

        return ResponseEntity.ok(toLoginResponse(user));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDTO request, HttpSession session) {
        String normalizedEmail = normalizeEmail(request.email);
        String normalizedName = normalizeText(request.name);

        if (!isAllowedCollegeEmail(normalizedEmail)) {
            return ResponseEntity.badRequest().body("Only @sitpune.edu.in email addresses are allowed");
        }

        if (userRepo.findByEmail(normalizedEmail).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        if (userRepo.findByStudentPrn(request.prn).isPresent()) {
            return ResponseEntity.badRequest().body("An account already exists for this PRN");
        }

        Student student = studentRepo.findById(request.prn).orElseGet(Student::new);
        student.setId(request.prn);
        student.setName(normalizedName);
        student.setEmail(normalizedEmail);
        applyStudentClassification(student);
        studentRepo.save(student);

        User user = new User();
        user.setName(normalizedName);
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setRole("student");
        user.setStudentPrn(request.prn);

        User savedUser = userRepo.save(user);
        storeLoggedInUser(session, savedUser);
        return ResponseEntity.ok(toLoginResponse(savedUser));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO request) {
        Optional<User> userOpt = userRepo.findByStudentPrn(request.prn);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Account not found for this PRN");
        }

        User user = userOpt.get();
        if (!passwordMatches(request.currentPassword, user)) {
            return ResponseEntity.badRequest().body("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword));
        userRepo.save(user);

        return ResponseEntity.ok("Password updated successfully");
    }

    private String normalizeEmail(String email) {
        return normalizeText(email).toLowerCase();
    }

    private boolean isAllowedCollegeEmail(String email) {
        return email != null && email.endsWith("@sitpune.edu.in");
    }

    private String normalizeText(String value) {
        return value == null ? null : value.trim().replaceAll("\\s+", " ");
    }

    private LoginResponseDTO toLoginResponse(User user) {
        String branch = user.getStudentPrn() == null
                ? null
                : inferBranchFromPrn(user.getStudentPrn());
        String dept = user.getStudentPrn() == null
                ? null
                : inferDepartmentFromPrn(user.getStudentPrn());

        return new LoginResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getStudentPrn(),
                branch,
                dept
        );
    }

    private void storeLoggedInUser(HttpSession session, User user) {
        session.setAttribute("userId", user.getId());
        session.setAttribute("role", user.getRole());
        session.setAttribute("studentPrn", user.getStudentPrn());
    }

    private boolean passwordMatches(String rawPassword, User user) {
        String storedPassword = user.getPassword();
        if (storedPassword == null || storedPassword.isBlank()) {
            return false;
        }

        if (storedPassword.startsWith("$2a$") || storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2y$")) {
            return passwordEncoder.matches(rawPassword, storedPassword);
        }

        boolean matchesLegacyPassword = storedPassword.equals(rawPassword);
        if (matchesLegacyPassword) {
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepo.save(user);
        }
        return matchesLegacyPassword;
    }

    private void refreshStudentClassification(User user) {
        if (user.getStudentPrn() == null) {
            return;
        }

        studentRepo.findById(user.getStudentPrn()).ifPresent(student -> {
            String expectedBranch = inferBranchFromPrn(user.getStudentPrn());
            String expectedDept = inferDepartmentFromPrn(user.getStudentPrn());

            boolean branchChanged = !expectedBranch.equals(student.getBranch());
            boolean deptChanged = !expectedDept.equals(student.getDept());

            if (branchChanged || deptChanged) {
                student.setBranch(expectedBranch);
                student.setDept(expectedDept);
                studentRepo.save(student);
            }
        });
    }

    private void applyStudentClassification(Student student) {
        student.setBranch(inferBranchFromPrn(student.getId()));
        student.setDept(inferDepartmentFromPrn(student.getId()));
    }

    private String inferBranchFromPrn(Long prn) {
        return switch (extractDepartmentDigit(prn)) {
            case '1' -> "Civil";
            case '2' -> "CSE";
            case '3' -> "E&TC";
            case '5' -> "MECH";
            case '6' -> "AIML";
            case '7' -> "R&A";
            default -> "Unknown";
        };
    }

    private String inferDepartmentFromPrn(Long prn) {
        return switch (extractDepartmentDigit(prn)) {
            case '1' -> "Civil Engineering";
            case '2' -> "Computer Science and Engineering";
            case '3' -> "Electronics and Telecommunication Engineering";
            case '5' -> "Mechanical Engineering";
            case '6' -> "Artificial Intelligence and Machine Learning Engineering";
            case '7' -> "Robotics and Automation Engineering";
            default -> "Unknown";
        };
    }

    private char extractDepartmentDigit(Long prn) {
        String prnText = String.valueOf(prn == null ? 0L : prn).trim();
        if (prnText.length() != 11) {
            return '\0';
        }
        return prnText.charAt(7);
    }
}
