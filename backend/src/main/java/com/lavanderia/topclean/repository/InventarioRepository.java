package com.lavanderia.topclean.repository;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lavanderia.topclean.models.Inventario;

public interface InventarioRepository extends JpaRepository<Inventario, Long> {

    @Query(value = "SELECT EXISTS( SELECT * FROM inventario WHERE nome = :nomeParam AND categoria = :categParam );", nativeQuery = true)
    boolean findIfNameExists(@Param("nomeParam") String nomeParam, @Param("categParam") String categParam);
    
}
