package com.queboleta.controller;

import com.queboleta.entity.Entrada;
import com.queboleta.service.EntradaService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entradas")
@CrossOrigin(origins = "*")
public class EntradaController {

    private final EntradaService entradaService;

    // =========================================
    // CONSTRUCTOR
    // =========================================
    public EntradaController(
            EntradaService entradaService) {

        this.entradaService = entradaService;
    }

    // =========================================
    // OBTENER ENTRADAS DEL USUARIO
    // =========================================
    @GetMapping("/mis-entradas")
    public ResponseEntity<List<Entrada>> obtenerMisEntradas(
            Authentication authentication) {

        String correo =
                authentication.getName();

        List<Entrada> entradas =
                entradaService.obtenerEntradasPorUsuario(correo);

        return ResponseEntity.ok(entradas);
    }

    @GetMapping("/validar")
    public ResponseEntity<Entrada> validarQR(
        @RequestParam String codigoQR) {

    Entrada entrada =
            entradaService.validarQR(codigoQR);

    return ResponseEntity.ok(entrada);
}
}