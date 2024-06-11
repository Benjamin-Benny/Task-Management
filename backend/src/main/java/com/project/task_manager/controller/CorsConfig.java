//package com.project.task_manager.controller;
//
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.filter.CorsFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//@Configuration
//public class CorsConfig {
//
//    private final Logger log = LoggerFactory.getLogger(CorsConfig.class);
//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOriginPattern("*"); // Allow all origins
//        config.addAllowedHeader("*"); // Allow all headers
//        config.addAllowedMethod("*"); // Allow all methods (GET, POST, PUT, DELETE, etc.)
//        source.registerCorsConfiguration("/**", config);
//        log.info("Configuring CORS to allow all origins, headers, and methods");
//        return new CorsFilter(source);
//    }
//}