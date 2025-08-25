
// --- file: src/components/Citas.tsx ---
// Listado de citas genérico con UI moderna reutilizando CitaCard.
// Endpoint: GET /api/citas (NO se modifica).
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CitaCard, {type Cita } from "./CitaCard";

const Citas: React.FC = () => {
    const { token } = useAuth();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState("");

    // Obtiene las citas usando el token (sin cambiar endpoint)
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/citas", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCitas(res.data);
            } catch {
                setError("No se pudieron cargar las citas");
            }
        };
        fetchCitas();
    }, [token]);

    return (
        <>
            <h1 className="page__title">Mis Citas</h1>
            <p className="page__subtitle">Consulta y administra tus próximas citas.</p>
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {/* Lista de tarjetas de citas */}
            <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "1rem" }}>
                {citas.map((c) => (
                    <CitaCard key={c.id} cita={c} />
                ))}
            </div>
        </>
    );
};

export default Citas;

