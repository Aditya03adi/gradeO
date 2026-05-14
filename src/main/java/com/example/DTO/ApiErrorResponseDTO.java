package com.example.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class ApiErrorResponseDTO {
    public LocalDateTime timestamp;
    public int status;
    public String error;
    public String message;
    public List<String> details;

    public ApiErrorResponseDTO(LocalDateTime timestamp, int status, String error, String message, List<String> details) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.details = details;
    }
}
