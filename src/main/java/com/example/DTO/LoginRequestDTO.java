package com.example.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class LoginRequestDTO {
    @NotNull(message = "PRN is required")
    @Min(value = 10000000000L, message = "PRN must be exactly 11 digits")
    @Max(value = 99999999999L, message = "PRN must be exactly 11 digits")
    public Long prn;

    @NotBlank(message = "Password is required")
    public String password;
}
