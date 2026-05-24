package com.queboleta.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty; // 🔥 IMPORTANTE: La importación nueva
import com.queboleta.enums.EstadoEvento;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * TAREA 3: Entidad Evento - soporta crear, editar, eliminar y visualizar eventos.
 */
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "evento")
public class Evento {

    @Id
    @Column(name = "id_evento", length = 36)
    private String idEvento;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @NotBlank(message = "El artista es obligatorio")
    @Column(name = "artista", nullable = false, length = 100)
    private String artista;

    @NotBlank(message = "El lugar es obligatorio")
    @Column(name = "lugar", nullable = false, length = 150)
    private String lugar;

    @NotNull(message = "La fecha y hora son obligatorias")
    @Future(message = "La fecha debe ser futura")
    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;

    @Column(name = "sinopsis", columnDefinition = "TEXT")
    private String sinopsis;

    @Positive(message = "El precio debe ser mayor a 0")
    @Column(name = "precio", nullable = false)
    private double precio;

    @Positive(message = "El aforo debe ser mayor a 0")
    @Column(name = "aforo_disponible", nullable = false)
    private int aforoDisponible;

    @Column(name = "disponibilidad", nullable = false)
    private int disponibilidad;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 20)
    private EstadoEvento estado = EstadoEvento.ACTIVO;

    @Column(name = "enlace", length = 255)
    private String enlace;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @PrePersist
    public void generarId() {
        if (this.idEvento == null) {
            this.idEvento = UUID.randomUUID().toString();
        }
        this.disponibilidad = this.aforoDisponible;
    }

    public int consultarDisponibilidad() {
        return this.disponibilidad;
    }

    public void actualizarStock() {
        if (this.disponibilidad > 0) {
            this.disponibilidad--;
        }
    }

    public String mostrarInfo() {
        return String.format("Evento: %s | Artista: %s | Lugar: %s | Fecha: %s | Precio: $%.2f | Disponibles: %d",
                nombre, artista, lugar, fechaHora, precio, disponibilidad);
    }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    // Getters y Setters
    public String getIdEvento() { return idEvento; }
    public void setIdEvento(String idEvento) { this.idEvento = idEvento; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getArtista() { return artista; }
    public void setArtista(String artista) { this.artista = artista; }

    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }

    public String getSinopsis() { return sinopsis; }
    public void setSinopsis(String sinopsis) { this.sinopsis = sinopsis; }

    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }

    public int getAforoDisponible() { return aforoDisponible; }
    public void setAforoDisponible(int aforoDisponible) { this.aforoDisponible = aforoDisponible; }

    public int getDisponibilidad() { return disponibilidad; }
    public void setDisponibilidad(int disponibilidad) { this.disponibilidad = disponibilidad; }

    public EstadoEvento getEstado() { return estado; }
    public void setEstado(EstadoEvento estado) { this.estado = estado; }

    public String getEnlace() { return enlace; }
    public void setEnlace(String enlace) { this.enlace = enlace; }

    // 🔥 ETIQUETA MÁGICA: Obliga a Spring Boot a enviar este dato al frontend sí o sí
    @JsonProperty("idCategoria")
    public Integer getIdCategoria() {
        if (this.categoria != null) {
            return this.categoria.getIdCategoria();
        }
        return null;
    }
}