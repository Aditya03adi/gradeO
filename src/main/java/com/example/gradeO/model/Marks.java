package com.example.gradeO.model;

import jakarta.persistence.*;

@Entity
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private long studentId;
    private int testId;
    private int marksScored;

    // getters & setters


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public long getStudentId() {
        return studentId;
    }
    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }
    public int getTestId() {
        return testId;
    }
    public void setTestId(int testId) {
        this.testId = testId;
    }
    public int getMarksScored() {
        return marksScored;
    }
    public void setMarksScored(int marksScored) {
        this.marksScored = marksScored;
    }
    
}    
