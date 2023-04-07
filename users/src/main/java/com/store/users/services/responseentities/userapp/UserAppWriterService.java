package com.store.users.services.responseentities.userapp;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.store.users.entities.UserApp;
import com.store.users.repositories.UserAppRepository;
import com.store.users.services.credential.CredentialAppValidatorService;

@Service
public class UserAppWriterService {
	@Autowired
	private UserAppRepository repository;
	@Autowired
	private CredentialAppValidatorService service;
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public ResponseEntity<?> save(UserApp user) {
		try {
			if (service.isCredentialValid(user.getCredential())) {
				String password = user.getCredential().getPassword();
				user.getCredential().setPassword(encoder.encode(password));
			}
			Date registration = new Date(System.currentTimeMillis());
			user.setRegistration(registration);
			repository.save(user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}