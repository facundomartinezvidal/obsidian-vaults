package org.example.controller;

import org.example.entities.Product;
import org.example.services.IProductService;
import org.example.services.ProductService;
import org.example.services.ProductService2;

public class ProductController {
    // get by id
    IProductService service;
    //@GetMapping('product/{id}')
    public Product getById(int id){
        return service.getById(id);
    }
}
