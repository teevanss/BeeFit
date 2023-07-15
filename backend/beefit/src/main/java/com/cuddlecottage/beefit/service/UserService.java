package com.cuddlecottage.beefit.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.cuddlecottage.beefit.Exception.EntityNotFoundException;
import com.cuddlecottage.beefit.models.User;
import com.cuddlecottage.beefit.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(String id){
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public void deleteById(String id){
        userRepository.deleteById(id);
    }

}
