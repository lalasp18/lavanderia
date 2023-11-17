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
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Inventario () {}

    public Inventario (Long id, String nome, Integer quantidade, Double valor, String categoria, String descricao) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;
    }

    public Inventario (String nome, Integer quantidade, Double valor, String categoria, String descricao) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;
    }
}
