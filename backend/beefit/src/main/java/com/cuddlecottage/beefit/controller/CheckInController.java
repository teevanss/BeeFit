package com.cuddlecottage.beefit.controller;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cuddlecottage.beefit.models.CheckIn;
import com.cuddlecottage.beefit.service.CheckInService;

import io.micrometer.common.util.StringUtils;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/checkin/{id}")
public class CheckInController {
    @Autowired
    private CheckInService checkinService;

    @GetMapping
    public List<CheckIn> findAll(@RequestParam(required = false) String username){
        if(username == null || StringUtils.isEmpty(username)){
            return checkinService.findAll();
        }
        else{
            return checkinService.findCheckinsByUser(username);
        }
    }

    @GetMapping("/{id}")
    public CheckIn findById(@PathVariable BigInteger id){
        return checkinService.findById(id);
    }

    @PostMapping
    public CheckIn create(@RequestBody CheckIn checkin){
        return checkinService.save(checkin);
    }

    @PutMapping("/{id}")
    public CheckIn update(@RequestBody CheckIn checkin){
        return checkinService.save(checkin);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable BigInteger id){
        checkinService.deleteById(id);
    }
}
