package com.example.gradeO.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    private long PRN;

    private String name;
    private String branch;
    private String email;
    private String dept;
    
    // getters & setters
    public long getId() {
        return PRN;
    }
    public void setId(long id) {
        this.PRN = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getBranch() {
        return branch;
    }
    public void setBranch(String branch) {
        this.branch = branch;
    }    
    public void setEmail(String email) {
    	this.email = email;
    }
    public String getEmail() {
    	return this.email;
    }
    public String getDept() {
    	return this.dept;
    }
    public void setDept(String dept) {
    	this.dept = dept;
    }
    
    

}
