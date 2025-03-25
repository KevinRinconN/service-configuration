package com.microservice.user.contexts.user.domain.usecases;

import com.microservice.common.utils.exception.AlreadyExitsException;
import com.microservice.user.contexts.user.domain.model.dto.UserCreateDto;
import com.microservice.user.contexts.user.domain.model.dto.UserDto;
import com.microservice.user.contexts.user.domain.model.enums.Rol;
import com.microservice.user.contexts.user.domain.port.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
public class UserCreateUseCase {
    private final IUserRepository iUserRepository;

    public UserDto execute (UserCreateDto userCreateDto){
        Optional<UserDto> existingUser = iUserRepository.getByUsername(userCreateDto.getUsername())
                .or(() -> this.iUserRepository.getByEmail(userCreateDto.getEmail()));

        if (existingUser.isPresent()) {
            if (Objects.equals(existingUser.get().getUsername(), userCreateDto.getUsername()))
                throw new AlreadyExitsException( "User with username "+userCreateDto.getUsername()+" already exists.");
            if (Objects.equals(existingUser.get().getEmail(), userCreateDto.getEmail()))
                throw new AlreadyExitsException( "User with email "+userCreateDto.getEmail()+" already exists." );
        }

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        UserDto newUser = UserDto.builder()
                .username(userCreateDto.getUsername())
                .firstname(userCreateDto.getFirstname())
                .lastname(userCreateDto.getLastname())
                .email(userCreateDto.getEmail())
                .bio(userCreateDto.getBio())
                .password(bCryptPasswordEncoder.encode(userCreateDto.getPassword()))
                .rol(Rol.valueOf(userCreateDto.getRol()))
                .locked(false)
                .disabled(false)
                .build();

        return iUserRepository.create(newUser);
    }
}
