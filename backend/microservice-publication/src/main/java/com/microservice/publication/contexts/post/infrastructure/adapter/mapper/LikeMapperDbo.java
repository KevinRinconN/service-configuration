package com.microservice.publication.contexts.post.infrastructure.adapter.mapper;

import com.microservice.publication.contexts.post.domain.model.dto.LikeDto;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.LikeEntity;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
@Component
public interface LikeMapperDbo {

    LikeDto toDomain(LikeEntity entity);
    LikeEntity toDbo(LikeDto dto);
}
