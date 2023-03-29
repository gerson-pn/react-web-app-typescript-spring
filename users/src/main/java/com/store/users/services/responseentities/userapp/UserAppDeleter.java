package com.store.users.services.responseentities.userapp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.store.users.entities.UserApp;
import com.store.users.repositories.UserAppRepository;

@Service
public class UserAppDeleter {
	@Autowired
	private UserAppRepository repository;

	public ResponseEntity<?> delete(UserApp user) {
		try {
			Optional<UserApp> currentUser = repository.findById(user.getId());
			UserApp target = currentUser.orElse(null);
			repository.delete(target);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch (InvalidDataAccessApiUsageException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}