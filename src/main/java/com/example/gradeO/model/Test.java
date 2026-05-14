package com.example.gradeO.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "test")
public class Test {

    @Id
    @Column(name = "Test_ID")
    private int id;

    // Keep the API field while deriving it from the real table data.
    @Transient
    private String name;

    @Column(name = "Max_Marks")
    private int totalMarks;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        if (name == null || name.isBlank()) {
            return "Test " + id;
        }
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }
}
