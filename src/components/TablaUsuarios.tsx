// filepath: d:\Downloads\Chagpt5ClinicVet\frontend\src\components\TablaUsuarios.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCog, Search, AlertTriangle, CheckCircle, XCircle, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Interfaz que representa un usuario del sistema
 */
interface Usuario {
    id: number;
    email: string;
    nombre: string;
    rol: string;
    activo: boolean;
}

/**
 * Componente TablaUsuarios
 * Permite al ADMIN:
 * - Listar todos los usuarios del sistema
 * - Filtrar por rol
 * - Buscar por email o nombre
 * - Activar/desactivar usuarios con toggle switch
 *
 * Endpoints consumidos:
 * - GET /api/usuarios (listar todos)
 * - PUT /api/usuarios/{id}/estado (cambiar estado activo)
 */
const TablaUsuarios = () => {
    const { token } = useAuth();

    // Estados del componente
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState<string>('TODOS');

    // Cargar usuarios al montar el componente
    useEffect(() => {
        cargarUsuarios();
    }, [token]);

    // Aplicar filtros cuando cambian búsqueda, filtroRol o usuarios
    useEffect(() => {
        aplicarFiltros();
    }, [busqueda, filtroRol, usuarios]);

    /**
     * Carga la lista completa de usuarios desde el backend
     */
    const cargarUsuarios = async () => {
        console.log('👥 Cargando lista de usuarios...');
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:8080/api/usuarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('✅ Usuarios cargados:', response.data);
            setUsuarios(response.data);
        } catch (err: unknown) {
            console.error('❌ Error cargando usuarios:', err);
            const error = err as { response?: { data?: string } };
            setError(error.response?.data || 'No se pudieron cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Aplica filtros de búsqueda y rol sobre la lista de usuarios
     */
    const aplicarFiltros = () => {
        let resultado = [...usuarios];

        // Filtro por rol
        if (filtroRol !== 'TODOS') {
            resultado = resultado.filter(u => u.rol === filtroRol);
        }

        // Búsqueda por email o nombre (case insensitive)
        if (busqueda.trim() !== '') {
            const termino = busqueda.toLowerCase();
            resultado = resultado.filter(u =>
                u.email.toLowerCase().includes(termino) ||
                u.nombre.toLowerCase().includes(termino)
            );
        }

        setUsuariosFiltrados(resultado);
    };

    /**
     * Cambia el estado (activo/inactivo) de un usuario
     * @param id - ID del usuario
     * @param nuevoEstado - true para activar, false para desactivar
     */
    const cambiarEstadoUsuario = async (id: number, nuevoEstado: boolean) => {
        console.log(`🔄 Cambiando estado del usuario ${id} a ${nuevoEstado ? 'activo' : 'inactivo'}...`);

        try {
            await axios.put(
                `http://localhost:8080/api/usuarios/${id}/estado`,
                { activo: nuevoEstado },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('✅ Estado actualizado correctamente');

            // Actualizar el estado local sin recargar toda la lista
            setUsuarios(usuarios.map(u =>
                u.id === id ? { ...u, activo: nuevoEstado } : u
            ));

        } catch (err: unknown) {
            console.error('❌ Error al cambiar estado:', err);
            const error = err as { response?: { data?: string } };
            alert(`Error: ${error.response?.data || 'No se pudo cambiar el estado del usuario'}`);
        }
    };

    /**
     * Obtiene el color del badge según el rol
     */
    const obtenerColorRol = (rol: string) => {
        switch (rol) {
            case 'ADMIN':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'VETERINARIO':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'RECEPCIONISTA':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'CLIENTE':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
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
                                <UserCog className="w-8 h-8 mr-3 text-green-600" />
                                Gestión de Usuarios
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Administra los usuarios del sistema y controla sus accesos
                            </p>
                        </div>
                        <button
                            onClick={cargarUsuarios}
                            disabled={loading}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                        >
                            🔄 Actualizar
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filtros y búsqueda */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-2 border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Campo de búsqueda */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Search className="w-4 h-4 inline mr-1" />
                                Buscar usuario
                            </label>
                            <input
                                type="text"
                                placeholder="Buscar por email o nombre..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        {/* Filtro por rol */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Filter className="w-4 h-4 inline mr-1" />
                                Filtrar por rol
                            </label>
                            <select
                                value={filtroRol}
                                onChange={(e) => setFiltroRol(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                            >
                                <option value="TODOS">Todos los roles</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="VETERINARIO">Veterinario</option>
                                <option value="RECEPCIONISTA">Recepcionista</option>
                                <option value="CLIENTE">Cliente</option>
                            </select>
                        </div>
                    </div>

                    {/* Contador de resultados */}
                    <div className="mt-4 text-sm text-gray-600">
                        Mostrando <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> usuarios
                    </div>
                </div>

                {/* Estado de carga */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
                        <p className="mt-4 text-gray-700 font-medium text-lg">Cargando usuarios...</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
                        <div className="flex items-center">
                            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                            <div>
                                <p className="text-red-800 font-semibold">Error al cargar usuarios</p>
                                <p className="text-red-600 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                        <button
                            onClick={cargarUsuarios}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Tabla de usuarios */}
                {!loading && !error && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rol
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {usuariosFiltrados.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                No se encontraron usuarios con los filtros aplicados
                                            </td>
                                        </tr>
                                    ) : (
                                        usuariosFiltrados.map((usuario) => (
                                            <tr key={usuario.id} className="hover:bg-gray-50 transition">
                                                {/* Email */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {usuario.email}
                                                    </div>
                                                </td>

                                                {/* Nombre */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-700">
                                                        {usuario.nombre}
                                                    </div>
                                                </td>

                                                {/* Rol */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2 ${obtenerColorRol(usuario.rol)}`}>
                                                        {usuario.rol}
                                                    </span>
                                                </td>

                                                {/* Estado */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                        usuario.activo 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {usuario.activo ? (
                                                            <>
                                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                                Activo
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="w-3 h-3 mr-1" />
                                                                Inactivo
                                                            </>
                                                        )}
                                                    </span>
                                                </td>

                                                {/* Acciones - Toggle Switch */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <label className="flex items-center cursor-pointer">
                                                        <div className="relative">
                                                            <input
                                                                type="checkbox"
                                                                checked={usuario.activo}
                                                                onChange={(e) => cambiarEstadoUsuario(usuario.id, e.target.checked)}
                                                                className="sr-only"
                                                            />
                                                            <div className={`block w-14 h-8 rounded-full transition ${
                                                                usuario.activo ? 'bg-green-500' : 'bg-gray-300'
                                                            }`}></div>
                                                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                                                                usuario.activo ? 'transform translate-x-6' : ''
                                                            }`}></div>
                                                        </div>
                                                        <span className="ml-3 text-sm font-medium text-gray-700">
                                                            {usuario.activo ? 'Desactivar' : 'Activar'}
                                                        </span>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TablaUsuarios;

