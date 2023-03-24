package com.store.users.exceptionhandlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class ExceptionHandlerNoRoute {

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<?> HandleNoMethod(MethodArgumentTypeMismatchException e) {
		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
		header.add(e.getCause().getMessage(), e.getLocalizedMessage());
		return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
	}
}