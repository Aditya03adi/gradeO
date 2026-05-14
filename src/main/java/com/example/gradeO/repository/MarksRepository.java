package com.example.gradeO.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.gradeO.model.Marks;

import java.util.List;

public interface MarksRepository extends JpaRepository<Marks, Integer> {
    List<Marks> findByStudentId(long studentId);

    interface MarksDetailsProjection {
        Long getStudentPrn();
        Integer getTestId();
        Integer getMarks();
        java.math.BigDecimal getScaledMarks();
    }

    @Query(value = """
            SELECT
                PRN AS studentPrn,
                Test_ID AS testId,
                Marks AS marks,
                Scaled_Marks AS scaledMarks
            FROM marks_scored
            WHERE PRN = ?1
            ORDER BY Test_ID
            """, nativeQuery = true)
    List<MarksDetailsProjection> findDetailsByStudentPrn(long studentPrn);
}
