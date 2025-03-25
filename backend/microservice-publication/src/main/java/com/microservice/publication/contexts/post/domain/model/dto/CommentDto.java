package com.microservice.publication.contexts.post.domain.model.dto;

import com.microservice.publication.contexts.shared.user.domain.model.dto.UserDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data @Builder
public class CommentDto {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private UserDto user;
    private PostDto post;
}
