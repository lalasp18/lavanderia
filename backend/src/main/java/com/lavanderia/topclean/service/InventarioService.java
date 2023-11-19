package com.lavanderia.topclean.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lavanderia.topclean.models.Inventario;
import com.lavanderia.topclean.repository.InventarioRepository;

@Service
public class InventarioService {
    
    @Autowired
    private InventarioRepository inventarioRepo;

    public Inventario saveInventario(Inventario inventarioEntra) {
        return inventarioRepo.save(inventarioEntra);
    }

    public Inventario editInventario(Inventario inventarioEntra) throws RelationTypeNotFoundException {
        Inventario editado = inventarioRepo.findById(inventarioEntra.getId())
            .orElseThrow(() -> new RelationTypeNotFoundException("Inventário não existe com id :" + inventarioEntra.getId()));
        
        editado.setId(inventarioEntra.getId());
        editado.setNome(inventarioEntra.getNome());
        editado.setQuantidade(inventarioEntra.getQuantidade());
        editado.setValor(inventarioEntra.getValor());
        editado.setCategoria(inventarioEntra.getCategoria());
        editado.setDescricao(inventarioEntra.getDescricao());
        return inventarioRepo.save(editado);
    }

    public List<Inventario> listInventario() {
        return inventarioRepo.findAll();
    }

    public Inventario listIdInventario(Long id) throws RelationTypeNotFoundException {
        return inventarioRepo.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Inventário não existe com id :" + id));
    }

    public void deleteIdInventario(Long id) throws RelationTypeNotFoundException {
        Inventario inventario = inventarioRepo.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Inventário não existe com id :" + id));  
        inventarioRepo.delete(inventario);
    }
}
