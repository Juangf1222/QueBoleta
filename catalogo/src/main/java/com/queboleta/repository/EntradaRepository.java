package com.queboleta.repository;

import com.queboleta.entity.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EntradaRepository extends JpaRepository<Entrada, String> {
    List<Entrada> findByPropietario_IdUsuario(String idUsuario);
    List<Entrada> findByEvento_IdEvento(String idEvento);
    Optional<Entrada> findByCodigoQR(String codigoQR);
}
