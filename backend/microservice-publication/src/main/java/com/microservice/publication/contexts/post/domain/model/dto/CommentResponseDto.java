package com.microservice.publication.contexts.post.domain.model.dto;

import com.microservice.publication.contexts.shared.user.domain.model.dto.UserDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class CommentResponseDto {
    private Long id;
    private String content;
    private String createdAtFormatted;
    private UserPostDto user;
}
