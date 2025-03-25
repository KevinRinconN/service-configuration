package com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa;

import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IPostJpaRepository extends JpaRepository<PostEntity, Long>, JpaSpecificationExecutor<PostEntity> {
    Page<PostEntity> findByUserIdNot(String userId, Pageable pageable);
}
