package com.microservice.publication.contexts.post.domain.port.repository;

import com.microservice.publication.contexts.post.domain.model.dto.CommentDto;

import java.util.List;

public interface ICommentRepository {
    CommentDto save(CommentDto commentDto);
    List<CommentDto> getCommentsByPost(Long postId);
}
