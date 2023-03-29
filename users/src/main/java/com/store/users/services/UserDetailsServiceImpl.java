package com.store.users.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.store.users.entities.UserApp;
import com.store.users.security.adapters.UserDetailsImpl;
import com.store.users.services.userapp.UserAppService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserAppService service;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserApp user = this.service.user(username);
		UserDetails userDetails = new UserDetailsImpl(user.getCredential());
		return userDetails;
	}
}