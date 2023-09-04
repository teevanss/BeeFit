package com.cuddlecottage.beefit.models;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "journalEntries")
public class JournalEntry {
    
    @Id
    private BigInteger id;
    private String author;
    private String body;
    private LocalDateTime date;

    public JournalEntry(String username, String body){
        this.author = username;
        this.body = body;
        this.date = LocalDateTime.now();
    }

    public BigInteger getId(){
        return id;
    }
    public String getAuthor(){
        return author;
    }
    public void setAuthor(String newAuthor){
        this.author = newAuthor;
    }
    public String getBody(){
        return body;
    }
    public void setBody(String newBody){
        this.body = newBody;
    }
    public LocalDateTime getDate(){
        return date;
    }
    public void setDate(){
        
    }
}
