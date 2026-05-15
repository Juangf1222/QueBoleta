package com.queboleta.service;

import com.queboleta.dto.ReporteEventoDTO;
import com.queboleta.repository.EventoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    private final EventoRepository eventoRepository;

    public ReporteService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public List<ReporteEventoDTO> obtenerReportesDashboard() {
        return eventoRepository.findAll().stream().map(evento -> {
            ReporteEventoDTO dto = new ReporteEventoDTO();
            dto.setIdEvento(evento.getIdEvento());
            dto.setNombreEvento(evento.getNombre());
            dto.setAforoTotal(evento.getAforoDisponible() + evento.getDisponibilidad()); // Calculo base

            int vendidas = evento.getAforoDisponible() - evento.getDisponibilidad();
            dto.setEntradasVendidas(vendidas);
            dto.setIngresosTotales(vendidas * evento.getPrecio());
            dto.setEstado(evento.getEstado().name());
            return dto;
        }).collect(Collectors.toList());
    }
}