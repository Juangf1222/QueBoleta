
package com.queboleta.dto;

import com.queboleta.entity.Evento;
import com.queboleta.enums.EstadoEvento;

import java.time.LocalDateTime;

public class EventoResponse {

    private String idEvento;
    private String nombre;
    private String artista;
    private String lugar;
    private LocalDateTime fechaHora;
    private String sinopsis;
    private double precio;
    private int aforoDisponible;
    private int disponibilidad;
    private EstadoEvento estado;
    private String enlace;

    // Getters y Setters
    public String getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(String idEvento) {
        this.idEvento = idEvento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getArtista() {
        return artista;
    }

    public void setArtista(String artista) {
        this.artista = artista;
    }

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getSinopsis() {
        return sinopsis;
    }

    public void setSinopsis(String sinopsis) {
        this.sinopsis = sinopsis;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getAforoDisponible() {
        return aforoDisponible;
    }

    public void setAforoDisponible(int aforoDisponible) {
        this.aforoDisponible = aforoDisponible;
    }

    public int getDisponibilidad() {
        return disponibilidad;
    }

    public void setDisponibilidad(int disponibilidad) {
        this.disponibilidad = disponibilidad;
    }

    public EstadoEvento getEstado() {
        return estado;
    }

    public void setEstado(EstadoEvento estado) {
        this.estado = estado;
    }

    public String getEnlace() {
        return enlace;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    public static EventoResponse fromEntity(Evento evento) {

    EventoResponse response = new EventoResponse();

    response.setIdEvento(evento.getIdEvento());
    response.setNombre(evento.getNombre());
    response.setArtista(evento.getArtista());
    response.setLugar(evento.getLugar());
    response.setFechaHora(evento.getFechaHora());
    response.setSinopsis(evento.getSinopsis());
    response.setPrecio(evento.getPrecio());
    response.setAforoDisponible(evento.getAforoDisponible());
    response.setDisponibilidad(evento.getDisponibilidad());
    response.setEstado(evento.getEstado());
    response.setEnlace(evento.getEnlace());

    return response;
}
}