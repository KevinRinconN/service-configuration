package com.microservice.publication.contexts.post.domain.mapper;

import com.microservice.publication.contexts.post.domain.model.dto.CommentDto;
import com.microservice.publication.contexts.post.domain.model.dto.CommentResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CommentMapper {
    CommentMapper INSTANCE =  Mappers.getMapper( CommentMapper.class );

    @Mapping(target = "createdAtFormatted", source = "createdAt", qualifiedByName = "formatDate")
    CommentResponseDto toShow (CommentDto dto);

    @Named("formatDate")
    default String formatDate(String createdAt) {
        if (createdAt == null || createdAt.isEmpty()) return null;
        LocalDateTime date = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
        return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
