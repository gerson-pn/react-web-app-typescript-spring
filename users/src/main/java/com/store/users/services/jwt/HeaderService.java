package com.store.users.services.jwt;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class HeaderService {
	public String extractHeader(HttpServletRequest request, String name) {
		return request.getHeader(name);
	}

	public String extractJwtToken(String header) {
		String jwtToken = null;
		if (header != null) {
			if (header.startsWith("Bearer ")) {
				jwtToken = header.substring(7);
			}
		}
		return jwtToken;
	}
}