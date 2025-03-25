package com.microservice.publication.contexts.post.domain.services;

import com.microservice.publication.contexts.post.domain.mapper.PostMapper;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.usecases.LikedPostByUser;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class GetLikedPostByUserService {
    private final LikedPostByUser likedPostByUser;

    public List<PostResponseDto> execute (String user, String username){
        return likedPostByUser.execute(username).stream()
                .map(postDto -> PostMapper.INSTANCE.toShow(postDto, user))
                .collect(Collectors.toList());
    }
}
