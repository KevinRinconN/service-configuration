package com.microservice.publication.contexts.post.domain.services;

import com.microservice.publication.contexts.post.domain.mapper.CommentMapper;
import com.microservice.publication.contexts.post.domain.model.dto.CommentResponseDto;
import com.microservice.publication.contexts.post.domain.usecases.GetCommentsByPostUseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class GetCommentByPostService {
    private final GetCommentsByPostUseCase getCommentsByPostUseCase;

    public List<CommentResponseDto> execute (Long postId){
        return getCommentsByPostUseCase.execute(postId).stream().map(CommentMapper.INSTANCE::toShow).collect(Collectors.toList());
    }
}
