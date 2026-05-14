package com.queboleta.service;

import com.queboleta.dto.CompraRequest;
import com.queboleta.dto.CompraResponse;
import com.queboleta.entity.*;
import com.queboleta.enums.EstadoEntrada;
import com.queboleta.enums.EstadoTransaccion;
import com.queboleta.repository.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompraService {

    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;
    private final TransaccionRepository transaccionRepository;
    private final EntradaRepository entradaRepository;

    public CompraService(EventoRepository eventoRepository,
                         UsuarioRepository usuarioRepository,
                         TransaccionRepository transaccionRepository,
                         EntradaRepository entradaRepository) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
        this.transaccionRepository = transaccionRepository;
        this.entradaRepository = entradaRepository;
    }

    public CompraResponse realizarCompra(CompraRequest request) {

        Evento evento = eventoRepository.findById(request.getIdEvento())
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        Usuario usuario = usuarioRepository.findByCorreo(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (evento.getDisponibilidad() < request.getCantidad()) {
            throw new RuntimeException("No hay suficientes entradas disponibles");
        }

        Transaccion transaccion = new Transaccion();
        transaccion.setUsuario(usuario);
        transaccion.setEvento(evento);
        transaccion.setCantidadBoletos(request.getCantidad());

        double total = evento.getPrecio() * request.getCantidad();
        transaccion.setValorTotal(total);
        transaccion.setEstado(EstadoTransaccion.COMPLETADA);

        transaccionRepository.save(transaccion);

        evento.setDisponibilidad(evento.getDisponibilidad() - request.getCantidad());
        eventoRepository.save(evento);

        List<String> codigosQR = new ArrayList<>();

        for (int i = 0; i < request.getCantidad(); i++) {
            Entrada entrada = new Entrada();
            entrada.setEvento(evento);
            entrada.setPropietario(usuario);
            entrada.setEstado(EstadoEntrada.ACTIVA);

            entrada.generarQR();

            entradaRepository.save(entrada);

            codigosQR.add(entrada.getCodigoQR());
        }

        CompraResponse response = new CompraResponse();
        response.setIdTransaccion(transaccion.getIdTransaccion());
        response.setEstado("COMPLETADA");
        response.setCantidadEntradas(request.getCantidad());
        response.setTotal(total);
        response.setCodigosQR(codigosQR);
        response.setNombreEvento(evento.getNombre());
        response.setMensaje("Compra realizada con éxito");

        return response;
    }
}