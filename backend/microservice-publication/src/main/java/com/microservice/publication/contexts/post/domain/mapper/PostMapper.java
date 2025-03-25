package com.microservice.publication.contexts.post.domain.mapper;

import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.model.dto.UserPostDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.TemporalAccessor;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PostMapper {
    PostMapper INSTANCE =  Mappers.getMapper( PostMapper.class );

    @Mapping(target = "user.username", source = "dto.userId")
    @Mapping(target = "likes", expression = "java(dto.getLikes() != null ? dto.getLikes().size() : 0)")
    @Mapping(target = "comments", expression = "java(dto.getComments() != null ? dto.getComments().size() : 0)")
    @Mapping(target = "likedByUser", expression = "java(dto.likedByUser(currentUserId))")
    @Mapping(target = "createdAtFormatted", source = "dto.createdAt", qualifiedByName = "formatDate")
    PostResponseDto toShow(PostDto dto, String currentUserId);

    @Named("formatDate")
    default String formatDate(String createdAt) {
        if (createdAt == null || createdAt.isEmpty()) return null;
        try {
            // First try parsing with nanoseconds precision
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd['T'][ ]HH:mm:ss[.SSSSSS]");
            LocalDateTime date = LocalDateTime.parse(createdAt, formatter);
            return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        } catch (DateTimeParseException e1) {
            try {
                // Fallback to ISO_DATE_TIME for standard formats
                TemporalAccessor parsed = DateTimeFormatter.ISO_DATE_TIME.parseBest(
                        createdAt,
                        ZonedDateTime::from,
                        LocalDateTime::from,
                        LocalDate::from
                );

                if (parsed instanceof ZonedDateTime) {
                    return ((ZonedDateTime) parsed).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                } else if (parsed instanceof LocalDateTime) {
                    return ((LocalDateTime) parsed).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                } else {
                    return ((LocalDate) parsed).format(DateTimeFormatter.ofPattern("yyyy-MM-dd 00:00:00"));
                }
            } catch (DateTimeParseException e2) {
                throw new IllegalArgumentException("Could not parse date: " + createdAt, e2);
            }
        }
    }
}
