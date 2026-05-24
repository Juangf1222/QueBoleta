package com.queboleta.controller;

import com.queboleta.entity.Usuario;
import com.queboleta.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/perfil")
    public ResponseEntity<Usuario> obtenerPerfil(
            Authentication authentication) {

        String correo = authentication.getName();

        Usuario usuario = usuarioRepository
                .findByCorreo(correo)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado")
                );

        return ResponseEntity.ok(usuario);
    }
}