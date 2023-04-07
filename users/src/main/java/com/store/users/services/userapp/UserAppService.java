package com.store.users.services.userapp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.users.entities.UserApp;
import com.store.users.repositories.UserAppRepository;

@Service
public class UserAppService {
	@Autowired
	private UserAppRepository repository;
	
	public UserApp user(String userName) {
		List<UserApp> users = repository.findAll();
		UserApp target = null;
		for (UserApp user : users) {
			if (user.getCredential() != null) {
				if (user.getCredential().getUserName().equals(userName)) {
					target = user;
					break;
				}
			}
		}
		return target;
	}

	public UserApp getUser(Long id) {
		Optional<UserApp> currentUser = repository.findById(id);
		UserApp user = currentUser.orElse(null);
		return user;
	}
}