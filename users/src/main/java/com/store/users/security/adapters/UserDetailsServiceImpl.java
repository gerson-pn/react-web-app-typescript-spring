package com.store.users.security.adapters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.store.users.entities.UserApp;
import com.store.users.services.credential.CredentialAppValidatorService;
import com.store.users.services.userapp.UserAppService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserAppService userAppService;
	@Autowired
	private CredentialAppValidatorService credentialAppValidatorService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserApp user = this.userAppService.user(username);
		if (user != null) {
			return new UserDetailsImpl(credentialAppValidatorService, user.getCredential());
		} else {
			return null;
		}
	}
}