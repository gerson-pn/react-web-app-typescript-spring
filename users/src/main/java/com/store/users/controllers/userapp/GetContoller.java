package com.store.users.controllers.userapp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.responseentities.userapp.UserAppReaderService;

@CrossOrigin
@RestController
public class GetContoller {
	@Autowired
	private UserAppReaderService userReader;
	
	@GetMapping("/user/{id}")
	@PreAuthorize("hasAnyAuthority('ROLE_READER','ROLE_ROOT')")
	public ResponseEntity<UserApp> getUser(@PathVariable Long id) {
		return userReader.getUser(id);
	}

	
	@GetMapping("/user/nonroots")
	@PreAuthorize("hasAnyAuthority('ROLE_READER','ROLE_ROOT')")
	public ResponseEntity<List<UserApp>> getUsers() {
		return userReader.getUsers();
	}

	
	@GetMapping("/user/roots")
	@PreAuthorize("hasAuthority('ROLE_ROOT')")
	public ResponseEntity<List<UserApp>> getRootUsers() {
		return userReader.getRootUsers();
	}
}