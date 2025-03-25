package com.microservice.publication.contexts.post.application.command;

import com.microservice.publication.contexts.post.domain.services.DeletePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DeletePostHandler {
    private final DeletePostService deletePostService;

    public void execute (Long postId){
        deletePostService.execute(postId);
    }
}
