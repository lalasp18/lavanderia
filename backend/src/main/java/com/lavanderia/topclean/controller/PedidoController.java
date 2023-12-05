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

import com.lavanderia.topclean.models.Pedido;
import com.lavanderia.topclean.service.PedidoService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/pedido")
@AllArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping("/criar")
    public Pedido salvarPedido(@RequestBody Pedido grava) {
        return pedidoService.savePedido(grava);

    }

    @PutMapping("/editar")
    public Pedido editarPedido(@RequestBody Pedido grava) throws RelationTypeNotFoundException {
        return pedidoService.editPedido(grava);

    }

    @GetMapping("/listar")
    public List<Pedido> listarPedido() {
        return pedidoService.listPedido();
    }

    @GetMapping("/listar/{id}")
    public Pedido pegarIdPedido(@PathVariable Long id) throws RelationTypeNotFoundException {
        return pedidoService.listIdPedido(id);

    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarPedido(@PathVariable Long id) {
        try {
            pedidoService.deleteIdPedido(id);
            return ResponseEntity.ok("Pedido deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
