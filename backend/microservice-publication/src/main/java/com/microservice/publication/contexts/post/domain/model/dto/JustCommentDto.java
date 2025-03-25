package com.microservice.publication.contexts.post.domain.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JustCommentDto {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
}
