package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Certificate {
    @Id


    private String cid;

    private String name;
    private String course;
    private String date;

    @Column(length=1000)
    private String remarks;

    private String issuedAt;

    public Certificate(){}

    public Certificate(String cid, String name, String course, String date, String remarks, String issuedAt){
        this.cid = cid;
        this.name = name;
        this.course = course;
        this.date = date;
        this.remarks = remarks;
        this.issuedAt = issuedAt;
    }

    public String getCid(){
        return cid;
    }
    public void setCid(String cid){
        this.cid = cid;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getCourse(){
        return course;
    }

    public void setCourse(String course){
        this.course = course;
    }
    public String getDate(){
        return date;
    }

    public void setDate(String date){
        this.date = date;
    }
    public String getRemarks(){
        return remarks;
    }

    public void setRemarks(String remarks){
        this.remarks = remarks;
    }

    public String getIssuedAt(){
        return issuedAt;
    }

    public void setIssuedAt(String issuedAt){
        this.issuedAt = issuedAt;
    }


}
