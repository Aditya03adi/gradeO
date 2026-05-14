package com.example.gradeO.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gradeO.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
