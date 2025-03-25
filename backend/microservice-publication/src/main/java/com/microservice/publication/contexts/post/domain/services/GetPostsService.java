package com.microservice.publication.contexts.post.domain.services;

import com.microservice.publication.contexts.post.domain.mapper.PostMapper;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostSearchParams;
import com.microservice.publication.contexts.post.domain.usecases.GetOtherUserPost;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;

@RequiredArgsConstructor
public class GetPostsService {
    private final GetOtherUserPost otherUserPosts;

    public Page<PostResponseDto> execute (String username, PostSearchParams postSearchParams){
        return otherUserPosts.execute(postSearchParams)
                .map(postDto -> PostMapper.INSTANCE.toShow(postDto, username));
    }
}
