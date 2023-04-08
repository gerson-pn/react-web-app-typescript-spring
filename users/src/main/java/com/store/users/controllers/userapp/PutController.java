package com.store.users.controllers.userapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.responseentities.userapp.UserAppUpdaterService;

@CrossOrigin
@RestController
public class PutController {
	@Autowired
	private UserAppUpdaterService updater;

	@PreAuthorize("hasAuthority('ROLE_ROOT')")
	@PutMapping("/user/update")
	public ResponseEntity<UserApp> update(@RequestBody UserApp user) {
		return updater.update(user);
	}
}