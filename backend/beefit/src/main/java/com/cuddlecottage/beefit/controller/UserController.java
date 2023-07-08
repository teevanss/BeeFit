package com.cuddlecottage.beefit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cuddlecottage.beefit.data.user;
import com.cuddlecottage.beefit.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<user> findAll(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public user findById(@PathVariable int id){
        return userService.findById(id);
    }

    @PostMapping
    public user create(@RequestBody user newUser){
        return userService.save(newUser);
    }

    @PutMapping("/{id}")
    public user update(@RequestBody user user){
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id){
        userService.deleteById(id);
    }
}
