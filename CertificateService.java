package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CertificateService {
    private final CertificateRepository repository;

    public CertificateService(CertificateRepository repository){
        this.repository = repository;
    }

    public Certificate save(Certificate certificate){
        return repository.save(certificate);
    }

    public List<Certificate> getAll(){
        return repository.findAll();
    }

    public Certificate getById(String cid){
        return repository.findById(cid).orElse(null);
    }

    public void delete(String cid){
        repository.deleteById(cid);
    }
}
