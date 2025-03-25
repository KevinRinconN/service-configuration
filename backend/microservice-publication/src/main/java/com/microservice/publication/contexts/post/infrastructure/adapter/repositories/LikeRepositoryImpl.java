package com.microservice.publication.contexts.post.infrastructure.adapter.repositories;

import com.microservice.publication.contexts.post.domain.model.dto.LikeDto;
import com.microservice.publication.contexts.post.domain.port.repository.ILikeRepository;
import com.microservice.publication.contexts.post.infrastructure.adapter.mapper.LikeMapperDbo;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.LikeEntity;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa.ILikeJpaRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LikeRepositoryImpl implements ILikeRepository {
    private final ILikeJpaRepository iLikeJpaRepository;
    private final LikeMapperDbo likeMapperDbo;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<LikeDto> findByUserId(String userId) {
        var optionalLike = iLikeJpaRepository.findByUserId(userId);
        return optionalLike.stream().map(likeMapperDbo::toDomain).collect(Collectors.toList());
    }

    @Override
    public boolean existsByUserIdAndPost_Id(String userId, Long postId) {
        return iLikeJpaRepository.existsByUserIdAndPost_Id(userId, postId);
    }

    @Override
    public Optional<LikeDto> findByUserIdAndPost_Id(String userId, Long postId) {
        var optionalLike = iLikeJpaRepository.findByUserIdAndPost_Id(userId, postId);
        return optionalLike.map(likeMapperDbo::toDomain);
    }

    @Override
    public void delete(Long id) {
        LikeEntity like = iLikeJpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like no encontrado con ID: " + id));

        PostEntity post = like.getPost();
        if (post != null) {
            post.getLikes().remove(like);
        }

        iLikeJpaRepository.delete(like);
        iLikeJpaRepository.flush();
    }

    @Override
    public LikeDto create(LikeDto likeDto) {
        LikeEntity savedLike = iLikeJpaRepository.save(likeMapperDbo.toDbo(likeDto));
        entityManager.clear(); // 🔥 Limpia la caché
        return likeMapperDbo.toDomain(savedLike);
    }
}
