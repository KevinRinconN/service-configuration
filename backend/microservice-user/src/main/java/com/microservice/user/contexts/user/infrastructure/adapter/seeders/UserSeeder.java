package com.microservice.user.contexts.user.infrastructure.adapter.seeders;

import com.microservice.user.contexts.user.domain.model.enums.Rol;
import com.microservice.user.contexts.user.infrastructure.adapter.persistence.entities.User;
import com.microservice.user.contexts.user.infrastructure.adapter.repositories.jpa.IUserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {
    private final IUserJpaRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) { // Evita duplicados
            List<User> users = List.of(
                    new User("CarlosG", "Carlos", "Gómez", passwordEncoder.encode("admin123"), Rol.ADMIN, "carlos.gomez@example.com", "Administrador del sistema con más de 10 años de experiencia.", generateRandomProfilePicture()),
                    new User("Lopez234", "Mariana", "López", passwordEncoder.encode("password"), Rol.OPERATOR, "mariana.lopez@example.com", "Amante de la tecnología y desarrolladora backend.", generateRandomProfilePicture()),
                    new User("LuisRamirez", "Luis", "Ramírez", passwordEncoder.encode("password"), Rol.OPERATOR, "luis.ramirez@example.com", "Ingeniero de software con pasión por la inteligencia artificial.", generateRandomProfilePicture()),
                    new User("Andreita", "Andrea", "Fernández", passwordEncoder.encode("password"), Rol.OPERATOR, "andrea.fernandez@example.com", "Diseñadora UX/UI con más de 5 años creando experiencias digitales.", generateRandomProfilePicture()),
                    new User("Torres04", "Fernando", "Torres", passwordEncoder.encode("password"), Rol.OPERATOR, "fernando.torres@example.com", "Apasionado del desarrollo móvil y nuevas tecnologías.", generateRandomProfilePicture())
            );

            userRepository.saveAll(users);
            System.out.println("📌 Usuarios de prueba creados.");
        }
    }

    private String generateRandomProfilePicture() {
        String gender = Math.random() > 0.5 ? "women" : "men";
        int id = (int) (Math.random() * 100);
        return "https://randomuser.me/api/portraits/" + gender + "/" + id + ".jpg";
    }
}
