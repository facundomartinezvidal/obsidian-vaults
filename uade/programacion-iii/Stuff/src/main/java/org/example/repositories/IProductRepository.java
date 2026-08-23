package org.example.repositories;

import org.example.entities.Product;

import java.util.List;

public interface IProductRepository {
    Product getById(int id);
    List<Product> getAll();
}
