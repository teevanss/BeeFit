package com.cuddlecottage.beefit.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cuddlecottage.beefit.Exception.EntityNotFoundException;
import com.cuddlecottage.beefit.data.CheckIn;
import com.cuddlecottage.beefit.repository.CheckInRepository;

@Service
public class CheckInService {
    @Autowired
    private CheckInRepository checkinRepository;

    public List<CheckIn> findAll(){
        return checkinRepository.findAll();
    }

    public CheckIn findById(BigInteger id){
        return checkinRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public CheckIn save(CheckIn checkin){
        return checkinRepository.save(checkin);
    }

    public void deleteById(BigInteger id){
        checkinRepository.deleteById(id);
    }
}
