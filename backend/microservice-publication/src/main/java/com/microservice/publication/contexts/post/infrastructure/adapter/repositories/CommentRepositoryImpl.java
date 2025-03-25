package com.microservice.publication.contexts.post.infrastructure.adapter.repositories;

import com.microservice.publication.contexts.post.domain.model.dto.CommentDto;
import com.microservice.publication.contexts.post.domain.port.repository.ICommentRepository;
import com.microservice.publication.contexts.post.infrastructure.adapter.mapper.CommentMapperDbo;
import com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa.ICommentJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements ICommentRepository {

    private final ICommentJpaRepository iCommentJpaRepository;
    private final CommentMapperDbo commentMapperDbo;

    @Override
    public CommentDto save(CommentDto commentDto) {
        return commentMapperDbo.toDomain(iCommentJpaRepository.save(commentMapperDbo.toDbo(commentDto)));
    }

    @Override
    public List<CommentDto> getCommentsByPost(Long postId) {
        return iCommentJpaRepository.findByPostId(postId).stream()
                .map(commentMapperDbo::toDomain).collect(Collectors.toList());
    }
}
