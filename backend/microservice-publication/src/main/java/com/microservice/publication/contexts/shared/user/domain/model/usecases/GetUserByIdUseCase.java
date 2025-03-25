package com.microservice.publication.contexts.shared.user.domain.model.usecases;

import com.microservice.common.utils.exception.NotFoundException;
import com.microservice.common.utils.responseHandler.ResponseFormat;
import com.microservice.publication.contexts.shared.user.domain.model.dto.UserDto;
import com.microservice.publication.contexts.shared.user.domain.model.port.UserServiceClient;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GetUserByIdUseCase {
    private final UserServiceClient userServiceClient;

    public UserDto execute (String username){
        try {
            ResponseFormat<UserDto> response = userServiceClient.findUserById(username);

            if (response == null || response.getData() == null) {
                throw new NotFoundException("User not found");
            }
            return response.getData();
        } catch (Exception e) {
            throw new NotFoundException("User not found since Feign: " + e.getMessage());
        }

    }
}
