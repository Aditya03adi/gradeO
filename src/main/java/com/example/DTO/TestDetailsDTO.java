package com.example.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TestDetailsDTO {
    public int id;
    public String name;
    public Integer componentCode;
    public String subjectName;
    public Integer subjectCode;
    public String subjectDept;
    public String componentName;
    public String facultyName;
    public Integer facultyCode;
    public LocalDate date;
    public String status;
    public Integer totalMarks;
    public BigDecimal scaledMaxMarks;

    public TestDetailsDTO(int id,
                          String name,
                          Integer componentCode,
                          String subjectName,
                          Integer subjectCode,
                          String subjectDept,
                          String componentName,
                          String facultyName,
                          Integer facultyCode,
                          LocalDate date,
                          String status,
                          Integer totalMarks,
                          BigDecimal scaledMaxMarks) {
        this.id = id;
        this.name = name;
        this.componentCode = componentCode;
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
        this.subjectDept = subjectDept;
        this.componentName = componentName;
        this.facultyName = facultyName;
        this.facultyCode = facultyCode;
        this.date = date;
        this.status = status;
        this.totalMarks = totalMarks;
        this.scaledMaxMarks = scaledMaxMarks;
    }
}
