package com.queboleta.entity;
import com.queboleta.enums.EstadoTransaccion;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transaccion")
public class Transaccion {

    @Id
    @Column(name = "id_transaccion", length = 36)
    private String idTransaccion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    @Column(name = "cantidad_boletos", nullable = false)
    private int cantidadBoletos;

    @Column(name = "valor_total", nullable = false)
    private double valorTotal;

    @Column(name = "fecha_transaccion", nullable = false)
    private LocalDateTime fechaTransaccion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoTransaccion estado;

    // =========================
    // MÉTODOS DE NEGOCIO
    // =========================

    /**
     * Realizar compra
     */
    public void realizarCompra() {

        if (evento.getDisponibilidad() < cantidadBoletos) {
            throw new RuntimeException("No hay suficientes boletos disponibles");
        }

        // Descontar boletos
        evento.setDisponibilidad(evento.getDisponibilidad() - cantidadBoletos);

        // Calcular total
        this.valorTotal = evento.getPrecio() * cantidadBoletos;

        this.estado = EstadoTransaccion.COMPLETADA;
    }

    /**
     * Solicitar reembolso
     */
    public void solicitarReembolso() {

        if (this.estado != EstadoTransaccion.COMPLETADA) {
            throw new RuntimeException("La transacción no puede ser reembolsada");
        }

        // Devolver boletos al evento
        evento.setDisponibilidad(evento.getDisponibilidad() + cantidadBoletos);

        this.estado = EstadoTransaccion.REEMBOLSADA;
    }

    // =========================
    // AUTOMÁTICOS
    // =========================

    @PrePersist
    public void generarDatos() {
        if (this.idTransaccion == null) {
            this.idTransaccion = UUID.randomUUID().toString();
        }

        if (this.fechaTransaccion == null) {
            this.fechaTransaccion = LocalDateTime.now();
        }

        if (this.estado == null) {
            this.estado = EstadoTransaccion.COMPLETADA;
        }
    }

    // =========================
    // GETTERS Y SETTERS
    // =========================

    public String getIdTransaccion() {
        return idTransaccion;
    }

    public void setIdTransaccion(String idTransaccion) {
        this.idTransaccion = idTransaccion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public int getCantidadBoletos() {
        return cantidadBoletos;
    }

    public void setCantidadBoletos(int cantidadBoletos) {
        this.cantidadBoletos = cantidadBoletos;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public LocalDateTime getFechaTransaccion() {
        return fechaTransaccion;
    }

    public void setFechaTransaccion(LocalDateTime fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion;
    }

    public EstadoTransaccion getEstado() {
        return estado;
    }

    public void setEstado(EstadoTransaccion estado) {
        this.estado = estado;
    }
}