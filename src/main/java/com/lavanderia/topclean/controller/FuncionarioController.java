package com.lavanderia.topclean.controller;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lavanderia.topclean.models.Funcionario;
import com.lavanderia.topclean.service.FuncionarioService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/funcionario")
@AllArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @PostMapping
    public Funcionario criarFuncionario(@RequestBody Funcionario funcionario) {
        return funcionarioService.criarFuncionario(funcionario);
    }

    @PutMapping
    public Funcionario editarFuncionario(@RequestBody Funcionario funcionario) throws RelationTypeNotFoundException {
        return funcionarioService.editarFuncionario(funcionario);
    }

    @GetMapping
    public List<Funcionario> listarFuncionarios() {
        return funcionarioService.listarFuncionarios();
    }

    @GetMapping("/{id}")
    public Funcionario buscarFuncionarioPorId(@PathVariable Long id) throws RelationTypeNotFoundException {
        return funcionarioService.buscarFuncionarioPorId(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirFuncionario(@PathVariable Long id) {
        try {
            funcionarioService.excluirFuncionario(id);
            return ResponseEntity.ok("Funcionário deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
