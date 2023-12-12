package com.lavanderia.topclean.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lavanderia.topclean.models.Funcionario;
import com.lavanderia.topclean.repository.FuncionarioRepository;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    @Autowired
    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public Funcionario criarFuncionario(Funcionario funcionarioEntra) {
        return funcionarioRepository.save(funcionarioEntra);
    }

    public Funcionario editarFuncionario(Funcionario funcionario) throws RelationTypeNotFoundException {
        Funcionario editado = funcionarioRepository.findById(funcionario.getId())
                .orElseThrow(() -> new RelationTypeNotFoundException("Funcionário não existe com id :" + funcionario.getId()));

        editado.setId(funcionario.getId());
        editado.setNome(funcionario.getNome());
        editado.setEmail(funcionario.getEmail());
        editado.setCargo(funcionario.getCargo());
        editado.setSenha(funcionario.getSenha());

        return funcionarioRepository.save(editado);
    }

    public List<Funcionario> listarFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public Funcionario buscarFuncionarioPorId(Long id) throws RelationTypeNotFoundException {
        return funcionarioRepository.findById(id)
                .orElseThrow(() -> new RelationTypeNotFoundException("Funcionário não existe com id :" + id));
    }

    public void excluirFuncionario(Long id) throws RelationTypeNotFoundException {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RelationTypeNotFoundException("Funcionário não existe com id :" + id));
        funcionarioRepository.delete(funcionario);
    }
}
