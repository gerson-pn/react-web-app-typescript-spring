package com.store.users.controllers.userapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.responseentities.userapp.UserAppDeleterService;

@CrossOrigin
@RestController
public class DeleteController {
	@Autowired
	private UserAppDeleterService deleter;
	
	@DeleteMapping("/user/delete")
	@PreAuthorize("hasAuthority('ROLE_ROOT')")
	public ResponseEntity<?> delete(@RequestBody UserApp user){
		return deleter.delete(user);
	}
}