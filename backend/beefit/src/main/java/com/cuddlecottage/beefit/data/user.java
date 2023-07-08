package com.cuddlecottage.beefit.data;

import org.springframework.data.annotation.Id;

public class user {

    @Id
    private int id;
    private String username;
    private String password;

    public user(String username, String password){
        this.username = username;
        this.password = password;
    }
    public int getId(){
        return id;
    }
    public String getUsername(){
        return username;
    }
    public String getPassword(){
        return password;
    }
}
