package com.microservice.publication.contexts.post.domain.services;

import com.microservice.publication.contexts.post.domain.mapper.PostMapper;
import com.microservice.publication.contexts.post.domain.model.dto.CreatePostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.usecases.CreatePostUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CreatePostService {
    private final CreatePostUseCase createPostUseCase;

    public PostResponseDto execute (CreatePostDto createPostDto){
        return PostMapper.INSTANCE.toShow(createPostUseCase.execute(createPostDto), createPostDto.getUserId());
    }
}
