package com.store.users;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.store.users.services.DatabaseInitializer;

@SpringBootApplication
public class UsersApplication implements CommandLineRunner {
	@Autowired
	private DatabaseInitializer databaseInitializer;

	public static void main(String[] args) {
		//SpringApplication.run(UsersApplication.class, args);
		Map<String, Object> appConfiguration = new HashMap<>();
		appConfiguration.put("server.port", "5555");
		/*configuracao.put("spring.datasource.url", "jdbc:mysql://localhost:3306/database");
		configuracao.put("spring.datasource.username", "root");
		configuracao.put("spring.datasource.password", "root");
		configuracao.put("spring.jpa.hibernate.ddl-auto", "create");*/
		appConfiguration.put("spring.jpa.show-sql", "true");
		
		/*JWT Config*/
		

		SpringApplication app = new SpringApplication(UsersApplication.class);
		app.setDefaultProperties(appConfiguration);
		app.run(args);
	}

	@Override
	public void run(String... args) throws Exception {
		databaseInitializer.initializeDatabase();
	}
}