package com.microservice.publication.contexts.post.domain.model.dto;

import com.microservice.common.utils.dto.PaginationParams;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class PostSearchParams extends PaginationParams {

    private String userId;
    private String likedBy;

    public PostSearchParams( int page, int size, String sort, String userId, String likedBy) {
        super(page, size, sort);
        this.userId = userId;
        this.likedBy = likedBy;
    }
}
