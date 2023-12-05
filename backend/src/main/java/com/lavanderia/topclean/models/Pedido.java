package com.lavanderia.topclean.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente")
    private Cliente cliente;
    
    @Column(nullable = false)
    private Date dtPedido;
    // private String tipoLavagem;
    
    @Column(nullable = false)
    private Integer status;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "pedidoMaquina", joinColumns = @JoinColumn(name = "pedido"), inverseJoinColumns = @JoinColumn(name = "maquinas_id"))
    private List<Maquina> maquinas;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "pedidoProduto", joinColumns = @JoinColumn(name = "pedido"), inverseJoinColumns = @JoinColumn(name = "produtos_id"))
    private List<Inventario> produtos;

    @ManyToOne
    @JoinColumn(name = "funcionario")
    private Funcionario funcionario;
    
    @Column(nullable = false)
    private Double valorTotal;
    
    @Column(nullable = false)
    private boolean entrega;
    
    @Column(nullable = false)
    private Double pesoRoupa;
}
