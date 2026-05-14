package com.queboleta.service;

import com.queboleta.enums.TipoNotif;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "notificacion")
public class NotificacionService {

    @Id
    @Column(name = "id_notif", length = 36)
    private String idNotif;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_notif", nullable = false, length = 30)
    private TipoNotif tipoNotif;

    @Column(name = "destinatario", nullable = false, length = 100)
    private String destinatario;

    @Column(name = "contenido", columnDefinition = "TEXT")
    private String contenido;

    @Column(name = "estado")
    private boolean estado = false;

    @PrePersist
    public void generarId() {
        if (this.idNotif == null) {
            this.idNotif = UUID.randomUUID().toString();
        }
    }

    // Método del diagrama
    public void generarCorreo() {
        System.out.printf("Enviando correo a: %s%nTipo: %s%nContenido: %s%n",
                destinatario, tipoNotif, contenido);
        this.estado = true;
    }

    // Getters y Setters
    public String getIdNotif() { return idNotif; }
    public void setIdNotif(String idNotif) { this.idNotif = idNotif; }

    public TipoNotif getTipoNotif() { return tipoNotif; }
    public void setTipoNotif(TipoNotif tipoNotif) { this.tipoNotif = tipoNotif; }

    public String getDestinatario() { return destinatario; }
    public void setDestinatario(String destinatario) { this.destinatario = destinatario; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public boolean isEstado() { return estado; }
    public void setEstado(boolean estado) { this.estado = estado; }
}