package com.microservice.common.utils.exception;

import com.microservice.common.utils.responseHandler.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException exception, WebRequest webRequest) {
        return new ResponseEntity<>(ErrorResponse.builder()
                .code("EVENT_BAD_REQUEST")
                .message(exception.getMessage())
                .path(webRequest.getDescription(false).replace("uri=",""))
                .timestamp(LocalDateTime.now())
                .build(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AlreadyExitsException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(AlreadyExitsException exception, WebRequest webRequest) {
        return new ResponseEntity<>(ErrorResponse.builder()
                .code("EVENT_CONFLICT_REQUEST")
                .message(exception.getMessage())
                .path(webRequest.getDescription(false).replace("uri=",""))
                .timestamp(LocalDateTime.now())
                .build(), HttpStatus.CONFLICT);
    }

}
