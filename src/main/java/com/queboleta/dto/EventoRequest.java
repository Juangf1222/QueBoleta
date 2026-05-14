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

    // 🔥 ESTE ES EL QUE TE FALTABA (muy probable)
    private EstadoEvento estado;

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
}