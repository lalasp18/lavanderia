package com.lavanderia.topclean.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lavanderia.topclean.models.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query(value = "SELECT EXISTS( SELECT * FROM cliente WHERE email = :emailParam );", nativeQuery = true)
    boolean findIfEmailExists(@Param("emailParam") String emailParam);

}
