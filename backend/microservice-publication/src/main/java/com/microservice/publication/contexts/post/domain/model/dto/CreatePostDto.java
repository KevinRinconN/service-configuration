package com.microservice.publication.contexts.post.domain.model.dto;

import lombok.Data;

@Data
public class CreatePostDto {
    private String content;
    private String userId;
}
