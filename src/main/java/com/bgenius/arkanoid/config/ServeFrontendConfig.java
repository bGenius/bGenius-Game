package com.bgenius.arkanoid.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Development only spring configuration for serving static files directly from src/ folder
 * Saves time by not requiring ctrl-f9 for each html/js/css change
 */
@Configuration
public class ServeFrontendConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("file:src/main/resources/static/");
    }
}
