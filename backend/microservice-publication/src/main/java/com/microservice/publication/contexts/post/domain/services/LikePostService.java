package com.microservice.publication.contexts.post.domain.services;

import com.microservice.publication.contexts.post.domain.mapper.PostMapper;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.usecases.LikePostUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LikePostService {
    private final LikePostUseCase likePostUseCase;

    public PostResponseDto execute(String username, Long postId){
        return PostMapper.INSTANCE.toShow(likePostUseCase.execute(username, postId), username);
    }
}
