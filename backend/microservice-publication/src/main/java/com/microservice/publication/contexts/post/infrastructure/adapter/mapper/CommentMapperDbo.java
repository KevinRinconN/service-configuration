package com.microservice.publication.contexts.post.infrastructure.adapter.mapper;

import com.microservice.publication.contexts.post.domain.model.dto.CommentDto;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.CommentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
@Component
public interface CommentMapperDbo {

    @Mapping(target = "user.username", source = "userId")
    CommentDto toDomain(CommentEntity entity);

    @Mapping(target = "userId", source = "user.username")
    CommentEntity toDbo(CommentDto dto);
}
