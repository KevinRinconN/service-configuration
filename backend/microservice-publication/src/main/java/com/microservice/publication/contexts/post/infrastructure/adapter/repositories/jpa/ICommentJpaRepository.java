package com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa;

import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICommentJpaRepository extends JpaRepository<CommentEntity, Long> {
    List<CommentEntity> findByPostId(Long postId);
}
