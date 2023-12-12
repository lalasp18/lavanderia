package com.lavanderia.topclean.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lavanderia.topclean.models.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query(value = "SELECT * FROM pedido WHERE status = 0;", nativeQuery = true)
    List<Pedido> findByStatusInicio();

    @Query(value = "SELECT * FROM pedido WHERE status = 1;", nativeQuery = true)
    List<Pedido> findByStatusAndam();

    @Query(value = "SELECT * FROM pedido WHERE status = 2;", nativeQuery = true)
    List<Pedido> findByStatusConclui();
    
}
