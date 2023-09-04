package com.cuddlecottage.beefit.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuddlecottage.beefit.Exception.EntityNotFoundException;
import com.cuddlecottage.beefit.models.JournalEntry;
import com.cuddlecottage.beefit.repository.JournalEntryRepository;

@Service
public class JournalEntryService {
    
    @Autowired
    private JournalEntryRepository journalEntryRepo;

    public List<JournalEntry> findAll(){
        return journalEntryRepo.findAll();
    }

    public JournalEntry findById(BigInteger id){
        return journalEntryRepo.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public JournalEntry save(JournalEntry journalEntry){
        return journalEntryRepo.save(journalEntry);
    }

    public void deleteById(BigInteger id){
        journalEntryRepo.deleteById(id);
    }

    public List<JournalEntry> findJournalByAuthor(String author){
        return journalEntryRepo.findJournalEntryByAuthor(author);
    }
}
