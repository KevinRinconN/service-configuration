package com.microservice.publication.contexts.shared.user.application.bean;

import com.microservice.publication.contexts.shared.user.domain.model.port.UserServiceClient;
import com.microservice.publication.contexts.shared.user.domain.model.usecases.GetUserByIdUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class UserConfig {
    @Bean
    public GetUserByIdUseCase getUserByIdUseCase(UserServiceClient userServiceClient){
        return new GetUserByIdUseCase(userServiceClient);
    }
}
