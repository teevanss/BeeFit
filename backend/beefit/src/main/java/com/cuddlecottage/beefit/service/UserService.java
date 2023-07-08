package com.cuddlecottage.beefit.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.cuddlecottage.beefit.Exception.EntityNotFoundException;
import com.cuddlecottage.beefit.data.user;
import com.cuddlecottage.beefit.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<user> findAll(){
        return userRepository.findAll();
    }

    public user findById(int id){
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public user save(user user){
        return userRepository.save(user);
    }

    public void deleteById(int id){
        userRepository.deleteById(id);
    }

}
