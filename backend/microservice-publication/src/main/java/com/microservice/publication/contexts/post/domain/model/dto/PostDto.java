package com.microservice.publication.contexts.post.domain.model.dto;

import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.LikeEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data @Builder
public class PostDto {
    private Long id;
    private String content;
    private String userId;
    private LocalDateTime createdAt;
    private List<JustLikeDto> likes;
    private List<JustCommentDto> comments;

    public boolean likedByUser(String currentUserId) {
        return likes != null && likes.stream().anyMatch(like -> like.getUserId().equals(currentUserId));
    }
}
