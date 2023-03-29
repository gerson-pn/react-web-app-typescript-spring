package com.store.users.services.responseentities.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.store.users.entities.CredentialApp;
import com.store.users.security.adapters.UserDetailsServiceImpl;
import com.store.users.services.credential.CredentialAppValidatorService;
import com.store.users.services.jwt.JwtService;

@Service
public class AuthenticatorService {
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private CredentialAppValidatorService credentialAppValidatorService;
	@Autowired
	private JwtService jwtService;

	private final String secret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
	private final long duration = 9000000;

	public ResponseEntity<?> authenticate(CredentialApp credential) {
		ResponseEntity<?> response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		if (credentialAppValidatorService.isCredentialValid(credential)) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(credential.getUserName());
			if (userDetails != null) {
				String jwtToken = this.jwtService.createToken(userDetails.getUsername(), duration, secret);
				MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
				header.add("Authorization", "Bearer " + jwtToken);
				response = new ResponseEntity<>(header, HttpStatus.ACCEPTED);
			}
		}

		return response;
	}
}