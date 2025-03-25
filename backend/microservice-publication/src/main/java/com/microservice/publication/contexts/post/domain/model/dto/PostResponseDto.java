package com.microservice.publication.contexts.post.domain.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostResponseDto {
    private Long id;
    private String content;
    private UserPostDto user;
    private Integer likes;
    private Integer comments;

    private String createdAtFormatted;
    private boolean likedByUser;
}
