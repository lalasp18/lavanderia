package com.lavanderia.topclean.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lavanderia.topclean.models.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {


}