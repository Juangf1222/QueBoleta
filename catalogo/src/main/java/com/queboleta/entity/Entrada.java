package com.queboleta.entity;

import com.queboleta.enums.EstadoEntrada;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "entrada")
public class Entrada {

    @Id
    @Column(name = "id_entrada", length = 36)
    private String idEntrada;

    @Column(name = "codigo_qr", length = 255)
    private String codigoQR;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 20)
    private EstadoEntrada estado = EstadoEntrada.ACTIVA;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propietario", nullable = false)
    private Usuario propietario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    @PrePersist
    public void generarId() {
        if (this.idEntrada == null) {
            this.idEntrada = UUID.randomUUID().toString();
        }
    }

    // Método del diagrama
    public String generarQR() {
        this.codigoQR = "QB-" + idEntrada + "-" + System.currentTimeMillis();
        return this.codigoQR;
    }

    // Getters y Setters
    public String getIdEntrada() { return idEntrada; }
    public void setIdEntrada(String idEntrada) { this.idEntrada = idEntrada; }

    public String getCodigoQR() { return codigoQR; }
    public void setCodigoQR(String codigoQR) { this.codigoQR = codigoQR; }

    public EstadoEntrada getEstado() { return estado; }
    public void setEstado(EstadoEntrada estado) { this.estado = estado; }

    public Usuario getPropietario() { return propietario; }
    public void setPropietario(Usuario propietario) { this.propietario = propietario; }

    public Evento getEvento() { return evento; }
    public void setEvento(Evento evento) { this.evento = evento; }
}