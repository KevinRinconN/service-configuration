package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.publication.contexts.post.domain.model.dto.AddCommentDto;
import com.microservice.publication.contexts.post.domain.model.dto.CommentDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.port.repository.ICommentRepository;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import com.microservice.publication.contexts.shared.user.domain.model.dto.UserDto;
import com.microservice.publication.contexts.shared.user.domain.model.usecases.GetUserByIdUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AddCommentUseCase {
    private final PostGetByIdUseCase postGetByIdUseCase;
    private final GetUserByIdUseCase getUserByIdUseCase;
    private final ICommentRepository iCommentRepository;

    public CommentDto execute (String username, Long postId, AddCommentDto commentDto){
        PostDto post = postGetByIdUseCase.execute(postId);
        UserDto user = getUserByIdUseCase.execute(username);

        CommentDto newComment = CommentDto.builder()
                .content(commentDto.getContent())
                .post(post)
                .user(user)
                .build();

        newComment = iCommentRepository.save(newComment);
        newComment.setUser(user);
        return newComment;
    }
}
