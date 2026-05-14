package com.queboleta.dto;

import jakarta.validation.constraints.*;

public class CompraRequest {
    
    @NotBlank(message = "ID del evento es obligatori")
    private String idEvento;
    
    @Positive(message = "La cantidad debe ser mayor a 0")
    private int cantidad;
    
    @NotBlank(message = "Método de pago es obligatorio")
    private String metodoPago;
    
    @NotBlank(message = "Email es obligatorio")
    @Email(message = "Email inválido")
    private String email;
    
    @NotBlank(message = "Nombre es obligatorio")
    private String nombre;
    
    // Datos de tarjeta para simulación
    @NotBlank(message = "Número de tarjeta es obligatorio")
    @Pattern(regexp = "^[0-9]{16}$", message = "Tarjeta debe tener 16 dígitos")
    private String numeroTarjeta;
    
    @NotBlank(message = "CVV es obligatorio")
    @Pattern(regexp = "^[0-9]{3,4}$", message = "CVV debe tener 3 o 4 dígitos")
    private String cvv;
    
    // Getters y Setters
    public String getIdEvento() { return idEvento; }
    public void setIdEvento(String idEvento) { this.idEvento = idEvento; }
    
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    
    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getNumeroTarjeta() { return numeroTarjeta; }
    public void setNumeroTarjeta(String numeroTarjeta) { this.numeroTarjeta = numeroTarjeta; }
    
    public String getCvv() { return cvv; }
    public void setCvv(String cvv) { this.cvv = cvv; }
}