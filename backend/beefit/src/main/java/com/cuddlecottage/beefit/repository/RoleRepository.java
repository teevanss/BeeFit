package com.cuddlecottage.beefit.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cuddlecottage.beefit.models.ERole;
import com.cuddlecottage.beefit.models.Role;

public interface RoleRepository extends MongoRepository<Role,String>{
    Optional<Role> findByName(ERole name);    
}
