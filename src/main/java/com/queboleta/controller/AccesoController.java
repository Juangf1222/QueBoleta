/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.queboleta.controller;

import com.queboleta.service.EntradaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/acceso")
@CrossOrigin(origins = "*")
public class AccesoController {

    private final EntradaService entradaService;

    public AccesoController(EntradaService entradaService) {
        this.entradaService = entradaService;
    }

    /**
     * SOLO PERSONAL_ACCESO puede validar entradas
     */
    @PostMapping("/validar")
    @PreAuthorize("hasRole('PERSONAL_ACCESO')")
    public ResponseEntity<String> validarQR(@RequestParam String qr) {

        boolean valido = entradaService.validarEntrada(qr);

        if (valido) {
            return ResponseEntity.ok("Acceso permitido");
        } else {
            return ResponseEntity.badRequest().body("Entrada inválida o ya usada");
        }
    }
}