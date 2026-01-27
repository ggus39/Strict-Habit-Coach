package com.exception;

import lombok.Data;

@Data
public class CustomException extends RuntimeException{
    private Integer code;
    private String msg;

    public CustomException(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
