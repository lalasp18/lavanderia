package com.lavanderia.topclean.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lavanderia.topclean.models.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
