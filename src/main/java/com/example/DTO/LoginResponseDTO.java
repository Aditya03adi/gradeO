package com.example.DTO;

public class LoginResponseDTO {
    public int id;
    public String name;
    public String email;
    public String role;
    public Long studentPrn;
    public String branch;
    public String dept;

    public LoginResponseDTO(int id, String name, String email, String role, Long studentPrn, String branch, String dept) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.studentPrn = studentPrn;
        this.branch = branch;
        this.dept = dept;
    }
}
