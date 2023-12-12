package com.lavanderia.topclean.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lavanderia.topclean.models.Cliente;
import com.lavanderia.topclean.repository.ClienteRepository;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente criarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente editarCliente(Cliente cliente) throws RelationTypeNotFoundException {
        Cliente editado = clienteRepository.findById(cliente.getId())
            .orElseThrow(() -> new RelationTypeNotFoundException("Cliente não existe com id: " + cliente.getId()));

        editado.setId(cliente.getId());
        editado.setNome(cliente.getNome());
        editado.setEndereco(cliente.getEndereco());
        editado.setNumero(cliente.getNumero());
        editado.setEmail(cliente.getEmail());
        editado.setTelefone(cliente.getTelefone());

        return clienteRepository.save(editado);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente buscarClientePorId(Long id) throws RelationTypeNotFoundException {
        return clienteRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Cliente não existe com id: " + id));
    }

    public void excluirCliente(Long id) throws RelationTypeNotFoundException {
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Cliente não existe com id: " + id));
        clienteRepository.delete(cliente);
    }
}
