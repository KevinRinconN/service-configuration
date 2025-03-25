package com.microservice.common.utils.responseHandler;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ResponseHandler<T> extends ResponseEntity<Object>{

    public ResponseHandler(Object body, HttpStatus status) {
        super(body, status);
    }

    /**
     * Returns a response with a message, status code and data
     * @param message the message
     * @param status the status code
     * @param data the data
     * @return a response with a message, status code and data
     * @param <T> the type of the data
     */
    public static <T> ResponseHandler<T> response(String message, HttpStatus status, T data) {
        ResponseFormat<T> responseFormat = new ResponseFormat<>(message, status.value(), data);
        return new ResponseHandler<>(responseFormat, status);
    }

    /**
     * Returns a response with a message, status and no data
     * @param message the message
     * @param status the status code
     * @return a response with a message, status code and no data
     */
    public static <T>  ResponseHandler<T> response(String message,  HttpStatus status) {
        ResponseFormat<T> responseFormat = new ResponseFormat<>(message, status.value(), null);
        return new ResponseHandler<>(responseFormat, status);
    }


    /**
     * Returns a response with a message, status code 200 and data
     * @param message the message
     * @param data the data
     * @return a response with a message, status code 200 and data
     * @param <T> the type of the data
     */
    public static <T> ResponseHandler<T> success(String message, T data) {
        ResponseFormat<T> responseFormat = new ResponseFormat<>(message, HttpStatus.OK.value(), data);
        return new ResponseHandler<>(responseFormat, HttpStatus.OK);
    }

    /**
     * Returns a response with a message, status code 200 no data
     * @param message the message
     * @return a response with a message, status code 200 no data
     */
    public static ResponseHandler<Void> success(String message) {
        ResponseFormat<Void> responseFormat = new ResponseFormat<>(message, HttpStatus.OK.value(), null);
        return new ResponseHandler<>(responseFormat, HttpStatus.OK);
    }


    /**
     * Returns a response with an error message and status code 404
     * @param message the error message
     * @param details the error details
     * @param code the error code
     * @param path the path where the error occurred
     * @param status the status code
     * @return a response with an error message and status code 404
     */
    public static ResponseHandler<ErrorResponse> error(
            String message,
            List<String> details,
            String code,
            String path,
            HttpStatus status
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .code(code)
                .message(message)
                .details(details)
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseHandler<>(errorResponse, status != null ? status : HttpStatus.BAD_REQUEST);
    }

    /**
     * Polymorphic error method with status code 400
     * @param message the error message
     * @param details the error details
     * @param code the error code
     * @param path the path where the error occurred
     * @return a response with an error message and status code 400
     */
    public static ResponseHandler<ErrorResponse> error(
            String message,
            List<String> details,
            String code,
            String path
    ) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .code(code)
                .message(message)
                .details(details)
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseHandler<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
