import type { LucideIcon } from 'lucide-react';

interface TarjetaMetricaProps {
    titulo: string;
    valor: number | string;
    icono: LucideIcon;
    colorIcono?: string;
    colorFondo?: string;
}

/**
 * Componente reutilizable para mostrar métricas del dashboard admin
 * Muestra un título, valor numérico y un icono con colores personalizables
 */
const TarjetaMetrica = ({
    titulo,
    valor,
    icono: Icono,
    colorIcono = 'text-blue-600',
    colorFondo = 'bg-blue-100'
}: TarjetaMetricaProps) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                        {titulo}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                        {valor}
                    </p>
                </div>
                <div className={`${colorFondo} p-4 rounded-full`}>
                    <Icono className={`w-8 h-8 ${colorIcono}`} />
                </div>
            </div>
        </div>
    );
};

export default TarjetaMetrica;
