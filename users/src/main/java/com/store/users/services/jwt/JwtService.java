package com.store.users.services.jwt;

import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtService {
	public String createToken(String userName, long expiration, String secret) {
		Date now = new Date(System.currentTimeMillis());
		Date time = new Date(System.currentTimeMillis() + expiration);

		return Jwts.builder().setSubject(userName).setExpiration(time).setIssuedAt(now)
				.signWith(SignatureAlgorithm.ES512, secret.getBytes()).compact();
	}

	private Claims extractClaims(String jwtToken, String secret) {
		return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(jwtToken).getBody();
	}

	public Boolean isNotTokenExpired(String jwtToken, String secret) {
		Claims claims = extractClaims(jwtToken, secret);
		Date now = new Date(System.currentTimeMillis());
		return claims.getExpiration().before(now);
	}

	public String extractUsername(String jwtToken, String secret) {
		Claims claims = extractClaims(jwtToken, secret);
		String userName = claims.getSubject();
		return userName;
	}

	public Boolean validateToken(String jwtToken, String secret, String usernName) {
		String subject = extractUsername(jwtToken, secret);
		return (subject.equals(usernName) && isNotTokenExpired(jwtToken, secret));
	}
}