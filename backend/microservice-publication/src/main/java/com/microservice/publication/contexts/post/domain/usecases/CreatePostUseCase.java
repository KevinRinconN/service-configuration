package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.common.utils.responseHandler.ResponseFormat;
import com.microservice.publication.contexts.post.domain.model.dto.CreatePostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import com.microservice.publication.contexts.shared.user.domain.model.dto.UserDto;
import com.microservice.publication.contexts.shared.user.domain.model.port.UserServiceClient;
import com.microservice.publication.contexts.shared.user.domain.model.usecases.GetUserByIdUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CreatePostUseCase {
    private final IPostRepository iPostRepository;
    private final GetUserByIdUseCase getUserByIdUseCase;

    public PostDto execute (CreatePostDto createPostDto){

        UserDto user = getUserByIdUseCase.execute(createPostDto.getUserId());

        PostDto newPost = PostDto.builder()
                .content(createPostDto.getContent())
                .userId(user.getUsername())
                .build();

        return iPostRepository.create(newPost);
    }
}
