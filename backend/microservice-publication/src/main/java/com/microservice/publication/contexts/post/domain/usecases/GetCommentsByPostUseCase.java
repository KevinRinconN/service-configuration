package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.publication.contexts.post.domain.model.dto.CommentDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.port.repository.ICommentRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class GetCommentsByPostUseCase {
    private final PostGetByIdUseCase postGetByIdUseCase;
    private final ICommentRepository iCommentRepository;

    public List<CommentDto> execute (Long postId){
        PostDto post = postGetByIdUseCase.execute(postId);
        return iCommentRepository.getCommentsByPost(post.getId());
    }
}
