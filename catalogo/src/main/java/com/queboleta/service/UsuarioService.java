package com.queboleta.service;

import com.queboleta.config.JwtUtils;

import com.queboleta.dto.AuthResponse;
import com.queboleta.dto.LoginRequest;
import com.queboleta.dto.RegistroRequest;

import com.queboleta.entity.Administrador;
import com.queboleta.entity.Cliente;
import com.queboleta.entity.PersonalAcceso;
import com.queboleta.entity.Usuario;

import com.queboleta.enums.Rol;

import com.queboleta.repository.UsuarioRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils,
            AuthenticationManager authenticationManager) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    // =========================================
    // REGISTRO
    // =========================================
    public AuthResponse registrar(
            RegistroRequest request) {

        // Verificar si el correo ya existe
        if (usuarioRepository
                .findByCorreo(request.getCorreo())
                .isPresent()) {

            throw new RuntimeException(
                    "El correo ya está registrado"
            );
        }

        // Crear usuario según rol
        Usuario usuario =
                crearUsuarioSegunRol(request);

        // Asignar datos
        usuario.setNombre(request.getNombre());

        usuario.setCorreo(request.getCorreo());

        usuario.setContraseña(
                passwordEncoder.encode(
                        request.getContraseña()
                )
        );

        // Asignar rol
        usuario.setRol(request.getRol());

        // Guardar usuario
        usuarioRepository.save(usuario);

        // Generar JWT
        String jwtToken =
                jwtUtils.generarToken(usuario);

        return new AuthResponse(
                jwtToken,
                usuario.getNombre(),
                usuario.getCorreo(),
                "Usuario registrado correctamente"
        );
    }

    // =========================================
    // LOGIN
    // =========================================
    public AuthResponse login(
            LoginRequest request) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getCorreo(),
                        request.getContraseña()
                )
        );

        Usuario usuario =
                usuarioRepository
                        .findByCorreo(
                                request.getCorreo()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );

        // Generar JWT
        String jwtToken = jwtUtils.generarToken(usuario);

        return new AuthResponse(
                jwtToken,
                usuario.getNombre(),
                usuario.getCorreo(),
                "Login exitoso"
        );
    }

    // =========================================
    // CREAR USUARIO SEGÚN ROL
    // =========================================
    private Usuario crearUsuarioSegunRol(
            RegistroRequest request) {

        Rol rol = request.getRol();

        return switch (rol) {

            case CLIENTE ->
                    new Cliente();

            case ADMINISTRADOR ->
                    new Administrador();

            case PERSONAL_ACCESO ->
                    new PersonalAcceso();
        };
    }
}