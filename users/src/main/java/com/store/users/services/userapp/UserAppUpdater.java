package com.store.users.services.userapp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.store.users.entities.UserApp;
import com.store.users.repositories.UserAppRepository;

@Component
public class UserAppUpdater {
	@Autowired
	private UserAppRepository repository;

	public ResponseEntity<UserApp> update(UserApp updateUser) {
		try {
			Optional<UserApp> currentUser = repository.findById(updateUser.getId());
			UserApp target = currentUser.orElse(null);
			target.setCredential(updateUser.getCredential());
			target.setName(updateUser.getName());
			target.getPhones().clear();
			target.getPhones().addAll(updateUser.getPhones());
			repository.save(updateUser);
			return new ResponseEntity<>(target, HttpStatus.ACCEPTED);
		} catch (InvalidDataAccessApiUsageException e) {
			MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
			header.add(e.getCause().getMessage(), e.getLocalizedMessage());
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}