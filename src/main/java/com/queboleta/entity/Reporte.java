package com.queboleta.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "reporte")
public class Reporte {

    @Id
    @Column(name = "id_reporte", length = 36)
    private String idReporte;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    @Column(name = "entradas_vendidas")
    private int entradasVendidas = 0;

    @Column(name = "ingreso_total")
    private double ingresoTotal = 0.0;

    @PrePersist
    public void generarId() {
        if (this.idReporte == null) {
            this.idReporte = UUID.randomUUID().toString();
        }
    }

    // Método del diagrama
    public void generarReporte() {
        System.out.printf("=== REPORTE ===%nID: %s%nEvento: %s%nEntradas vendidas: %d%nIngreso total: $%.2f%n",
                idReporte, evento.getNombre(), entradasVendidas, ingresoTotal);
    }

    // Getters y Setters
    public String getIdReporte() { return idReporte; }
    public void setIdReporte(String idReporte) { this.idReporte = idReporte; }

    public Evento getEvento() { return evento; }
    public void setEvento(Evento evento) { this.evento = evento; }

    public int getEntradasVendidas() { return entradasVendidas; }
    public void setEntradasVendidas(int entradasVendidas) { this.entradasVendidas = entradasVendidas; }

    public double getIngresoTotal() { return ingresoTotal; }
    public void setIngresoTotal(double ingresoTotal) { this.ingresoTotal = ingresoTotal; }
}