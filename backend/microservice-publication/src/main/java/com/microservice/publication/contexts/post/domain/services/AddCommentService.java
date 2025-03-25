package com.microservice.publication.contexts.post.domain.services;

import com.microservice.publication.contexts.post.domain.mapper.CommentMapper;
import com.microservice.publication.contexts.post.domain.model.dto.AddCommentDto;
import com.microservice.publication.contexts.post.domain.model.dto.CommentResponseDto;
import com.microservice.publication.contexts.post.domain.usecases.AddCommentUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AddCommentService {
    private final AddCommentUseCase addCommentUseCase;

    public CommentResponseDto execute (String username, Long postId, AddCommentDto commentDto){
        return CommentMapper.INSTANCE.toShow(addCommentUseCase.execute(username, postId, commentDto));
    }
}
