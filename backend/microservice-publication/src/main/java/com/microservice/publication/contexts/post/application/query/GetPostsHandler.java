package com.microservice.publication.contexts.post.application.query;

import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostSearchParams;
import com.microservice.publication.contexts.post.domain.services.GetPostsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetPostsHandler {
    private final GetPostsService getPostsService;

    public Page<PostResponseDto> execute (String username, PostSearchParams searchParams){
     return getPostsService.execute(username, searchParams);
    }
}
