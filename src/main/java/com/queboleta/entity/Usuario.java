package com.queboleta.entity;

import com.queboleta.enums.Rol;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * TAREA 1 + 2: Entidad base abstracta del diagrama de clases.
 * Usa herencia SINGLE_TABLE para mapear Cliente, Administrador y PersonalAcceso
 * en una sola tabla. Implementa UserDetails para Spring Security.
 */
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "rol", discriminatorType = DiscriminatorType.STRING)
public abstract class Usuario implements UserDetails {

    @Id
    @Column(name = "id_usuario", length = 36)
    private String idUsuario;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Email(message = "Correo inválido")
    @NotBlank(message = "El correo es obligatorio")
    @Column(name = "correo", nullable = false, unique = true, length = 100)
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    @Column(name = "contrasena", nullable = false)
    private String contraseña;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", insertable = false, updatable = false)
    private Rol rol;

    @PrePersist
    public void generarId() {
        if (this.idUsuario == null) {
            this.idUsuario = UUID.randomUUID().toString();
        }
    }

    // Método del diagrama
    public void modificarUsuario(String nombre, String correo, String contraseña) {
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    // ---- UserDetails (Spring Security) ----
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + rol.name()));
    }

    @Override
    public String getPassword() { return contraseña; }

    @Override
    public String getUsername() { return correo; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    // ---- Getters y Setters ----
    public String getIdUsuario() { return idUsuario; }
    public void setIdUsuario(String idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContraseña() { return contraseña; }
    public void setContraseña(String contraseña) { this.contraseña = contraseña; }

    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }
}