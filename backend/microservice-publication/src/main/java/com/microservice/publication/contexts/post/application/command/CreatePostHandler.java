package com.microservice.publication.contexts.post.application.command;

import com.microservice.publication.contexts.post.domain.model.dto.CreatePostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.services.CreatePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreatePostHandler {
    private final CreatePostService createPostService;

    public PostResponseDto execute (CreatePostDto createPostDto){
        return createPostService.execute(createPostDto);
    }

}
