package com.microservice.user.contexts.user.application.bean;

import com.microservice.user.contexts.user.domain.mapper.UserMapper;
import com.microservice.user.contexts.user.domain.port.repository.IUserRepository;
import com.microservice.user.contexts.user.domain.services.UserCreateService;
import com.microservice.user.contexts.user.domain.services.UserGetByIdService;
import com.microservice.user.contexts.user.domain.usecases.UserCreateUseCase;
import com.microservice.user.contexts.user.domain.usecases.UserGetByIdUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    public UserGetByIdUseCase userGetByIdUseCase (IUserRepository iUserRepository){
        return new UserGetByIdUseCase(iUserRepository);
    }

    @Bean
    public UserCreateUseCase userCreateUseCase (IUserRepository iUserRepository){
        return new UserCreateUseCase(iUserRepository);
    }

    @Bean
    public UserCreateService userCreateService(UserCreateUseCase userCreateUseCase){
        return new UserCreateService(userCreateUseCase);
    }

    @Bean
    public UserGetByIdService userGetByIdService (UserGetByIdUseCase userGetByIdUseCase){
        return new UserGetByIdService(userGetByIdUseCase);
    }
}
