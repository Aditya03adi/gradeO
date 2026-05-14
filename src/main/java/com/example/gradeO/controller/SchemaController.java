package com.example.gradeO.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
public class SchemaController {

    private final JdbcTemplate jdbcTemplate;

    public SchemaController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/schema/overview")
    public Map<String, Object> getSchemaOverview() {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("components", jdbcTemplate.queryForList("""
                SELECT C_code, Name
                FROM component
                ORDER BY C_code
                """));

        response.put("faculties", jdbcTemplate.queryForList("""
                SELECT F_code, Name
                FROM faculty
                ORDER BY F_code
                """));

        response.put("subjects", jdbcTemplate.queryForList("""
                SELECT S_code, Name, Dept
                FROM subjects
                ORDER BY S_code
                """));

        response.put("facultySubjects", jdbcTemplate.queryForList("""
                SELECT F_code, S_code
                FROM faculty_subject
                ORDER BY F_code, S_code
                """));

        response.put("tests", jdbcTemplate.queryForList("""
                SELECT
                    t.Test_ID,
                    t.C_code,
                    c.Name AS component_name,
                    t.S_code,
                    s.Name AS subject_name,
                    s.Dept AS subject_dept,
                    t.F_code,
                    f.Name AS faculty_name,
                    t.Date,
                    t.Max_Marks,
                    t.Scaled_Max_Marks
                FROM test t
                LEFT JOIN component c ON c.C_code = t.C_code
                LEFT JOIN subjects s ON s.S_code = t.S_code
                LEFT JOIN faculty f ON f.F_code = t.F_code
                ORDER BY t.Test_ID
                """));

        response.put("students", jdbcTemplate.queryForList("""
                SELECT PRN, name, branch, dept, email
                FROM student
                ORDER BY PRN
                """));

        response.put("users", jdbcTemplate.queryForList("""
                SELECT id, email, name, role, student_prn
                FROM user
                ORDER BY id
                """));

        response.put("marks", jdbcTemplate.queryForList("""
                SELECT id, student_id, test_id, marks_scored
                FROM marks
                ORDER BY id
                """));

        response.put("marksScored", jdbcTemplate.queryForList("""
                SELECT PRN, Test_ID, Marks, Scaled_Marks
                FROM marks_scored
                ORDER BY PRN, Test_ID
                """));

        return response;
    }
}
