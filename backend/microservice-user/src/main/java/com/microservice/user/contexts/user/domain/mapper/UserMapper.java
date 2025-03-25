package com.microservice.user.contexts.user.domain.mapper;

import com.microservice.user.contexts.user.domain.model.dto.UserDto;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    UserMapper INSTANCE =  Mappers.getMapper( UserMapper.class );

    UserResponse toShow(UserDto userDto);
}
