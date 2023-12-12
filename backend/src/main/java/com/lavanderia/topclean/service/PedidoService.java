package com.lavanderia.topclean.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lavanderia.topclean.models.Pedido;
import com.lavanderia.topclean.repository.PedidoRepository;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pRepository;

    public Pedido savePedido(Pedido pedidoEntra) {
        return pRepository.save(pedidoEntra);
    }

    public Pedido editPedido(Pedido pedidoEntra) throws RelationTypeNotFoundException {
        Pedido editado = pRepository.findById(pedidoEntra.getId())
            .orElseThrow(() -> new RelationTypeNotFoundException("Pedido não existe com id :" + pedidoEntra.getId()));
        
        editado.setId(pedidoEntra.getId());
        editado.setCliente(pedidoEntra.getCliente());
        // editado.setTipoLavagem(pedidoEntra.getTipoLavagem());
        editado.setMaquinas(pedidoEntra.getMaquinas());
        editado.setProdutos(pedidoEntra.getProdutos());
        editado.setFuncionario(pedidoEntra.getFuncionario());
        editado.setEntrega(pedidoEntra.isEntrega());
        editado.setPesoRoupa(pedidoEntra.getPesoRoupa());
        editado.setValorTotal(pedidoEntra.getValorTotal());
        return pRepository.save(editado);
    }

    public Pedido editPedidoPara0(Pedido pedidoEntra) throws RelationTypeNotFoundException {
        Pedido editado = pRepository.findById(pedidoEntra.getId())
            .orElseThrow(() -> new RelationTypeNotFoundException("Pedido não existe com id :" + pedidoEntra.getId()));
        
        editado.setStatus(0);
        return pRepository.save(editado);
    }

    public Pedido editPedidoPara1(Pedido pedidoEntra) throws RelationTypeNotFoundException {
        Pedido editado = pRepository.findById(pedidoEntra.getId())
            .orElseThrow(() -> new RelationTypeNotFoundException("Pedido não existe com id :" + pedidoEntra.getId()));
        
        editado.setStatus(1);
        return pRepository.save(editado);
    }

    public Pedido editPedidoPara2(Pedido pedidoEntra) throws RelationTypeNotFoundException {
        Pedido editado = pRepository.findById(pedidoEntra.getId())
            .orElseThrow(() -> new RelationTypeNotFoundException("Pedido não existe com id :" + pedidoEntra.getId()));
        
        editado.setStatus(2);
        return pRepository.save(editado);
    }

    public List<Pedido> listPedido() {
        return pRepository.findAll();
    }

    public List<Pedido> listPedidoStatus0() {
        return pRepository.findByStatusInicio();
    }

    public List<Pedido> listPedidoStatus1() {
        return pRepository.findByStatusAndam();
    }

    public List<Pedido> listPedidoStatus2() {
        return pRepository.findByStatusConclui();
    }

    public Pedido listIdPedido(Long id) throws RelationTypeNotFoundException {
        return pRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Pedido não existe com id :" + id));
    }

    public void deleteIdPedido(Long id) throws RelationTypeNotFoundException {
        Pedido pedido = pRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Pedido não existe com id :" + id));  
        pRepository.delete(pedido);
    }
}
