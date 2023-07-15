package com.cuddlecottage.beefit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cuddlecottage.beefit.models.User;
import com.cuddlecottage.beefit.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable String id){
        return userService.findById(id);
    }

    @PostMapping
    public User create(@RequestBody User newUser){
        return userService.save(newUser);
    }

    @PutMapping("/{id}")
    public User update(@RequestBody User user){
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        userService.deleteById(id);
    }
}
