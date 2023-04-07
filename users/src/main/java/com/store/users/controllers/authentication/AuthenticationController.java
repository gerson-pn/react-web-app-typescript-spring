package com.store.users.controllers.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.users.entities.CredentialApp;
import com.store.users.services.responseentities.authentication.AuthenticatorService;

@CrossOrigin
@RestController
public class AuthenticationController {

	@Autowired
	private AuthenticatorService authenticatorService;

	@PostMapping("/user/signin")
	public ResponseEntity<?> authenticate(@RequestBody CredentialApp credential) {
		return this.authenticatorService.authenticate(credential);
	}
}