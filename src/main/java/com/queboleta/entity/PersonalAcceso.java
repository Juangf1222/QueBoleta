package com.queboleta.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("PERSONAL_ACCESO")
public class PersonalAcceso extends Usuario {

    @Column(name = "evento_asignado")
    private String eventoAsignado;

    @Transient
    private List<String> asistentes = new ArrayList<>();

    public PersonalAcceso() {}

    public PersonalAcceso(String nombre, String correo, String contraseña, String eventoAsignado) {
        this.setNombre(nombre);
        this.setCorreo(correo);
        this.setContraseña(contraseña);
        this.setRol(com.queboleta.enums.Rol.PERSONAL_ACCESO);
        this.eventoAsignado = eventoAsignado;
    }

    // Métodos del diagrama
    public boolean validarQR(String codigoQR) {
        System.out.println("Validando QR: " + codigoQR);
        return codigoQR != null && !codigoQR.isEmpty();
    }

    public List<String> verAsistentes() {
        return asistentes;
    }

    // Getters y Setters
    public String getEventoAsignado() { return eventoAsignado; }
    public void setEventoAsignado(String eventoAsignado) { this.eventoAsignado = eventoAsignado; }

    public List<String> getAsistentes() { return asistentes; }
    public void setAsistentes(List<String> asistentes) { this.asistentes = asistentes; }
}