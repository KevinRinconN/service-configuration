package com.microservice.publication.contexts.post.infrastructure.adapter.seeders;

import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.LikeEntity;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa.ILikeJpaRepository;
import com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa.IPostJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class LikeSeeder implements CommandLineRunner {
    private final ILikeJpaRepository likeRepository;
    private final IPostJpaRepository postRepository;
    private final Random random = new Random();

    public void run(String... args) {
        if (likeRepository.count() == 0) { // Evita duplicados en la BD
            List<PostEntity> posts = postRepository.findAll();

            if (posts.isEmpty()) {
                System.out.println("⚠️ No se encontraron posts. Ejecuta los seeders correspondientes primero.");
                return;
            }

            List<LikeEntity> likes = new ArrayList<>();
            List<String> users = List.of("CarlosG", "Lopez234", "LuisRamirez", "Andreita", "Torres04");

            // 📌 Usamos un Set para evitar duplicados antes de guardar
            Set<String> uniqueLikes = new HashSet<>();

            while (likes.size() < 50) { // 🔥 Hasta 50 likes en total
                PostEntity randomPost = posts.get(random.nextInt(posts.size()));
                String randomUser = users.get(random.nextInt(users.size()));

                String likeKey = randomUser + "-" + randomPost.getId();

                // Verificar que no exista en la BD ni en la lista actual
                if (!uniqueLikes.contains(likeKey) && !likeRepository.existsByUserIdAndPost_Id(randomUser, randomPost.getId())) {
                    LikeEntity like = new LikeEntity(null, randomUser, randomPost);
                    likes.add(like);
                    uniqueLikes.add(likeKey); // Lo agregamos al Set para evitar duplicados
                }
            }

            likeRepository.saveAll(likes);
            System.out.println("✅ 50 likes aleatorios creados correctamente.");
        }
    }
}
