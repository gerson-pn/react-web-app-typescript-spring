package com.store.users.services.userapp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.store.users.entities.UserApp;
import com.store.users.repositories.UserAppRepository;

@Service
public class UserAppReader {
	@Autowired
	private UserAppRepository repositorio;

	public ResponseEntity<UserApp> getUser(Long id) {
		Optional<UserApp> currentUser = repositorio.findById(id);
		UserApp user = currentUser.orElse(null);
		if (user == null) {
			return new ResponseEntity<UserApp>(user, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<UserApp>(user, HttpStatus.FOUND);
		}
	}

	public ResponseEntity<List<UserApp>> getUsers() {
		List<UserApp> users = repositorio.findAll();
		List<UserApp> rootUsers = new ArrayList<>();
		for (UserApp user : users) {
			if (user.getCredential() != null) {
				rootUsers.add(user);
			}
		}
		users.removeAll(rootUsers);
		return new ResponseEntity<List<UserApp>>(users, HttpStatus.FOUND);
	}

	public ResponseEntity<List<UserApp>> getRootUsers() {
		List<UserApp> users = repositorio.findAll();
		List<UserApp> rootUsers = new ArrayList<>();
		for (UserApp user : users) {
			if (user.getCredential() != null) {
				rootUsers.add(user);
			}
		}
		return new ResponseEntity<List<UserApp>>(rootUsers, HttpStatus.FOUND);
	}
}