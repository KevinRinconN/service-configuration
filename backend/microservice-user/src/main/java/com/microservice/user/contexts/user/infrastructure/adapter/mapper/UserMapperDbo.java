package com.microservice.user.contexts.user.infrastructure.adapter.mapper;

import com.microservice.user.contexts.user.domain.model.dto.UserDto;
import com.microservice.user.contexts.user.infrastructure.adapter.persistence.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
@Component
public interface UserMapperDbo {

    UserDto toDomain(User entity);

    User toDbo(UserDto domain);
}
