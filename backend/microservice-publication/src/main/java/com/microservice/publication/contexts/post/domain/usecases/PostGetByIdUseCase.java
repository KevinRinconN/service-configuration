package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.common.utils.exception.NotFoundException;
import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PostGetByIdUseCase {
    private final IPostRepository iPostRepository;

    public PostDto execute(Long id){
        return iPostRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Publicación no encontrada."));
    }
}
