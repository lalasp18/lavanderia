package com.lavanderia.topclean.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lavanderia.topclean.models.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
<<<<<<< HEAD
    
    @Query(value = "SELECT EXISTS( SELECT * FROM funcionario WHERE email = :emailParam );", nativeQuery = true)
    boolean findIfEmailExists(@Param("emailParam") String emailParam);
=======
>>>>>>> 01112d747df0406dc5d84720ebd9d41d91e7161a
}
