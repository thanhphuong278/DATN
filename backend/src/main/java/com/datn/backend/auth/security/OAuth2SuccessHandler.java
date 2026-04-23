package com.datn.backend.auth.security;

import com.datn.backend.auth.entity.AuthAccount;
import com.datn.backend.auth.entity.User;
import com.datn.backend.auth.repository.AuthAccountRepository;
import com.datn.backend.auth.repository.UserRepository;
import com.datn.backend.common.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepo;
    private final AuthAccountRepository accRepo;
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user = userRepo.findByEmail(email).orElse(null);

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setUsername(email);
            user.setFullName(name);
            user.setRole("USER");
            user.setIsVerified(true);
            userRepo.save(user);

            AuthAccount acc = new AuthAccount();
            acc.setUserId(user.getId());
            acc.setProvider("GOOGLE");
            acc.setPassword("");
            accRepo.save(acc);
        }

        String accessToken = jwtUtil.generateToken(user.getId(), user.getRole());

        response.sendRedirect(
                "http://localhost:3000/oauth2-success?accessToken=" + accessToken
        );
    }
}
