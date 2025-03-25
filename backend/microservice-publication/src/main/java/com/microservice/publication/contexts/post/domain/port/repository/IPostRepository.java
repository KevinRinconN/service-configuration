package com.microservice.publication.contexts.post.domain.port.repository;

import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostSearchParams;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface IPostRepository {
    Optional<PostDto> findById(Long id);
    Page<PostDto> findByUserIdNot(PostSearchParams searchParams);
    PostDto create(PostDto postDto);
    void delete(PostDto postDto);
}
