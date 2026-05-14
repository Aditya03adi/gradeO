package com.example.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class StudentUpdateRequestDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    public String name;

    @NotBlank(message = "Branch is required")
    @Size(max = 50, message = "Branch must not exceed 50 characters")
    public String branch;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    public String email;

    @NotBlank(message = "Department is required")
    @Size(max = 50, message = "Department must not exceed 50 characters")
    public String dept;
}
