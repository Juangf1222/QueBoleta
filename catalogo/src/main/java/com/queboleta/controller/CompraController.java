package com.queboleta.controller;

import com.queboleta.dto.CompraRequest;
import com.queboleta.dto.CompraResponse;
import com.queboleta.entity.Transaccion;
import com.queboleta.service.CompraService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @PostMapping
    public ResponseEntity<CompraResponse> comprar(@Valid @RequestBody CompraRequest request) {
        return ResponseEntity.ok(compraService.realizarCompra(request));
    }


}