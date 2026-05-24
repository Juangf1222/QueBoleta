package com.queboleta.dto;

import com.queboleta.enums.EstadoEvento;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class EventoRequest {

    @NotBlank
    private String nombre;

    @NotBlank
    private String artista;

    @NotBlank
    private String lugar;

    @NotNull
    private LocalDateTime fechaHora;

    private String sinopsis;

    @Positive
    private double precio;

    @Positive
    private int aforoDisponible;

    private EstadoEvento estado;

    // 🔥 EL NUEVO CAMPO: Para recibir la categoría desde el frontend
    private Integer idCategoria;

    private String enlace;

    // ===== GETTERS Y SETTERS =====

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

    public EstadoEvento getEstado() { return estado; }
    public void setEstado(EstadoEvento estado) { this.estado = estado; }

    // 🔥 GETTER Y SETTER DE LA CATEGORÍA
    public Integer getIdCategoria() { return idCategoria; }
    public void setIdCategoria(Integer idCategoria) { this.idCategoria = idCategoria; }

    public String getEnlace() {
        return enlace;
    }
    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }
}