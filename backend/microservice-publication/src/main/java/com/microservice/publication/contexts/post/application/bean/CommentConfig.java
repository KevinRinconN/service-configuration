package com.microservice.publication.contexts.post.application.bean;

import com.microservice.publication.contexts.post.domain.port.repository.ICommentRepository;
import com.microservice.publication.contexts.post.domain.services.GetCommentByPostService;
import com.microservice.publication.contexts.post.domain.usecases.GetCommentsByPostUseCase;
import com.microservice.publication.contexts.post.domain.usecases.PostGetByIdUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommentConfig {
    @Bean
    public GetCommentsByPostUseCase getCommentsByPostUseCase (PostGetByIdUseCase postGetByIdUseCase, ICommentRepository iCommentRepository){
        return new GetCommentsByPostUseCase(postGetByIdUseCase, iCommentRepository);
    }

    @Bean
    public GetCommentByPostService getCommentByPostService (GetCommentsByPostUseCase getCommentsByPostUseCase){
        return new GetCommentByPostService(getCommentsByPostUseCase);
    }
}
