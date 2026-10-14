import com.saferoute.backend.service.JwtService;

import com.saferoute.backend.entity.User;
import com.saferoute.backend.repository.UserRepository;
import com.saferoute.backend.service.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User user) {

        User existingUser =
                userRepository
                        .findByEmail(user.getEmail())
                        .orElse(null);

        if (existingUser == null) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        String storedPassword =
                existingUser.getPassword();

        boolean passwordMatches = false;

        if (storedPassword != null &&
                (storedPassword.startsWith("$2a$") ||
                 storedPassword.startsWith("$2b$") ||
                 storedPassword.startsWith("$2y$"))) {

            passwordMatches =
                    passwordEncoder.matches(
                            user.getPassword(),
                            storedPassword
                    );

        } else {

            passwordMatches =
                    storedPassword != null &&
                    storedPassword.equals(
                            user.getPassword()
                    );

            if (passwordMatches) {

                existingUser.setPassword(
                        passwordEncoder.encode(
                                user.getPassword()
                        )
                );

                userRepository.save(existingUser);
            }
        }

        if (!passwordMatches) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        String token =
                jwtService.generateToken(
                        existingUser.getEmail()
                );

        return ResponseEntity.ok(
                new LoginResponse(
                        "Login successful",
                        token,
                        existingUser.getName(),
                        existingUser.getEmail()
                )
        );
    }

    public record LoginResponse(
            String message,
            String token,
            String name,
            String email
    ) {
    }
}