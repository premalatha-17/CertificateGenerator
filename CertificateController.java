package com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService service;

    public CertificateController(CertificateService service){
        this.service = service;
    }

    @PostMapping
    public Certificate create(@RequestBody Certificate certificate){
        return service.save(certificate);
    }

    @GetMapping
    public List<Certificate> getAll(){
        return service.getAll();
    }

    @GetMapping("/{cid}")
    public Certificate getById(@PathVariable String cid){
        return service.getById(cid);
    }

    @GetMapping("/exportAll")
    public ResponseEntity<List<Certificate>> exportAllCertificates() {
        List<Certificate> allCertificates = service.getAll();
        return ResponseEntity.ok(allCertificates);
    }

}

