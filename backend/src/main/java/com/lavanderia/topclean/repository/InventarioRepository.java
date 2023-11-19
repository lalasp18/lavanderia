package com.lavanderia.topclean.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.topclean.models.Inventario;

public interface InventarioRepository extends JpaRepository<Inventario, Long> {

    
}
