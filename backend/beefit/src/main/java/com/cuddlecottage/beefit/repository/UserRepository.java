package com.cuddlecottage.beefit.repository;

import com.cuddlecottage.beefit.data.user;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<user,Integer>{
    
}
