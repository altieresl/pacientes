package com.clinica.pacientes.controllers;

import com.clinica.pacientes.models.Paciente;
import com.clinica.pacientes.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacientesController {

    @Autowired
    PacienteRepository pacienteRepository;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Paciente> index() {
        return pacienteRepository.findAll();
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private Paciente get(@PathVariable int id) {
        System.out.println("teste " + id);
        return pacienteRepository.findById(id).get();
    }

    @PostMapping(value = "/novo", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Integer>> novo(@RequestBody Paciente paciente) {
        System.out.println(paciente);
        Paciente novoPaciente = pacienteRepository.save(paciente);
        Map<String, Integer> retorno = Map.of("pacienteId", novoPaciente.getPacienteId());
        return ResponseEntity.status(HttpStatus.CREATED).body(retorno);
    }

    @PutMapping(value = "/alterar/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> alterar(@PathVariable int id, @RequestBody Paciente _paciente) {
        Optional<Paciente> pacienteExistente = pacienteRepository.findById(id);
        System.out.println(_paciente);

        if (pacienteExistente.isPresent()) {
            Paciente pacienteAtualizado = pacienteExistente.get();
            pacienteAtualizado.setNome(_paciente.getNome());
            pacienteAtualizado.setCpf(_paciente.getCpf());
            pacienteAtualizado.setDataNascimento(_paciente.getDataNascimento());
            pacienteAtualizado.setPeso(_paciente.getPeso());
            pacienteAtualizado.setAltura(_paciente.getAltura());
            pacienteAtualizado.setUf(_paciente.getUf());

            pacienteRepository.save(pacienteAtualizado);
            return ResponseEntity.ok(pacienteAtualizado.getPacienteId());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping(value = "/deletar/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Integer>> deletar(@PathVariable int id) {
        Optional<Paciente> pacienteExistente = pacienteRepository.findById(id);

        if (pacienteExistente.isPresent()) {
            pacienteRepository.deleteById(id);
            Map<String, Integer> retorno = Map.of("pacienteId", id);
            return ResponseEntity.status(HttpStatus.OK).body(retorno);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}