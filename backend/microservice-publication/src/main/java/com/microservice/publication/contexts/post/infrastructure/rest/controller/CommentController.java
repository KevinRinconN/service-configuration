package com.microservice.publication.contexts.post.infrastructure.rest.controller;

import com.microservice.common.utils.responseHandler.ResponseHandler;
import com.microservice.publication.contexts.post.application.command.AddCommentHandler;
import com.microservice.publication.contexts.post.application.query.GetCommentByPostHandler;
import com.microservice.publication.contexts.post.domain.model.dto.AddCommentDto;
import com.microservice.publication.contexts.post.domain.model.dto.CommentResponseDto;
import com.microservice.publication.contexts.post.domain.model.dto.CreatePostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final AddCommentHandler addCommentHandler;
    private final GetCommentByPostHandler getCommentByPostHandler;

    @PostMapping("/post/{id}")
    public ResponseHandler<CommentResponseDto> createPost (@PathVariable Long id,
                                                           @RequestBody AddCommentDto addCommentDto,
                                                           @RequestHeader("X-User-Id") String username){
        return ResponseHandler.response("comment created successfully",
                HttpStatus.CREATED,
                addCommentHandler.execute(username,id,addCommentDto));
    }

    @GetMapping("/post/{id}")
    public ResponseHandler<List<CommentResponseDto>> getCommentsByPost (@PathVariable Long id){
        return ResponseHandler.success("Comment data successfully", getCommentByPostHandler.execute(id));
    }
}
