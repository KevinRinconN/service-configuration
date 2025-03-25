package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DeletePostUseCase {
    private final IPostRepository iPostRepository;
    private final PostGetByIdUseCase postGetByIdUseCase;

    public void execute (Long id){
        PostDto postToDelete = postGetByIdUseCase.execute(id);
        iPostRepository.delete(postToDelete);
    }
}
