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

import com.lavanderia.topclean.models.Inventario;
import com.lavanderia.topclean.service.InventarioService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/inventario")
@AllArgsConstructor
public class InventarioController {

    private final InventarioService inventarioServ;

    @PostMapping("/criar")
    public Inventario salvarInventario(@RequestBody Inventario grava) {
        return inventarioServ.saveInventario(grava);

    }

    @PutMapping("/editar")
    public Inventario editarInventario(@RequestBody Inventario grava) throws RelationTypeNotFoundException {
        return inventarioServ.editInventario(grava);

    }

    @GetMapping("/listar")
    public List<Inventario> listarInventario() {
        return inventarioServ.listInventario();
    }

    @GetMapping("/listar/{id}")
    public Inventario pegarIdInventario(@PathVariable Long id) throws RelationTypeNotFoundException {
        return inventarioServ.listIdInventario(id);

    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarInventario(@PathVariable Long id) {
        try {
            inventarioServ.deleteIdInventario(id);
            return ResponseEntity.ok("Inventário deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
