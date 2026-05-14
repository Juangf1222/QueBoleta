package com.queboleta.repository;

import com.queboleta.entity.Evento;
import com.queboleta.enums.EstadoEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, String> {
    List<Evento> findByEstado(EstadoEvento estado);
    List<Evento> findByNombreContainingIgnoreCase(String nombre);
}
