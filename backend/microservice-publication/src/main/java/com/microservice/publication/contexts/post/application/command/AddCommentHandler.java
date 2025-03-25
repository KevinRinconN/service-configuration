package com.microservice.publication.contexts.post.application.command;

import com.microservice.publication.contexts.post.domain.model.dto.AddCommentDto;
import com.microservice.publication.contexts.post.domain.model.dto.CommentResponseDto;
import com.microservice.publication.contexts.post.domain.services.AddCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AddCommentHandler {
    private final AddCommentService addCommentService;

    public CommentResponseDto execute (String username, Long postId, AddCommentDto commentDto){
        return addCommentService.execute(username, postId, commentDto);
    }
}
