package com.store.users.security.roles;

import com.store.users.entities.CredentialApp;

public class RoleTranslator {
	public Roles translate(CredentialApp credential) {
		if (credential == null) {
			return Roles.ROLE_NONROOT;
		} else {
			return Roles.ROLE_ROOT;
		}
	}
}