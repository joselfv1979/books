package com.jose.books.exceptions;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jose.books.payload.response.ApiResponse;

import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ApiResponse<List<String>> response = new ApiResponse<>(false);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<List<String>>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());

        response.setErrors(getErrorsMap(errors));

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<List<String>>> handleNotFoundException(
            UsernameNotFoundException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());

        response.setErrors(getErrorsMap(errors));

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<List<String>>> handleGeneralExceptions(Exception ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());

        response.setErrors(getErrorsMap(errors));

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<List<String>>> handleRuntimeExceptions(RuntimeException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());

        response.setErrors(getErrorsMap(errors));

        return ResponseEntity.badRequest().body(response);
    }

    private List<String> getErrorsMap(List<String> errors) {
        List<String> errorResponse = new ArrayList<>();
        errors.forEach(errorResponse::add);
        return errorResponse;
    }

}
