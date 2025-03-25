package com.microservice.common.utils.responseHandler;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder @Getter @Setter
public class ErrorResponse {
    /**
     * Custom code to identify the error
     */
    private String code;

    /**
     * Error message
     */
    private String message;

    /**
     * Details about the error
     */
    private List<String> details;

    /**
     * Path where the error occurred
     */
    private String path;

    /**
     * Timestamp of the error
     */
    private LocalDateTime timestamp;
}
