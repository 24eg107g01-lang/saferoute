package com.saferoute.backend.controller;

import com.saferoute.backend.entity.EmergencyContact;
import com.saferoute.backend.repository.EmergencyContactRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:5173")
public class EmergencyContactController {

    private final EmergencyContactRepository repository;

    public EmergencyContactController(EmergencyContactRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public EmergencyContact addContact(@RequestBody EmergencyContact contact) {
        return repository.save(contact);
    }

    @GetMapping
    public List<EmergencyContact> getContacts() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable Long id) {
        repository.deleteById(id);
        return "Contact deleted successfully";
    }
}