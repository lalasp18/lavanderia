package com.lavanderia.topclean.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Funcionario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 150, nullable = false)
    private String nome;

    @Column(length = 150, nullable = false)
    private String email;

    @Column(nullable = false)
    private String cargo;

    @Column(nullable = false)
    private String senha;
}
