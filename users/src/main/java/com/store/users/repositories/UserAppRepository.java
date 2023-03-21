package com.store.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.users.entities.UserApp;

public interface UserAppRepository extends JpaRepository<UserApp, Long> {
}