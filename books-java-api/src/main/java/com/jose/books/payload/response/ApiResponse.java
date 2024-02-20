package com.jose.books.payload.response;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private List<String> errors;
    private T data;

    public ApiResponse(boolean success) {
        this.success = success;
    }
}
