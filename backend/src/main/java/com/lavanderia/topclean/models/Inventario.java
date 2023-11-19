package com.lavanderia.topclean.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Inventario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 150, nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private Integer quantidade;
    
    @Column(nullable = false)
    private Double valor;

    @Column(nullable = false)
    private String categoria;

    @Column(length = 350, nullable = false)
    private String descricao;
}
