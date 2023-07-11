package com.cuddlecottage.beefit.repository;
import com.cuddlecottage.beefit.data.CheckIn;

import java.math.BigInteger;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckInRepository extends MongoRepository<CheckIn, BigInteger> {
    
}
