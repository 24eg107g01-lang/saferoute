import com.saferoute.backend.service.JwtService;

import com.saferoute.backend.entity.User;
import com.saferoute.backend.repository.UserRepository;
import com.saferoute.backend.service.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://saferoute-lemon.vercel.app"
})
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null
                || email.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest().body(
                Map.of("message", "Email and password are required")
            );
        }

        Optional<User> result = userRepository.findByEmail(email);

        if (result.isEmpty()
                || !passwordEncoder.matches(
                    password, result.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("message", "Invalid email or password")
            );
        }

        User user = result.get();
        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
            "token", token,
            "name", user.getName() == null ? "" : user.getName(),
            "email", user.getEmail()
        ));
    }
}
