package com.microservice.publication.contexts.post.domain.port.repository;

import com.microservice.publication.contexts.post.domain.model.dto.LikeDto;

import java.util.List;
import java.util.Optional;

public interface ILikeRepository {
    List<LikeDto> findByUserId(String userId);
    boolean existsByUserIdAndPost_Id(String userId, Long postId);
    Optional<LikeDto> findByUserIdAndPost_Id(String userId, Long postId);
    void delete(Long id);
    LikeDto create(LikeDto likeDto);
 }
