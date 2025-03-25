package com.microservice.publication.contexts.post.application.bean;

import com.microservice.publication.contexts.post.domain.port.repository.ICommentRepository;
import com.microservice.publication.contexts.post.domain.port.repository.ILikeRepository;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import com.microservice.publication.contexts.post.domain.services.*;
import com.microservice.publication.contexts.post.domain.usecases.*;
import com.microservice.publication.contexts.shared.user.domain.model.port.UserServiceClient;
import com.microservice.publication.contexts.shared.user.domain.model.usecases.GetUserByIdUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PostConfig {

    @Bean
    public GetPostsService getPostsService (GetOtherUserPost otherUserPost){
        return new GetPostsService(otherUserPost);
    }

    @Bean
    public GetOtherUserPost getOtherUserPost (IPostRepository iPostRepository){
        return new GetOtherUserPost(iPostRepository);
    }

    @Bean
    public LikePostService likePostService (LikePostUseCase likePostUseCase){
        return new LikePostService(likePostUseCase);
    }

    @Bean
    public LikePostUseCase likePostUseCase (ILikeRepository iLikeRepository, PostGetByIdUseCase postGetByIdUseCase){
        return new LikePostUseCase(iLikeRepository, postGetByIdUseCase);
    }

    @Bean
    public GetLikedPostByUserService getLikedPostByUserService (LikedPostByUser likedPostByUser){
        return new GetLikedPostByUserService(likedPostByUser);
    }

    @Bean
    public LikedPostByUser likedPostByUser (ILikeRepository iLikeRepository){
        return new LikedPostByUser(iLikeRepository);
    }

    @Bean
    public CreatePostUseCase createPostUseCase (IPostRepository iPostRepository, GetUserByIdUseCase userServiceClient){
        return new CreatePostUseCase(iPostRepository, userServiceClient);
    }

    @Bean
    public CreatePostService createPostService (CreatePostUseCase createPostUseCase){
        return new CreatePostService(createPostUseCase);
    }

    @Bean
    public DeletePostUseCase deletePostUseCase(IPostRepository iPostRepository, PostGetByIdUseCase postGetByIdUseCase){
        return new DeletePostUseCase(iPostRepository, postGetByIdUseCase);
    }

    @Bean
    public DeletePostService deletePostService (DeletePostUseCase deletePostUseCase){
        return new DeletePostService(deletePostUseCase);
    }

    @Bean
    public PostGetByIdUseCase postGetByIdUseCase (IPostRepository iPostRepository){
        return new PostGetByIdUseCase(iPostRepository);
    }

    @Bean
    public AddCommentService addCommentService (AddCommentUseCase addCommentUseCase){
        return new AddCommentService(addCommentUseCase);
    }

    @Bean
    public AddCommentUseCase addCommentUseCase (PostGetByIdUseCase postGetByIdUseCase, GetUserByIdUseCase getUserByIdUseCase, ICommentRepository iCommentRepository){
        return new AddCommentUseCase(postGetByIdUseCase, getUserByIdUseCase, iCommentRepository);
    }

    @Bean
    public GetPostByUsernameService getPostByUsernameService (GetOtherUserPost getOtherUserPost){
        return new GetPostByUsernameService(getOtherUserPost);
    }
}
