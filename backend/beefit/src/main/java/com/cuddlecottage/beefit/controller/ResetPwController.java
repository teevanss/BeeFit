package com.cuddlecottage.beefit.controller;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuddlecottage.beefit.Exception.EntityNotFoundException;
import com.cuddlecottage.beefit.models.User;
import com.cuddlecottage.beefit.payload.request.ForgotPwRequest;
import com.cuddlecottage.beefit.payload.request.ResetPwRequest;
import com.cuddlecottage.beefit.payload.response.MessageResponse;
import com.cuddlecottage.beefit.repository.UserRepository;
import com.cuddlecottage.beefit.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ResetPwController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/forgotpw")
    public ResponseEntity<?> processForgotPw(@Valid @RequestBody ForgotPwRequest forgotRequest){
        String email = forgotRequest.getEmail();
        String token = UUID.randomUUID().toString();

        try{
            userService.updateResetPasswordToken(token, email);
            sendEmail(email, token);
        } catch(EntityNotFoundException ex){
            return ResponseEntity.ok(new MessageResponse("Email couldn't be send properly."));
        } catch(UnsupportedEncodingException | MessagingException e){
            return ResponseEntity.ok(new MessageResponse("Error while sending email"));
        }

        return ResponseEntity.ok(new MessageResponse("Reset password email has been sent."));
    }

    public void sendEmail(String recipientEmail, String token) 
        throws MessagingException, UnsupportedEncodingException{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("beefitsupp@gmail.com", "BeeFit Support");
            helper.setTo(recipientEmail);

            String subject = "Password Reset Requested.";

            String content = "<p>Hello,</p>"
            + "<p>You have requested to reset your password.</p>"
            + "<p>This is the code to input in order to reset your password:</p>"
            + "<p>" + token + "</p>"
            + "<br>"
            + "<p>Ignore this email if you do remember your password, "
            + "or you have not made the request.</p>";

            helper.setSubject(subject);
            helper.setText(content, true);

            mailSender.send(message);
    }

    @PostMapping("/resetpw")
    public ResponseEntity<?> processResetPw(@Valid @RequestBody ResetPwRequest resetRequest){
        String token = resetRequest.getToken();
        String password = resetRequest.getPassword();

        User user = userService.getByResetPasswordToken(token);
        
        if(user == null){
            return ResponseEntity.ok(new MessageResponse("Token not linked to user."));
        }
        else{
            userService.updatePassword(user, password);
        }

        return ResponseEntity.ok(new MessageResponse("Password has successfully been updated."));
    }
}
