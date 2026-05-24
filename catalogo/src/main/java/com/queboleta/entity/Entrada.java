package com.queboleta.entity;

import com.queboleta.enums.EstadoEntrada;
import jakarta.persistence.*;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "propietario", nullable = false)
   @JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler",
        "entradasActivas"
    })
    private Usuario propietario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_evento", nullable = false)
    @JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler"
    })
    private Evento evento;

    @PrePersist
public void generarDatos() {

    // Generar ID
    if (this.idEntrada == null) {
        this.idEntrada = UUID.randomUUID().toString();
    }

    // Generar QR
    if (this.codigoQR == null) {
        this.codigoQR =
                "QB-" + this.idEntrada + "-" + System.currentTimeMillis();
    }
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