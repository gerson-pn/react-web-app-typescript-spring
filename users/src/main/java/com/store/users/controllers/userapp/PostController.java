package com.store.users.controllers.userapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.responseentities.userapp.UserAppWriterService;

@CrossOrigin
@RestController
public class PostController {
	@Autowired
	private UserAppWriterService userWriter;

	@PreAuthorize("hasAuthority('ROLE_ROOT')")
	@PostMapping("/user/save")
	public ResponseEntity<?> saveUser(@RequestBody UserApp user) {
		return userWriter.save(user);
	}
}