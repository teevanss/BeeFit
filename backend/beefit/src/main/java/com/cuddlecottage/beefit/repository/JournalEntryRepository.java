package com.cuddlecottage.beefit.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.cuddlecottage.beefit.models.JournalEntry;

public interface JournalEntryRepository extends MongoRepository<JournalEntry, BigInteger>{
    
    @Query("{'author' : ?0 }")
    List<JournalEntry> findJournalEntryByAuthor(String author);
}
