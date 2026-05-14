package com.example.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SignupRequestDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    public String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Pattern(
            regexp = "^[^\\s@]+@sitpune\\.edu\\.in$",
            message = "Only @sitpune.edu.in email addresses are allowed"
    )
    public String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    public String password;

    @NotNull(message = "PRN is required")
    @Min(value = 10000000000L, message = "PRN must be exactly 11 digits")
    @Max(value = 99999999999L, message = "PRN must be exactly 11 digits")
    public Long prn;
}
