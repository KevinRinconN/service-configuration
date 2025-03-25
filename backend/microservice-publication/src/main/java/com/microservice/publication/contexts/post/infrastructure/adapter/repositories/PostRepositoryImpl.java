package com.microservice.publication.contexts.post.infrastructure.adapter.repositories;

import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostSearchParams;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import com.microservice.publication.contexts.post.infrastructure.adapter.mapper.PostMapperDbo;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import com.microservice.publication.contexts.post.infrastructure.adapter.repositories.jpa.IPostJpaRepository;
import com.microservice.publication.contexts.post.infrastructure.adapter.specifications.PostSpecification;
import com.microservice.publication.contexts.shared.utils.SortUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements IPostRepository {

    private final IPostJpaRepository iPostJpaRepository;
    private final PostMapperDbo postMapperDbo;

    @Override
    @Transactional
    public Optional<PostDto> findById(Long id) {
        Optional<PostEntity> optionalPost = iPostJpaRepository.findById(id);
        return optionalPost.map(postMapperDbo::toDomain);
    }

    @Override
    @Transactional
    public Page<PostDto> findByUserIdNot(PostSearchParams params) {
        Pageable pageable = PageRequest.of(params.getPage(), params.getSize(), SortUtils.createSort(params.getSort()));
        Specification<PostEntity> postSpecification = Specification
                .where(PostSpecification.hasUser(params.getUserId()));

        if (params.getLikedBy() != null) {
            postSpecification = postSpecification.and(PostSpecification.hasLikedByUser(params.getLikedBy()));
        }
        Page<PostEntity> posts = iPostJpaRepository.findAll(postSpecification,pageable);
        return posts.map(postMapperDbo::toDomain);
    }

    @Override
    public PostDto create(PostDto postDto) {
        return postMapperDbo.toDomain(iPostJpaRepository.save(postMapperDbo.toDbo(postDto)));
    }

    @Override
    public void delete(PostDto postDto) {
        iPostJpaRepository.delete(postMapperDbo.toDbo(postDto));
    }
}
