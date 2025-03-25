package com.microservice.publication.contexts.post.infrastructure.rest.controller;

import com.microservice.common.utils.responseHandler.ResponseHandler;
import com.microservice.publication.contexts.post.application.command.CreatePostHandler;
import com.microservice.publication.contexts.post.application.command.DeletePostHandler;
import com.microservice.publication.contexts.post.application.command.ToggleLikeToPostHandler;
import com.microservice.publication.contexts.post.application.query.GetLikedPostByUserHandler;
import com.microservice.publication.contexts.post.application.query.GetPostByUsernameHandler;
import com.microservice.publication.contexts.post.application.query.GetPostsHandler;
import com.microservice.publication.contexts.post.domain.model.dto.CreatePostDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostResponseDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostSearchParams;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

    private final GetPostsHandler getPostsHandler;
    private final GetPostByUsernameHandler getPostByUsernameHandler;
    private final GetLikedPostByUserHandler getLikedPostByUserHandler;
    private final CreatePostHandler createPostHandler;
    private final DeletePostHandler deletePostHandler;
    private final ToggleLikeToPostHandler toggleLikeToPostHandler;


    @GetMapping
    public ResponseHandler<Page<PostResponseDto>> search (@RequestHeader("X-User-Id") String user,
                                                          @RequestParam(required = false) String username,
                                                          @RequestParam(required = false) boolean liked,
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "10") int size,
                                                          @RequestParam(defaultValue = "id,asc") String sort){
        PostSearchParams params = new PostSearchParams(page,size,sort, username, liked ? user : null);
        return ResponseHandler.success("Posts data successfully", getPostsHandler.execute(user,params));
    }

    @GetMapping("/liked/{username}")
    public ResponseHandler<List<PostResponseDto>> getLikedPosts (@RequestHeader("X-User-Id") String user, @PathVariable String username){
        return ResponseHandler.success("Posts data successfully", getLikedPostByUserHandler.execute(user, username));
    }

    @PostMapping
    public ResponseHandler<PostResponseDto> createPost (@RequestBody CreatePostDto createPostDto){
        return ResponseHandler.response("Post created successfully", HttpStatus.CREATED, createPostHandler.execute(createPostDto));
    }

    @DeleteMapping("/{postId}")
    public ResponseHandler<Void> deletePost (@PathVariable Long postId){
        deletePostHandler.execute(postId);
        return ResponseHandler.success("Post deleted successfully");
    }

    @PutMapping("/{postId}/like")
    public ResponseHandler<PostResponseDto> likedPost (@PathVariable Long postId, @RequestHeader("X-User-Id") String username){
        return ResponseHandler.success("", toggleLikeToPostHandler.execute(username, postId));
    }

}
