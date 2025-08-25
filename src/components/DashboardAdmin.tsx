
// --- file: src/components/DashboardAdmin.tsx ---
// Dashboard para ADMIN: indicadores y accesos rápidos.
// Endpoints: GET /api/admin/metrics (NO se modifica).
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, CreditCard, Package, Stethoscope } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Metrics {
    citas: number;
    mascotasActivas: number;
    inventarioBajo: number;
}

const DashboardAdmin: React.FC = () => {
    const { token } = useAuth();
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/admin/metrics", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMetrics(res.data);
            } catch {
                setError("No se pudieron cargar las métricas");
            }
        };
        fetch();
    }, [token]);

    return (
        <>
            <h1 className="page__title">Panel de Control</h1>
            <p className="page__subtitle">Visión general del funcionamiento de la clínica.</p>
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {/* Indicadores principales */}
            <div className="grid grid--cards" style={{ marginBottom: "1rem" }}>
                <div className="card">
                    <div className="card__body">
                        <div className="stack"><BarChart3 color="#2ecc71" /><strong>Citas</strong></div>
                        <h2 style={{ margin: "0.25rem 0 0 0" }}>{metrics?.citas ?? "—"}</h2>
                        <p className="card__subtitle">Programadas este mes</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card__body">
                        <div className="stack"><Stethoscope color="#2ecc71" /><strong>Mascotas activas</strong></div>
                        <h2 style={{ margin: "0.25rem 0 0 0" }}>{metrics?.mascotasActivas ?? "—"}</h2>
                        <p className="card__subtitle">Registradas</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card__body">
                        <div className="stack"><Package color="#2ecc71" /><strong>Inventario bajo</strong></div>
                        <h2 style={{ margin: "0.25rem 0 0 0" }}>{metrics?.inventarioBajo ?? "—"}</h2>
                        <p className="card__subtitle">Ítems por reponer</p>
                    </div>
                </div>
            </div>

            {/* Accesos rápidos */}
            <div className="card">
                <div className="card__body">
                    <h3 className="card__title">Accesos rápidos</h3>
                    <div className="stack stack--wrap" style={{ marginTop: "0.5rem" }}>
                        <a className="btn btn--ghost" href="/admin/veterinarios"><Stethoscope size={18} /> Veterinarios</a>
                        <a className="btn btn--ghost" href="/admin/inventario"><Package size={18} /> Inventario</a>
                        <a className="btn btn--ghost" href="/admin/pagos"><CreditCard size={18} /> Pagos</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardAdmin;

