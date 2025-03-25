package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostSearchParams;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;

@RequiredArgsConstructor
public class GetOtherUserPost {
    private final IPostRepository iPostRepository;

    public Page<PostDto> execute(PostSearchParams postSearchParams){
        Page<PostDto> posts =  iPostRepository.findByUserIdNot(postSearchParams);
        return posts;
    }

}
