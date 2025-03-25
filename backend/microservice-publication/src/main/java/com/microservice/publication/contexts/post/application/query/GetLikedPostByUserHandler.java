package com.microservice.publication.contexts.post.application.query;

import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.services.GetLikedPostByUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetLikedPostByUserHandler {
    private final GetLikedPostByUserService getLikedPostByUserService;

    public List<PostResponseDto> execute (String user, String username){
        return getLikedPostByUserService.execute(user, username);
    }
}
