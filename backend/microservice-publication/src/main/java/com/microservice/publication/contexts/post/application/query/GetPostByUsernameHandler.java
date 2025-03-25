package com.microservice.publication.contexts.post.application.query;

import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostSearchParams;
import com.microservice.publication.contexts.post.domain.services.GetLikedPostByUserService;
import com.microservice.publication.contexts.post.domain.services.GetPostByUsernameService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetPostByUsernameHandler {
    private final GetPostByUsernameService getPostByUsernameService;

    public Page<PostResponseDto> execute ( String username, PostSearchParams searchParams){
        return getPostByUsernameService.execute(username, searchParams);
    }
}
