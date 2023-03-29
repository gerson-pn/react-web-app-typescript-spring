package com.store.users.services;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.store.users.entities.CredentialApp;
import com.store.users.entities.Phone;
import com.store.users.entities.UserApp;
import com.store.users.repositories.UserAppRepository;

@Service
public class DatabaseInitializer {
	@Autowired
	private UserAppRepository repository;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public void initializeDatabase() {
		UserApp user = new UserApp();
		user.setName("Pedro de Alcântara Gonzaga");
		user.setRegistration(Calendar.getInstance().getTime());

		Phone phone = new Phone();
		phone.setNumber("(00) 0000-0000");
		user.getPhones().add(phone);

		repository.save(user);

		UserApp user2 = new UserApp();
		user2.setName("Teresa Cristina de Bourbon-Duas Sicilias");
		user2.setRegistration(Calendar.getInstance().getTime());

		Phone phone2 = new Phone();
		phone2.setNumber("(99) 9999-9999");
		user2.getPhones().add(phone2);

		repository.save(user2);

		UserApp root = new UserApp();
		root.setName("root");
		root.setRegistration(Calendar.getInstance().getTime());

		Phone phone3 = new Phone();
		phone3.setNumber("(66) 6666-6666");
		root.getPhones().add(phone3);

		CredentialApp credencial = new CredentialApp();
		String password = encoder.encode("root");
		credencial.setPassword(password);
		credencial.setUserName("root");
		root.setCredential(credencial);

		repository.save(root);
	}
}