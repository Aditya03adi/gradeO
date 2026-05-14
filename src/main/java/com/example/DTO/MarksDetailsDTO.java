package com.example.DTO;

import java.math.BigDecimal;

public class MarksDetailsDTO {
    public long studentPrn;
    public int testId;
    public Integer marks;
    public BigDecimal scaledMarks;

    public MarksDetailsDTO(long studentPrn, int testId, Integer marks, BigDecimal scaledMarks) {
        this.studentPrn = studentPrn;
        this.testId = testId;
        this.marks = marks;
        this.scaledMarks = scaledMarks;
    }
}
