package com.lavanderia.topclean.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.topclean.models.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    
}
