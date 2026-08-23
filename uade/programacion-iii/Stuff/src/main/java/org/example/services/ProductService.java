package org.example.services;

import org.example.entities.Product;

import java.util.List;

public class ProductService implements IProductService {

    @Override
    public Product getById(int id) {
        return null;
    }

    @Override
    public List<Product> getAll() {
        return List.of();
    }

    @Override
    public void delete(int id) {

    }
}
