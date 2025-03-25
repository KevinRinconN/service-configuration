package com.microservice.publication.contexts.post.application.query;

import com.microservice.publication.contexts.post.domain.model.dto.CommentResponseDto;
import com.microservice.publication.contexts.post.domain.services.GetCommentByPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetCommentByPostHandler {
    private final GetCommentByPostService getCommentByPostService;

    public List<CommentResponseDto> execute (Long postId){
        return getCommentByPostService.execute(postId);
    }
}
