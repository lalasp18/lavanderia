package com.lavanderia.topclean.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.stereotype.Service;

import com.lavanderia.topclean.models.Maquina;
import com.lavanderia.topclean.repository.MaquinaRepository;

@Service
public class MaquinaService {
    
    private MaquinaRepository maquinaRepository;

    public MaquinaService(MaquinaRepository maquinaRepository) {
        this.maquinaRepository = maquinaRepository;
    }

    public Maquina criarMaquina(Maquina maquina) {
        return maquinaRepository.save(maquina);
    }

    public Maquina editarMaquina(Maquina maquina) throws RelationTypeNotFoundException {
        Maquina editado = maquinaRepository.findById(maquina.getId())
            .orElseThrow(() -> new RelationTypeNotFoundException("Máquina não existe com id :" + maquina.getId()));
        
        editado.setId(maquina.getId());
        editado.setNome(maquina.getNome());
        editado.setTipo(maquina.getTipo());
        editado.setValor(maquina.getValor());
        return maquinaRepository.save(editado);
    }

    public List<Maquina> listarMaquinas() {
        return maquinaRepository.findAll();
    }

    public Maquina buscarMaquinaPorId(Long id) throws RelationTypeNotFoundException {
        return maquinaRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Máquina não existe com id :" + id));
    }

    public void excluirMaquina(Long id) throws RelationTypeNotFoundException {
        Maquina maquina = maquinaRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Máquina não existe com id :" + id));  
        maquinaRepository.delete(maquina);
    }
}
