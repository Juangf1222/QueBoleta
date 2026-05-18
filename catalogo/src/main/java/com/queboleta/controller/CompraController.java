package com.queboleta.controller;

import com.queboleta.dto.CompraRequest;
import com.queboleta.dto.CompraResponse;
import com.queboleta.service.CompraService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    // 🔥 EL CAMBIO ESTÁ AQUÍ: Dejamos pasar a cualquier usuario que haya iniciado sesión
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<CompraResponse> comprar(@Valid @RequestBody CompraRequest request) {
        return ResponseEntity.ok(compraService.realizarCompra(request));
    }
}