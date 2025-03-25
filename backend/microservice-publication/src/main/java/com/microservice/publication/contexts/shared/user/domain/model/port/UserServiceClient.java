package com.microservice.publication.contexts.shared.user.domain.model.port;

import com.microservice.common.utils.responseHandler.ResponseFormat;
import com.microservice.publication.contexts.shared.user.domain.model.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "microservice-user", url="localhost:8090")
public interface UserServiceClient {

    @GetMapping("/user/{username}")
    ResponseFormat<UserDto> findUserById(@PathVariable("username")  String username);
}
