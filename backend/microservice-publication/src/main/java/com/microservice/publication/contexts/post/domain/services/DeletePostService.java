package com.microservice.publication.contexts.post.domain.services;

import com.microservice.publication.contexts.post.domain.usecases.DeletePostUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DeletePostService {
    private final DeletePostUseCase deletePostUseCase;

    public void execute(Long postId){
        deletePostUseCase.execute(postId);
    }
}
