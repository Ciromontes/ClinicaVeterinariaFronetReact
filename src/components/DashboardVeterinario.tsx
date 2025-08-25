
// --- file: src/components/DashboardVeterinario.tsx ---
// Dashboard para VETERINARIO: "Agenda de Hoy" con acciones rápidas.
// Endpoints: GET /api/citas/hoy (NO se modifica).
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CitaCard, {type Cita } from "./CitaCard";

const DashboardVeterinario: React.FC = () => {
    const { token } = useAuth();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchHoy = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/citas/hoy", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCitas(res.data);
            } catch {
                setError("No se pudieron cargar las citas de hoy");
            }
        };
        fetchHoy();
    }, [token]);

    // Ejemplos de acciones (integrar con backend si aplica)
    const iniciarConsulta = (c: Cita) => {
        alert(`Iniciando consulta para la cita #${c.id}`);
    };
    const agregarNotas = (c: Cita) => {
        alert(`Agregar notas a la cita #${c.id}`);
    };

    return (
        <>
            <h1 className="page__title">Agenda de Hoy</h1>
            <p className="page__subtitle">Revisa tus citas y actúa rápidamente.</p>
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "1rem" }}>
                {citas.map((c) => (
                    <CitaCard
                        key={c.id}
                        cita={c}
                        onPrimaryAction={iniciarConsulta}
                        onSecondaryAction={agregarNotas}
                        primaryLabel="Iniciar consulta"
                        secondaryLabel="Agregar notas"
                    />
                ))}
            </div>
        </>
    );
};

export default DashboardVeterinario;

