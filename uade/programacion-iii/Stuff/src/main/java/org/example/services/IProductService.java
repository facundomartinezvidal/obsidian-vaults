package org.example.services;

import org.example.entities.Product;

import javax.sound.sampled.Port;
import java.util.List;

public interface IProductService {
    Product getById(int id);
    List<Product> getAll();
    void delete(int id);
}
