package com.microservice.publication.contexts.post.application.command;

import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.services.LikePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ToggleLikeToPostHandler {
    private final LikePostService likePostService;

    public PostResponseDto execute (String username,  Long postId){
        return likePostService.execute(username, postId);
    }
}
