package com.clinica.pacientes.repositories;

import com.clinica.pacientes.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
}
