package com.microservice.publication.contexts.post.domain.model.dto;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class LikeDto {
    private Long id;

    private String userId;
    private PostDto post;
}
