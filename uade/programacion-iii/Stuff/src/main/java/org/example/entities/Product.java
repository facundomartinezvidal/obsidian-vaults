package org.example.entities;

public class Product {
    int id;
    String name;
    String description;
    int price;

    private Product (int id, String name, String description, int price){

    }
    public static Product createProduct(int id, String name, String description, int price){
        if (name.isEmpty()) {
            throw new RuntimeException("EL NOMBRE DEBE NO ESTAR VACIO");
        }
        return  new Product(id, name, description, price);
    }
}
