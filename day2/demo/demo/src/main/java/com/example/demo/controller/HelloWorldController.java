package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class HelloWorldController {
    @GetMapping("/hello")
    public String Hello() {
        return "Hello World";
    }
    @GetMapping("/greeting")
    public String Greeting(@RequestParam(defaultValue = "")String name){
        return " Hello " + name;
    }
    @GetMapping("/addition")
    public int Add(int a,int b){
        return a + b;
    }
    @PostMapping("/add")
    public Map<String, Integer> addnumbers(@RequestBody Map<String, Integer> request) {
       int result = request.get("Num1") + request.get("Num2");
       return Map.of("Sum", result);
    }
}