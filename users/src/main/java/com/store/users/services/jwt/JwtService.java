package com.store.users.services.jwt;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private Key getSignInKey(String secret) {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String createToken(String userName, long expiration, String secret) {
		Date now = new Date(System.currentTimeMillis());
		Date time = new Date(System.currentTimeMillis() + expiration);

		return Jwts.builder().setSubject(userName).setExpiration(time).setIssuedAt(now)
				.signWith(this.getSignInKey(secret), SignatureAlgorithm.HS256).compact();
	}

	private Claims extractClaims(String jwtToken, String secret) {
		return Jwts.parserBuilder().setSigningKey(getSignInKey(secret)).build().parseClaimsJws(jwtToken).getBody();
	}

	public Boolean isNotTokenExpired(String jwtToken, String secret) {
		Claims claims = extractClaims(jwtToken, secret);
		Date now = new Date(System.currentTimeMillis());
		return now.before(claims.getExpiration());
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