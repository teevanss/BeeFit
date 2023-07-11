package com.cuddlecottage.beefit.data;

import java.math.BigInteger;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class CheckIn {
    @Id
    private BigInteger id;
    private String username;
    private int weight;
    private LocalDateTime date;

    public CheckIn(String username, int weight){
        this.username = username;
        this.weight = weight;
        this.date = LocalDateTime.now();
    }
    public BigInteger getId(){
        return id;
    }
    public String getUsername(){
        return username;
    }
    public int getWeight(){
        return weight;
    }
    public LocalDateTime getDate(){
        return date;
    }
}
