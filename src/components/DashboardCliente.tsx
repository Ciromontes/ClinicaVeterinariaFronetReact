
// --- file: src/components/DashboardCliente.tsx ---
// Dashboard para CLIENTE: muestra "Mis Mascotas" con tarjetas y FAB para nueva cita.
// Endpoints: GET /api/mascotas/mias (NO se modifica).
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MascotaCard from "./MascotaCard";

// Tipo local de mascota (coincidir con backend)
interface Mascota {
    id: number;
    nombre: string;
    especie: string;
    edad: string;
    fotoUrl?: string;
}

const DashboardCliente: React.FC = () => {
    const { token } = useAuth();
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        // Carga mascotas del cliente autenticado
        const fetchMascotas = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/mascotas/mias", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMascotas(res.data);
            } catch {
                setError("No se pudieron cargar tus mascotas");
            }
        };
        fetchMascotas();
    }, [token]);

    return (
        <>
            <h1 className="page__title">Mis Mascotas</h1>
            <p className="page__subtitle">Accede rápidamente a la información y agenda nuevas citas.</p>
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {/* Tarjetas de mascotas en grid responsive */}
            <div className="grid grid--cards">
                {mascotas.map((m) => (
                    <div key={m.id}>
                        <MascotaCard
                            fotoUrl={m.fotoUrl}
                            nombre={m.nombre}
                            especie={m.especie}
                            edad={m.edad}
                            onAgendar={() => navigate("/cliente/citas")}
                            onVerHistorial={() => navigate(`/cliente/mascotas/${m.id}/historial`)}
                        />
                    </div>
                ))}
            </div>

            {/* Botón flotante para nueva cita */}
            <div className="fab">
                <button className="btn btn--primary" onClick={() => navigate("/cliente/citas")}>
                    <Plus size={18} />
                    <span> Nueva cita</span>
                </button>
            </div>
        </>
    );
};

export default DashboardCliente;

