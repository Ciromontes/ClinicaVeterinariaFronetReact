// --- file: src/components/Navbar.tsx ---
// Navbar superior con logo, rol visible y botón de salir.
// Usa AuthContext para mostrar rol y ejecutar logout.
import React from "react";
import { PawPrint, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
    const { rol, logout } = useAuth();

    return (
        <header className="navbar">
            {/* Marca / logo de la clínica */}
            <div className="navbar__brand">
                <PawPrint color="#2ecc71" />
                <span>Clínica Veterinaria</span>
            </div>

            {/* Sección derecha: rol y salir */}
            <div className="navbar__right">
                <span className="muted">Rol: {rol ?? "Invitado"}</span>
                <button className="btn btn--ghost" onClick={logout} title="Cerrar sesión">
                    <LogOut size={18} />
                    <span>Salir</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;

