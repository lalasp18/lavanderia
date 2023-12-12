package com.lavanderia.topclean.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lavanderia.topclean.models.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    
    @Query(value = "SELECT EXISTS( SELECT * FROM funcionario WHERE email = :emailParam );", nativeQuery = true)
    boolean findIfEmailExists(@Param("emailParam") String emailParam);
}
