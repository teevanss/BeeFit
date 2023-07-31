package com.cuddlecottage.beefit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.cuddlecottage.beefit.models.User;

public interface UserRepository extends MongoRepository<User,String>{
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("{'email' : ?0 }")
    User findByEmail(String email);

    @Query("{'resetPasswordToken' : ?0 }")
    User findByResetPasswordToken(String token);
}
