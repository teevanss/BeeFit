package com.cuddlecottage.beefit.repository;
import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.cuddlecottage.beefit.models.CheckIn;

public interface CheckInRepository extends MongoRepository<CheckIn, BigInteger> {

    @Query("{'username' : ?0 }")
    List<CheckIn> findCheckinsByUsername(String username);
}
