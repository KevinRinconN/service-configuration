package com.microservice.user.contexts.user.infrastructure.adapter.persistence.entities;

import com.microservice.user.contexts.user.domain.model.enums.Rol;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@NoArgsConstructor @AllArgsConstructor @Getter @Setter
public class User {

    @Id
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false, length = 40)
    private String firstname;
    @Column(nullable = false, length = 40)
    private String lastname;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Rol rol;
    @Column(nullable = false, length = 50)
    private String email;
    private String bio;
    private String profilePicture;
    private Boolean locked;
    private Boolean disabled;

    public User(String username, String firstname, String lastname, String password, Rol rol, String email, String bio, String profilePicture) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.rol = rol;
        this.email = email;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.locked = false;
        this.disabled = false;
    }

}
