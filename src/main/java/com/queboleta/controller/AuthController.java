package com.queboleta.controller;

import com.queboleta.dto.AuthResponse;
import com.queboleta.dto.LoginRequest;
import com.queboleta.dto.RegistroRequest;
import com.queboleta.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * TAREA 2: Endpoints de registro e inicio de sesión.
 *
 * POST /api/auth/registro  → Registrar nuevo usuario (CLIENTE, ADMINISTRADOR, PERSONAL_ACCESO)
 * POST /api/auth/login     → Iniciar sesión y obtener token JWT
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registrar(@Valid @RequestBody RegistroRequest request) {
        AuthResponse response = usuarioService.registrar(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = usuarioService.login(request);
        return ResponseEntity.ok(response);
    }
}