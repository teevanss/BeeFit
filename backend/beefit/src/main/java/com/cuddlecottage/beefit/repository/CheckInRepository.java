package com.cuddlecottage.beefit.repository;
import java.math.BigInteger;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cuddlecottage.beefit.models.CheckIn;

public interface CheckInRepository extends MongoRepository<CheckIn, BigInteger> {
    
}
