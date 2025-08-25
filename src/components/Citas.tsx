import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Cita {
    id: number;
    fechaCita: string;
    horaCita: string;
    motivo: string;
    estadoCita: string;
}

const Citas: React.FC = () => {
    const { token } = useAuth();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState("");

    // Obtiene las citas usando el token
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/citas", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCitas(res.data);
            } catch (err) {
                setError("No se pudieron cargar las citas");
            }
        };
        fetchCitas();
    }, [token]);

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h2>Mis Citas</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {citas.map(cita => (
                    <li key={cita.id}>
                        {cita.fechaCita} {cita.horaCita} - {cita.motivo} ({cita.estadoCita})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Citas;