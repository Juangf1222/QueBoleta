package com.queboleta.repository;

import com.queboleta.entity.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, String> {
    List<Transaccion> findByUsuario_IdUsuario(String idUsuario);
    List<Transaccion> findByEstadoTrue();
    List<Transaccion> findAllByOrderByFechaTransaccionDesc();
}