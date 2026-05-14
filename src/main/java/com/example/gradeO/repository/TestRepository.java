package com.example.gradeO.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.gradeO.model.Test;

public interface TestRepository extends JpaRepository<Test, Integer> {

    interface TestDetailsProjection {
        Integer getId();
        String getName();
        Integer getComponentCode();
        String getSubjectName();
        Integer getSubjectCode();
        String getSubjectDept();
        String getComponentName();
        String getFacultyName();
        Integer getFacultyCode();
        LocalDate getDate();
        Integer getTotalMarks();
        java.math.BigDecimal getScaledMaxMarks();
    }

    @Query(value = """
            SELECT
                t.Test_ID AS id,
                CONCAT(s.Name, ' ', c.Name) AS name,
                t.C_code AS componentCode,
                s.Name AS subjectName,
                t.S_code AS subjectCode,
                s.Dept AS subjectDept,
                c.Name AS componentName,
                f.Name AS facultyName,
                t.F_code AS facultyCode,
                t.Date AS date,
                t.Max_Marks AS totalMarks,
                t.Scaled_Max_Marks AS scaledMaxMarks
            FROM test t
            LEFT JOIN subjects s ON s.S_code = t.S_code
            LEFT JOIN component c ON c.C_code = t.C_code
            LEFT JOIN faculty f ON f.F_code = t.F_code
            ORDER BY t.Test_ID
            """, nativeQuery = true)
    List<TestDetailsProjection> findAllTestDetails();
}
