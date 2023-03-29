package com.store.users.services.credential;

import org.springframework.stereotype.Service;

import com.store.users.entities.CredentialApp;

@Service
public class CredentialAppValidatorService {
	public boolean isCredentialValid(CredentialApp credential) {
		boolean validation = false;
		if (credential != null) {
			if ((credential.getUserName() != null) && (credential.getPassword() != null)) {
				if (!credential.getUserName().isBlank() && !credential.getPassword().isBlank()) {
					validation = true;
				}
			}
		}
		return validation;
	}
}