package com.queboleta.service;

import org.springframework.stereotype.Service;

import com.queboleta.entity.Entrada;
import com.queboleta.entity.Evento;
import com.queboleta.entity.Usuario;
import com.queboleta.enums.EstadoEntrada;
import com.queboleta.repository.EntradaRepository;
import com.queboleta.repository.UsuarioRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EntradaService {

    private final EntradaRepository entradaRepository;
    private final UsuarioRepository usuarioRepository;

    // =========================================
    // CONSTRUCTOR
    // =========================================
    public EntradaService(
            EntradaRepository entradaRepository,
            UsuarioRepository usuarioRepository) {

        this.entradaRepository = entradaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // =========================================
    // VALIDAR QR
    // =========================================
    public Entrada validarQR(String codigoQR) {

        Entrada entrada = entradaRepository
                .findByCodigoQR(codigoQR)
                .orElseThrow(() ->
                        new RuntimeException("QR no válido")
                );

        return entrada;
    }

    // =========================================
    // CREAR ENTRADA
    // =========================================
    public void crearEntrada(
            Evento evento,
            Usuario usuario) {

        Entrada entrada = new Entrada();

        entrada.setEvento(evento);

        entrada.setPropietario(usuario);

        entrada.setEstado(EstadoEntrada.ACTIVA);

        entrada.generarDatos();

        entradaRepository.save(entrada);
    }

    // =========================================
    // GENERAR QR
    // =========================================
    public String generarCodigoQR(
            Entrada entrada) {

        entrada.generarDatos();
        return entrada.getCodigoQR();
    }

    // =========================================
    // CAMBIAR ESTADO
    // =========================================
    public void cambiarEstado(
            String idEntrada,
            EstadoEntrada nuevoEstado) {

        Entrada entrada = entradaRepository
                .findById(idEntrada)
                .orElseThrow(() ->
                        new RuntimeException("Entrada no encontrada")
                );

        entrada.setEstado(nuevoEstado);

        entradaRepository.save(entrada);
    }

    // =========================================
    // OBTENER ENTRADAS DEL USUARIO
    // =========================================
    public List<Entrada> obtenerEntradasPorUsuario(
            String correo) {

        Usuario usuario = usuarioRepository
                .findByCorreo(correo)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado"
                        )
                );

        return entradaRepository
                .findByPropietario_IdUsuario(
                        usuario.getIdUsuario()
                );
    }

    // =========================================
    // OBTENER ENTRADAS POR EVENTO
    // =========================================
    public List<Entrada> obtenerEntradasPorEvento(
            String idEvento) {

        return new ArrayList<>();
    }

    // =========================================
    // VALIDAR ENTRADA
    // =========================================
    public boolean validarEntrada(
            String codigoQR) {

        Entrada entrada = entradaRepository
                .findByCodigoQR(codigoQR)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Entrada no encontrada"
                        )
                );

        if (entrada.getEstado()
                == EstadoEntrada.USADA) {

            return false;
        }

        entrada.setEstado(EstadoEntrada.USADA);

        entradaRepository.save(entrada);

        return true;
    }
}