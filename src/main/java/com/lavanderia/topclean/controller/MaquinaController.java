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

import com.lavanderia.topclean.models.Maquina;
import com.lavanderia.topclean.service.MaquinaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/maquina")
@AllArgsConstructor
public class MaquinaController {

    private final MaquinaService maquinaService;

    @PostMapping
    public Maquina criarMaquina(@RequestBody Maquina maquina) {
        return maquinaService.criarMaquina(maquina);

    }

    @PutMapping
    public Maquina editarMaquina(@RequestBody Maquina maquina) throws RelationTypeNotFoundException {
        return maquinaService.editarMaquina(maquina);

    }

    @GetMapping
    public List<Maquina> listarMaquinas() {
        return maquinaService.listarMaquinas();
    }

    @GetMapping("/{id}")
    public Maquina buscarMaquinaPorId(@PathVariable Long id) throws RelationTypeNotFoundException {
        return maquinaService.buscarMaquinaPorId(id);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirMaquina(@PathVariable Long id) {
        try {
            maquinaService.excluirMaquina(id);
            return ResponseEntity.ok("Máquina deletada com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
