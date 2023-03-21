package com.store.users.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.users.entities.UserApp;
import com.store.users.repositories.UserAppRepository;

@Service
public class UserAppReader {
	@Autowired
	private UserAppRepository repositorio;

	public UserApp getUser(Long id) throws EntityNotFoundException {
		Optional<UserApp> optional = repositorio.findById(id);
		UserApp user = optional.orElse(null);
		return user;
	}
}