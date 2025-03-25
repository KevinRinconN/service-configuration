package com.microservice.publication.contexts.post.domain.mapper;

import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.model.dto.UserPostDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PostMapper {
    PostMapper INSTANCE =  Mappers.getMapper( PostMapper.class );

    @Mapping(target = "user.username", source = "dto.userId")
    @Mapping(target = "likes", expression = "java(dto.getLikes() != null ? dto.getLikes().size() : 0)")
    @Mapping(target = "comments", expression = "java(dto.getComments() != null ? dto.getComments().size() : 0)")
    @Mapping(target = "likedByUser", expression = "java(dto.likedByUser(currentUserId))")
    @Mapping(target = "createdAtFormatted", source = "dto.createdAt", qualifiedByName = "formatDate")
    PostResponseDto toShow(PostDto dto, String currentUserId);

//    @Named("mapUser")
//    default UserPostDto mapUser(String userId) {
//        UserPostDto user = new UserPostDto();
//        user.setUsername(userId);
//        return user;
//    }

    @Named("formatDate")
    default String formatDate(String createdAt) {
        if (createdAt == null || createdAt.isEmpty()) return null;
        LocalDateTime date = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
        return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
