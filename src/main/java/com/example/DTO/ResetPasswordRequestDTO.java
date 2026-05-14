package com.example.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ResetPasswordRequestDTO {
    @NotNull(message = "PRN is required")
    @Min(value = 10000000000L, message = "PRN must be exactly 11 digits")
    @Max(value = 99999999999L, message = "PRN must be exactly 11 digits")
    public Long prn;

    @NotBlank(message = "Current password is required")
    public String currentPassword;

    @NotBlank(message = "New password is required")
    @Size(min = 8, max = 100, message = "New password must be between 8 and 100 characters")
    public String newPassword;
}
