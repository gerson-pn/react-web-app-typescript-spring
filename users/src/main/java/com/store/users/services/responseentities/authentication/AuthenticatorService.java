package com.store.users.services.responseentities.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.store.users.entities.CredentialApp;
import com.store.users.entities.UserApp;
import com.store.users.models.AuthenticationModel;
import com.store.users.security.adapters.UserDetailsServiceImpl;
import com.store.users.services.credential.CredentialAppValidatorService;
import com.store.users.services.jwt.JwtService;
import com.store.users.services.userapp.UserAppService;

@Service
public class AuthenticatorService {
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private UserAppService userAppService;
	@Autowired
	private CredentialAppValidatorService credentialAppValidatorService;
	@Autowired
	private JwtService jwtService;

	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	private final String secret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
	private final long duration = 9000000;

	public ResponseEntity<?> authenticate(CredentialApp credential) {
		ResponseEntity<?> response = new ResponseEntity<>(new AuthenticationModel(), HttpStatus.BAD_REQUEST);
		if (credentialAppValidatorService.isCredentialValid(credential)) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(credential.getUserName());
			if (userDetails != null) {
				UserApp userApp = userAppService.user(credential.getUserName());
				String jwtToken = this.jwtService.createToken(userDetails.getUsername(), duration, secret);
				jwtToken = "Bearer " + jwtToken;
				AuthenticationModel model = new AuthenticationModel(jwtToken, userApp);
				response = new ResponseEntity<>(model, HttpStatus.ACCEPTED);
			}
		}
		return response;
	}
}