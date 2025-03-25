package com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa;

import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ILikeJpaRepository extends JpaRepository<LikeEntity, Long> {
    List<LikeEntity> findByPost_Id(Long postId);
    Optional<LikeEntity> findByUserIdAndPost_Id(String userId, Long postId);
    List<LikeEntity> findByUserId(String username);
    boolean existsByUserIdAndPost_Id(String userId, Long postId);
}
