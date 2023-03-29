package com.store.users.security.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.store.users.security.adapters.UserDetailsServiceImpl;
import com.store.users.services.jwt.HeaderService;
import com.store.users.services.jwt.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	private final String secret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

	@Autowired
	private JwtService jwtService;
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private HeaderService headerService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = headerService.extractHeader(request, "Authorization");
		String jwtToken = headerService.extractJwtToken(header);

		if (jwtToken != null) {
			String userName = jwtService.extractUsername(jwtToken, secret);
			if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
				if (jwtService.validateToken(jwtToken, secret, userName)) {
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
		}

		filterChain.doFilter(request, response);
	}
}