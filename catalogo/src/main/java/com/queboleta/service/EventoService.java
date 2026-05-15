package com.queboleta.service;

import com.queboleta.dto.EventoRequest;
import com.queboleta.dto.EventoResponse;
import com.queboleta.entity.Evento;
import com.queboleta.enums.EstadoEvento;
import com.queboleta.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * TAREA 3: Servicio para crear, editar, eliminar y visualizar eventos.
 */
@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    

    // Crear evento (solo Administrador)
    public EventoResponse crearEvento(EventoRequest request) {
        Evento evento = new Evento();
        mapearCampos(evento, request);
        eventoRepository.save(evento);
        evento.generarEnlace();
        eventoRepository.save(evento);
        return EventoResponse.fromEntity(evento);
    }

    // Ver todos los eventos disponibles (público)
    public List<EventoResponse> listarEventosActivos() {
        return eventoRepository.findByEstado(EstadoEvento.ACTIVO)
                .stream()
                .map(EventoResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Ver todos los eventos (solo Administrador)
    public List<EventoResponse> listarTodosLosEventos() {
        return eventoRepository.findAll()
                .stream()
                .map(EventoResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Ver un evento por ID
    public EventoResponse obtenerEventoPorId(String idEvento) {
        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado: " + idEvento));
        return EventoResponse.fromEntity(evento);
    }

    // Buscar eventos por nombre
    public List<EventoResponse> buscarPorNombre(String nombre) {
        return eventoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(EventoResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Editar evento (solo Administrador)
    public EventoResponse editarEvento(String idEvento, EventoRequest request) {
        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado: " + idEvento));
        mapearCampos(evento, request);
        eventoRepository.save(evento);
        return EventoResponse.fromEntity(evento);
    }

    // Eliminar evento (solo Administrador)
    public void eliminarEvento(String idEvento) {
        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado: " + idEvento));
        evento.setEstado(EstadoEvento.CANCELADO);
        eventoRepository.save(evento);
    }

    // Privado: mapea campos del request a la entidad
    private void mapearCampos(Evento evento, EventoRequest request) {
        evento.setNombre(request.getNombre());
        evento.setArtista(request.getArtista());
        evento.setLugar(request.getLugar());
        evento.setFechaHora(request.getFechaHora());
        evento.setSinopsis(request.getSinopsis());
        evento.setPrecio(request.getPrecio());
        evento.setAforoDisponible(request.getAforoDisponible());
        evento.setDisponibilidad(request.getAforoDisponible());
        evento.setEstado(request.getEstado() != null ? request.getEstado() : EstadoEvento.ACTIVO);
    }

    
}