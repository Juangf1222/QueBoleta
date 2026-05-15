package com.queboleta.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("ADMINISTRADOR")
public class Administrador extends Usuario {

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private List<Evento> eventosDisponibles = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private List<Reporte> reportes = new ArrayList<>();

    public Administrador() {}

    public Administrador(String nombre, String correo, String contraseña) {
        this.setNombre(nombre);
        this.setCorreo(correo);
        this.setContraseña(contraseña);
        this.setRol(com.queboleta.enums.Rol.ADMINISTRADOR);
    }

    // Métodos del diagrama
    public void crearEvento(Evento evento) {
        eventosDisponibles.add(evento);
    }

    public void editarEvento(Evento evento) {
        System.out.println("Evento editado: " + evento.getNombre());
    }

    public void eliminarEvento(Evento evento) {
        eventosDisponibles.remove(evento);
    }

    public void agregarReporte(Reporte reporte) {
        reportes.add(reporte);
    }

    public List<Reporte> verReportes() {
        return reportes;
    }

    public void gestionarReembolso(Transaccion transaccion) {
        transaccion.solicitarReembolso();
    }

    // Getters y Setters
    public List<Evento> getEventosDisponibles() { return eventosDisponibles; }
    public void setEventosDisponibles(List<Evento> eventosDisponibles) { this.eventosDisponibles = eventosDisponibles; }

    public List<Reporte> getReportes() { return reportes; }
    public void setReportes(List<Reporte> reportes) { this.reportes = reportes; }
}