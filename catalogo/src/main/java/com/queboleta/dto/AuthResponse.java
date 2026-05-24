package com.queboleta.dto;

public class AuthResponse {

    private String token;
    private String nombre;
    private String correo;
    private String mensaje;

    public AuthResponse() {
    }

    public AuthResponse(String token, String nombre, String correo, String mensaje) {
        this.token = token;
        this.nombre = nombre;
        this.correo = correo;
        this.mensaje = mensaje;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getCorreo() {
        return correo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}