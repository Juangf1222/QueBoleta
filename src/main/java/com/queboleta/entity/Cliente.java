package com.queboleta.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("CLIENTE")
public class Cliente extends Usuario {

    @OneToMany(mappedBy = "propietario", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Entrada> entradasActivas = new ArrayList<>();

    public Cliente() {}

    public Cliente(String nombre, String correo, String contraseña) {
        this.setNombre(nombre);
        this.setCorreo(correo);
        this.setContraseña(contraseña);
        this.setRol(com.queboleta.enums.Rol.CLIENTE);
    }

    // Métodos del diagrama
    public List<Entrada> verHistorial() {
        return entradasActivas;
    }

    public void comprarEntrada(Evento evento) {
        System.out.println("Comprando entrada para: " + evento.getNombre());
    }

    // Getters y Setters
    public List<Entrada> getEntradasActivas() { return entradasActivas; }
    public void setEntradasActivas(List<Entrada> entradasActivas) { this.entradasActivas = entradasActivas; }
}