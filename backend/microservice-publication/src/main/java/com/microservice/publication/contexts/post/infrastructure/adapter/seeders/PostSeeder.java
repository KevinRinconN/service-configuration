package com.microservice.publication.contexts.post.infrastructure.adapter.seeders;

import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa.IPostJpaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Order(1)
public class PostSeeder implements CommandLineRunner {
    private final IPostJpaRepository postRepository;

    public PostSeeder(IPostJpaRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void run(String... args) {
        if (postRepository.count() == 0) { // Evita duplicados

            List<PostEntity> posts = List.of(
                    new PostEntity(null, "Este es el contenido del primer post.", "CarlosG",null, null, new ArrayList<>(), new ArrayList<>()),
                    new PostEntity(null,  "Aquí tenemos otro post de prueba.", "Torres04",null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Última publicación de ejemplo.", "Torres04", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null, "Una guía para aprender Java desde cero.", "CarlosG", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Cómo usar Spring Boot para construir APIs.", "Torres04",null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,"Diferencias entre React y Next.js explicadas.", "Andreita",null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Principios básicos de las bases de datos relacionales.", "CarlosG", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Cómo implementar JWT en una API.", "Andreita", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Arquitectura basada en microservicios y sus ventajas.", "Andreita", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Guía rápida para trabajar con Git y GitHub.", "CarlosG",null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Introducción a los patrones de diseño en software.", "LuisRamirez", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Cómo usar Docker para contenerizar aplicaciones.", "LuisRamirez",null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Buenas prácticas para proteger APIs REST.", "CarlosG", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Comparación entre GraphQL y REST para APIs.", "LuisRamirez", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Cómo escribir pruebas unitarias en Java.", "LuisRamirez", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Conceptos básicos de programación funcional.", "CarlosG", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Diferencias clave entre Kotlin y Java.", "Lopez234", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Conceptos esenciales de DevOps.", "Lopez234", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null,  "Cómo empezar con Machine Learning en Python.", "CarlosG", null, null, new ArrayList<>(),new ArrayList<>()),
                    new PostEntity(null, "Implementando la arquitectura limpia en proyectos.", "Lopez234", null, null, new ArrayList<>(),new ArrayList<>())

            );

            postRepository.saveAll(posts);
            System.out.println("✅ Posts de prueba creados correctamente.");
        }
    }
}
