package com.microservice.publication.contexts.post.infrastructure.adapter.mapper;

import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
@Component
public interface PostMapperDbo {
    PostDto toDomain (PostEntity entity);
    PostEntity toDbo (PostDto dto);
}
