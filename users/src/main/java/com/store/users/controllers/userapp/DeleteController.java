package com.store.users.controllers.userapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.UserApp;
import com.store.users.services.userapp.UserAppDeleter;

@RestController
public class DeleteController {
	@Autowired
	private UserAppDeleter deleter;
	
	@DeleteMapping("/user/delete")
	public ResponseEntity<?> delete(@RequestBody UserApp user){
		return deleter.delete(user);
	}
}