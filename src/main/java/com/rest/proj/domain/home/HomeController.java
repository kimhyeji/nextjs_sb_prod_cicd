package com.rest.proj.domain.home;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "HomeController", description = "홈 컨트롤러")
public class HomeController {
    @GetMapping("/")
    public String healthCheck() {
        return "BACKEND OK";
    }
}