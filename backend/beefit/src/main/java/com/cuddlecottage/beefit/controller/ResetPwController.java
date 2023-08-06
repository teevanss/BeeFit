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
import com.cuddlecottage.beefit.payload.request.ForgotInfoRequest;
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

    @PostMapping("/forgotuser")
    public ResponseEntity<?> processForgotUsername(@Valid @RequestBody ForgotInfoRequest forgotRequest){
        String email = forgotRequest.getEmail();

        try{
            String username = userService.findUsername(email);
            sendUsernameEmail(email, username);
        } catch(EntityNotFoundException ex){
            return ResponseEntity.ok(new MessageResponse("Email couldn't be send properly."));
        } catch(UnsupportedEncodingException | MessagingException e){
            return ResponseEntity.ok(new MessageResponse("Error while sending email"));
        }

        return ResponseEntity.ok(new MessageResponse("Username reminder email has been sent."));
    }

    @PostMapping("/forgotpw")
    public ResponseEntity<?> processForgotPw(@Valid @RequestBody ForgotInfoRequest forgotRequest){
        String email = forgotRequest.getEmail();
        String token = UUID.randomUUID().toString();

        try{
            userService.updateResetPasswordToken(token, email);
            sendTokenEmail(email, token);
        } catch(EntityNotFoundException ex){
            return ResponseEntity.ok(new MessageResponse("Email couldn't be send properly."));
        } catch(UnsupportedEncodingException | MessagingException e){
            return ResponseEntity.ok(new MessageResponse("Error while sending email"));
        }

        return ResponseEntity.ok(new MessageResponse("Reset password email has been sent."));
    }

    public void sendUsernameEmail(String recipientEmail, String username)
        throws MessagingException, UnsupportedEncodingException{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("${spring.mail.username}", "BeeFit Support");
            helper.setTo(recipientEmail);

            String subject = "Username reminder.";

            String content = "<p>Howdy,</p>"
            + "<p>You have recently requested your username to be sent to you.</p>"
            + "<p>This is the username associated to your email address:</p>"
            + "<p>" + username + "</p>"
            + "<p>Welcome back to BeeFit!</p>"
            + "<br>"
            + "<p>If you were not the person to request this email, "
            + "please consider reseting your password for account security.</p>";

            helper.setSubject(subject);
            helper.setText(content, true);

            mailSender.send(message);
    }

    public void sendTokenEmail(String recipientEmail, String token) 
        throws MessagingException, UnsupportedEncodingException{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("${spring.mail.username}", "BeeFit Support");
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
