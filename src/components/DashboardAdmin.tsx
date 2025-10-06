// --- file: src/components/DashboardAdmin.tsx ---
// Dashboard para ADMIN: métricas en tiempo real del sistema.
// Endpoints: GET /api/admin/metricas
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Heart, Package, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TarjetaMetrica from './TarjetaMetrica';

interface Metricas {
    citasMes: number;
    mascotasActivas: number;
    productosMinimos: number;
}

/**
 * Dashboard para ADMIN: métricas en tiempo real del sistema
 * Consume el endpoint GET /api/admin/metricas
 */
const DashboardAdmin = () => {
    const { token } = useAuth();
    const [metricas, setMetricas] = useState<Metricas | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        cargarMetricas();
    }, [token]);

    /**
     * Carga las métricas del dashboard desde el backend
     */
    const cargarMetricas = async () => {
        console.log('📊 Cargando métricas del dashboard admin...');
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:8080/api/admin/metricas', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('✅ Métricas cargadas:', response.data);
            setMetricas(response.data);
        } catch (err: unknown) {
            console.error('❌ Error cargando métricas:', err);
            const error = err as { response?: { data?: string } };
            setError(error.response?.data || 'No se pudieron cargar las métricas del sistema');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
                                Panel de Control - Administrador
                            </h1>
                            <p className="mt-2 text-gray-600">Visión general del funcionamiento de la clínica veterinaria</p>
                        </div>
                        <button
                            onClick={cargarMetricas}
                            disabled={loading}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                        >
                            🔄 Actualizar
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Estado de carga */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
                        <p className="mt-4 text-gray-700 font-medium text-lg">Cargando métricas del sistema...</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
                        <div className="flex items-center">
                            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                            <div>
                                <p className="text-red-800 font-semibold">Error al cargar métricas</p>
                                <p className="text-red-600 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                        <button
                            onClick={cargarMetricas}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Métricas - Grid de tarjetas */}
                {metricas && !loading && (
                    <>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Métricas del Sistema</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Citas del mes */}
                                <TarjetaMetrica
                                    titulo="Citas este mes"
                                    valor={metricas.citasMes}
                                    icono={Calendar}
                                    colorIcono="text-blue-600"
                                    colorFondo="bg-blue-100"
                                />

                                {/* Mascotas activas */}
                                <TarjetaMetrica
                                    titulo="Mascotas activas"
                                    valor={metricas.mascotasActivas}
                                    icono={Heart}
                                    colorIcono="text-green-600"
                                    colorFondo="bg-green-100"
                                />

                                {/* Productos con stock mínimo */}
                                <TarjetaMetrica
                                    titulo="Productos con stock bajo"
                                    valor={metricas.productosMinimos}
                                    icono={Package}
                                    colorIcono="text-orange-600"
                                    colorFondo="bg-orange-100"
                                />
                            </div>
                        </div>

                        {/* Accesos rápidos */}
                        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <Users className="w-6 h-6 mr-2 text-green-600" />
                                Accesos Rápidos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <a
                                    href="/admin/veterinarios"
                                    className="flex items-center px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all border-2 border-blue-200 hover:border-blue-400"
                                >
                                    <div className="bg-blue-500 p-3 rounded-full mr-4">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Veterinarios</p>
                                        <p className="text-sm text-gray-600">Gestionar personal</p>
                                    </div>
                                </a>

                                <a
                                    href="/admin/inventario"
                                    className="flex items-center px-6 py-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all border-2 border-green-200 hover:border-green-400"
                                >
                                    <div className="bg-green-500 p-3 rounded-full mr-4">
                                        <Package className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Inventario</p>
                                        <p className="text-sm text-gray-600">Control de stock</p>
                                    </div>
                                </a>

                                <a
                                    href="/admin/pagos"
                                    className="flex items-center px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all border-2 border-purple-200 hover:border-purple-400"
                                >
                                    <div className="bg-purple-500 p-3 rounded-full mr-4">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Pagos</p>
                                        <p className="text-sm text-gray-600">Gestión financiera</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Alertas si hay productos con stock bajo */}
                        {metricas.productosMinimos > 0 && (
                            <div className="mt-6 bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
                                <div className="flex items-start">
                                    <AlertTriangle className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-lg font-bold text-orange-900 mb-2">
                                            ⚠️ Atención: Stock Bajo en Inventario
                                        </h4>
                                        <p className="text-orange-800 mb-3">
                                            Hay <strong>{metricas.productosMinimos}</strong> producto(s) con stock mínimo que requieren reposición urgente.
                                        </p>
                                        <a
                                            href="/admin/inventario"
                                            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
                                        >
                                            <Package className="w-4 h-4 mr-2" />
                                            Ver Inventario
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardAdmin;
