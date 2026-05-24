package com.queboleta.controller;

import com.queboleta.dto.EventoRequest;
import com.queboleta.dto.EventoResponse;
import com.queboleta.entity.Evento;
import com.queboleta.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    // Público: ver eventos activos
    @GetMapping
    public ResponseEntity<List<EventoResponse>> listarEventosActivos() {
        return ResponseEntity.ok(eventoService.listarEventosActivos());
    }

    // Solo ADMINISTRADOR: ver todos los eventos
    @GetMapping("/todos")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<EventoResponse>> listarTodos() {
        return ResponseEntity.ok(eventoService.listarTodosLosEventos());
    }

    // Público: ver un evento por ID
    @GetMapping("/{id}")
    public ResponseEntity<EventoResponse> obtenerEvento(@PathVariable String id) {
        return ResponseEntity.ok(eventoService.obtenerEventoPorId(id));
    }

    // Público: buscar por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<EventoResponse>> buscar(@RequestParam String nombre) {
        return ResponseEntity.ok(eventoService.buscarPorNombre(nombre));
    }

    // Público: ver eventos próximos
    @GetMapping("/proximos")
    public ResponseEntity<List<EventoResponse>> listarEventosProximos() {
        return ResponseEntity.ok(eventoService.listarEventosProximos());
    }

    // Solo ADMINISTRADOR: crear evento
    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<EventoResponse> crearEvento(@Valid @RequestBody EventoRequest request) {
        EventoResponse response = eventoService.crearEvento(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Solo ADMINISTRADOR: editar evento
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<EventoResponse> editarEvento(@PathVariable String id,
                                                        @Valid @RequestBody EventoRequest request) {
        return ResponseEntity.ok(eventoService.editarEvento(id, request));
    }

    // Solo ADMINISTRADOR: cancelar/eliminar evento
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Void> eliminarEvento(@PathVariable String id) {
        eventoService.eliminarEvento(id);
        return ResponseEntity.noContent().build();
    }

}