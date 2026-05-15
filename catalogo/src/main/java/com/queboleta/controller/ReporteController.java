package com.queboleta.controller;

import com.queboleta.dto.ReporteEventoDTO;
import com.queboleta.service.ReporteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<ReporteEventoDTO>> verVentasPorEvento() {
        return ResponseEntity.ok(reporteService.obtenerReportesDashboard());
    }
}