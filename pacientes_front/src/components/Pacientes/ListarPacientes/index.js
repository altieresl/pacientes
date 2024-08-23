import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Topbar from "../../Topbar";
import Container from "@mui/material/Container";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import Button from "@mui/material/Button";
import {toast} from "react-toast-notification";
import Mapa from "../../Mapa";
import "./style.css";

export default function ListarPacientes() {

    const { loginWithRedirect, isLoading, logout, user, getAccessTokenSilently } = useAuth0();
    const [rows, setRows] = useState();
    const [pontosMapa, setPontosMapa] = useState([]);

    const columns = [
        { field: 'pacienteId', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', width: 200 },
        { field: 'cpf', headerName: 'CPF', width: 130 },
        { field: 'dataNascimento', headerName: 'Data de Nascimento', width: 150 },
        { field: 'peso', headerName: 'Peso', width: 70 },
        { field: 'altura', headerName: 'Altura', width: 70},
        { field: 'uf', headerName: 'UF', width: 70},
        { field: 'editar', headerName: '', width: 100, renderCell: (params) => (
                <Button variant="outlined" size={"small"} color="primary" href={`/novo/${params.row.pacienteId}`}>Editar</Button>
            )},
        { field: 'excluir', headerName: '', width: 100, renderCell: (params) => (
                <Button variant="outlined" size={"small"} color="warning" onClick={() => confirmacaoExcluir(params.row.pacienteId)}>Excluir</Button>
            )},
    ];

    const estadosLatLong = {
        "AC": [-9.0238, -70.8120],
        "AL": [-9.6498, -36.6087],
        "AM": [-4.8995, -64.7312],
        "AP": [0.9025, -52.0036],
        "BA": [-12.9704, -38.5124],
        "CE": [-5.4984, -39.3206],
        "DF": [-15.7939, -47.8823],
        "ES": [-19.1834, -40.3089],
        "GO": [-15.8270, -49.8362],
        "MA": [-5.4096, -45.0185],
        "MT": [-12.6819, -56.9211],
        "MS": [-20.7722, -54.7852],
        "MG": [-18.5122, -44.5550],
        "PA": [-3.9723, -54.9714],
        "PB": [-7.1212, -36.7247],
        "PR": [-24.8987, -51.5609],
        "PE": [-8.8137, -36.9541],
        "PI": [-7.7183, -42.7289],
        "RJ": [-22.9068, -43.1729],
        "RN": [-5.7945, -36.3542],
        "RS": [-30.0346, -51.2177],
        "RO": [-10.9777, -62.8278],
        "RR": [2.7376, -62.0751],
        "SC": [-27.2423, -50.2189],
        "SP": [-23.5505, -46.6333],
        "SE": [-10.9472, -37.0731],
        "TO": [-10.1753, -48.2982]
    };

    const confirmacaoExcluir = (pacienteId) => {
        if (window.confirm("Deseja realmente excluir o paciente?")) {
            excluirPaciente(pacienteId);
        }
    }

    const excluirPaciente = async (pacienteId) => {
        const token = await getAccessTokenSilently();
        const response = await axios.delete(`http://localhost:8080/pacientes/deletar/${pacienteId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            toast("Paciente excluído com sucesso", {type: "success"});
            getPacientes();
        } else {
            toast("Erro ao excluir paciente", {type: "error"});
        }
    }

    const getPacientes = async () => {
        const token = await getAccessTokenSilently();
        const response = await axios.get('http://localhost:8080/pacientes/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let dados = response.data;
        let pontos = [];
        dados.forEach(dado => {
            dado.dataNascimento = moment(dado.dataNascimento).format("DD/MM/YYYY");
            pontos.push(estadosLatLong[dado.uf]);
        });
        setPontosMapa(pontos);
        setRows(response.data);
    };

    useEffect(() => {
        if (user) {
            console.log("teste");
            getPacientes()
        }
    }, [user]);

    return (
        <div>
            <Topbar/>
            <Container maxWidth="xl">
                <div style={{height: '100%', width: '100%'}}>
                    {user && (
                        <div className={"tableMap"}>
                            <div className={"table"}>
                                <DataGrid
                                    rows={rows}
                                    getRowId={(row) => row.pacienteId}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {page: 0, pageSize: 50},
                                        },
                                    }}
                                    pageSizeOptions={[50, 100]}
                                />
                            </div>
                            <div className={"map"}>
                                <Mapa
                                    pontos={pontosMapa}
                                />
                            </div>
                        </div>
                    )}
                    {!user && (
                        <h2>Entre para ter acesso</h2>
                    )}
                </div>
            </Container>
        </div>
    );
}