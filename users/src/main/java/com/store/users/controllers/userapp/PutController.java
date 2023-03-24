package com.store.users.controllers.userapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.userapp.UserAppUpdater;

@CrossOrigin
@RestController
public class PutController {

	@Autowired
	private UserAppUpdater updater;

	@PutMapping("user/update")
	private ResponseEntity<UserApp> update(@RequestBody UserApp user) {
		return updater.update(user);
	}
}