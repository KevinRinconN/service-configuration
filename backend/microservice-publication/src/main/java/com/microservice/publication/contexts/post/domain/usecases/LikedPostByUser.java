package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.publication.contexts.post.domain.model.dto.LikeDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.port.repository.ILikeRepository;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class LikedPostByUser {
    private final ILikeRepository iLikeRepository;

    public List<PostDto> execute (String username){
        List<LikeDto> posts =  iLikeRepository.findByUserId(username);
        return posts.stream().map(LikeDto::getPost).collect(Collectors.toList());
    }
}
