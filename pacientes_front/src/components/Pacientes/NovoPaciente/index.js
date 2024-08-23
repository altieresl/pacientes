import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Topbar from "../../Topbar";
import Container from "@mui/material/Container";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useEffect, useState} from "react";
import {FormControl, FormHelperText, Input, InputLabel, Select, TextField} from "@mui/material";
import {redirect, useNavigate, useParams} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function NovoPaciente() {
    const { pacienteId } = useParams();

    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        console.log("isAuthenticated =>", isAuthenticated)
    }, [isAuthenticated]);

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [uf, setUf] = useState('');

    useEffect(() => {
        if (pacienteId) {
            getPaciente();
        }
    }, [pacienteId]);

    const getPaciente = async (e) => {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`http://localhost:8080/pacientes/get/${pacienteId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = response.data;
        setNome(data.nome);
        setCpf(data.cpf);
        setDataNascimento(data.dataNascimento);
        setPeso(data.peso);
        setAltura(data.altura);
        setUf(data.uf);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently();
        const url = pacienteId
            ? `http://localhost:8080/pacientes/alterar/${pacienteId}`
            : 'http://localhost:8080/pacientes/novo';

        const method = pacienteId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nome,
                    cpf,
                    dataNascimento,
                    peso,
                    altura,
                    uf
                }),
            });

            const data = await response.json();
            // função que redirecione pra home

            navigate('/');

        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const estados = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
        'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    return (
        <div>
            <Topbar/>
            <Container maxWidth="xl">
                <div style={{height: 400, width: '100%', marginTop: 50}}>
                    <form onSubmit={handleSubmit}>
                        <FormControl style={{display: 'block', marginBottom: 15}}>
                            <TextField
                                label="Nome"
                                id="nome"
                                style={{width: 250}}
                                variant="outlined"
                                name="nome"
                                onChange={(e) => setNome(e.target.value)}
                                value={nome}
                                required={true}
                            />
                        </FormControl>

                        <FormControl style={{display: 'block', marginBottom: 15}}>
                            <TextField
                                label="CPF"
                                id="cpf"
                                style={{width: 250}}
                                variant="outlined"
                                name="cpf"
                                onChange={(e) => setCpf(e.target.value)}
                                value={cpf}
                                required={true}
                            />
                        </FormControl>

                        <FormControl style={{display: 'block', marginBottom: 15}}>
                            <TextField
                                type={"date"}
                                InputLabelProps={{ shrink: true }}
                                label="Data de Nascimento"
                                id="data_nascimento"
                                style={{width: 250}}
                                variant="outlined"
                                name="data_nascimento"
                                onChange={(e) => setDataNascimento(e.target.value)}
                                value={dataNascimento}
                                required={true}
                            />
                        </FormControl>

                        <FormControl style={{display: 'block', marginBottom: 15}}>
                            <TextField
                                type={"number"}
                                label="Peso"
                                id="peso"
                                style={{width: 250}}
                                variant="outlined"
                                name="peso"
                                onChange={(e) => setPeso(e.target.value)}
                                value={peso}
                            />
                        </FormControl>

                        <FormControl style={{display: 'block', marginBottom: 15}}>
                            <TextField
                                type={"number"}
                                label="Altura"
                                id="altura"
                                style={{width: 250}}
                                variant="outlined"
                                name="altura"
                                onChange={(e) => setAltura(e.target.value)}
                                value={altura}
                            />
                        </FormControl>

                        <FormControl style={{display: 'block', marginBottom: 15}}>
                            <TextField
                                select
                                label="Estado"
                                id="uf"
                                style={{width: 250}}
                                variant="outlined"
                                name="uf"
                                onChange={(e) => setUf(e.target.value)}
                                value={uf}
                                required={true}
                            >
                                {estados.map((opcao) => (
                                    <MenuItem key={opcao} value={opcao}>
                                        {opcao}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <Button
                            variant="contained"
                            type={"submit"}
                        >
                            Salvar
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
);
}