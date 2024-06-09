//package com.project.task_manager.controller;
//
//import com.project.task_manager.model.User;
//import com.project.task_manager.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        User savedUser = userService.save(user);
//        return ResponseEntity.ok(savedUser);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password")));
//        UserDetails userDetails = userService.loadUserByUsername(credentials.get("username"));
//        String token = "jwt-token"; // Generate JWT token here
//        Map<String, String> response = new HashMap<>();
//        response.put("token", token);
//        return ResponseEntity.ok(response);
//    }
//}