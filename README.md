# 🐾 VetCare - Frontend React

Frontend del sistema de gestión de clínica veterinaria desarrollado con React + TypeScript + Vite.

## 📋 Evidencia Académica

**Componente formativo:** GA7-220501096-AA4-EV03  
**Proyecto:** Desarrollo de frontend con React JS  
**Entregable:** Aplicación SPA dockerizada integrada con backend Spring Boot

---

## 🚀 Tecnologías

- **Framework:** React 18
- **Lenguaje:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Iconografía:** Lucide React
- **Estilos:** CSS personalizado (theme.css)
- **Contenedorización:** Docker + nginx

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── DashboardCliente.tsx
│   │   ├── DashboardVeterinario.tsx
│   │   ├── DashboardRecepcionista.tsx
│   │   ├── DashboardAdmin.tsx
│   │   ├── AgendarCitaModal.tsx
│   │   ├── HistorialMascotaModal.tsx
│   │   ├── TablaUsuarios.tsx
│   │   └── ...
│   ├── context/             # Contextos (AuthContext)
│   ├── hooks/               # Custom hooks
│   ├── services/            # Servicios API
│   ├── types/               # Definiciones TypeScript
│   ├── styles/              # Estilos globales
│   ├── App.tsx              # Enrutador principal
│   └── main.tsx             # Punto de entrada
├── public/                  # Assets estáticos
├── Dockerfile               # Build multi-stage
├── docker-compose.snippet.yml
├── nginx.conf               # Config nginx para SPA
├── nginx-landing.conf       # Config para integración
├── .dockerignore
├── .env.example
├── QUICKSTART.md            # Guía de despliegue Docker
└── package.json
```

---

## 🛠️ Instalación Local

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Backend corriendo en `http://localhost:8080`

### Pasos

```powershell
# 1. Clonar e instalar dependencias
cd frontend
npm install

# 2. Copiar variables de entorno
copy .env.example .env

# 3. Ejecutar en desarrollo
npm run dev
```

**Acceso:** `http://localhost:5173`

---

## 🐳 Despliegue con Docker

### Opción 1: Build manual

```powershell
# Build
docker build -t vetcare-frontend:prod .

# Run
docker run --rm -p 5173:80 vetcare-frontend:prod
```

### Opción 2: Docker Compose (Recomendado)

Ver **[QUICKSTART.md](./QUICKSTART.md)** para instrucciones detalladas.

```powershell
docker compose up -d
```

**Rutas de acceso:**
- Landing: `http://localhost/`
- Frontend: `http://localhost/app`
- API: `http://localhost/api`

---

## 🔐 Roles y Funcionalidades

### 👤 Cliente
- Ver mascotas registradas
- Agendar citas
- Ver historial clínico
- Consultar facturación

### 🩺 Veterinario
- Ver agenda del día
- Registrar entradas en historial
- Gestionar consultas
- Ver reportes

### 📋 Recepcionista
- Gestionar citas
- Administrar clientes
- Confirmar asistencia

### ⚙️ Administrador
- Dashboard con métricas
- Gestionar usuarios
- Ver inventario
- Administrar pagos

---

## 🌐 Endpoints Consumidos

### Autenticación
- `POST /api/auth/login`

### Citas
- `GET /api/citas`
- `POST /api/citas`
- `GET /api/citas/hoy`

### Mascotas
- `GET /api/mascotas/mias`
- `GET /api/mascotas/cliente/{id}`

### Historial
- `GET /api/historias/mascota/{id}/completo`

### Usuarios (Admin)
- `GET /api/usuarios`
- `PUT /api/usuarios/{id}/estado`

### Veterinarios
- `GET /api/usuarios/veterinarios/activos`

---

## 📦 Scripts Disponibles

```json
{
  "dev": "vite",                    // Desarrollo local
  "build": "vite build",            // Build producción
  "preview": "vite preview",        // Preview build local
  "lint": "eslint src"              // Verificar código
}
```

---

## 🎨 Diseño y UX

### Principios
- **Minimalista:** Espacios en blanco, tipografía limpia (Inter)
- **Color principal:** Verde (#2ecc71) - temática veterinaria 🐾
- **Responsive:** Mobile-first design
- **Accesibilidad:** ARIA labels, contraste adecuado

### Componentes Reutilizables
- `CitaCard` - Tarjetas de citas con estados visuales
- `MascotaCard` - Tarjetas de mascotas con foto y acciones
- `HistorialMascotaModal` - Modal para ver historial clínico
- `AgendarCitaModal` - Formulario de agendar citas
- `TablaUsuarios` - Gestión de usuarios (Admin)

### Estados de Cita
- 🔵 **Programada** (azul)
- 🟠 **En curso** (naranja)
- 🟢 **Completada** (verde)
- 🔴 **Cancelada** (rojo)

---

## 🔧 Configuración de Producción

### Variables de Entorno

Crear archivo `.env` con:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Build Optimizado

El Dockerfile usa multi-stage build:
1. **Stage 1:** Compila con Node.js
2. **Stage 2:** Sirve con nginx (Alpine)

**Resultado:** Imagen final ~25MB 🚀

---

## 🧪 Testing

### Credenciales de Prueba

**Cliente:**
```
Email: carlos.martinez@email.com
Password: 123456
```

**Veterinario:**
```
Email: ana.veterinaria@clinica.com
Password: 123456
```

**Admin:**
```
Email: admin@clinicaveterinaria.com
Password: admin123
```

---

## 📸 Capturas para Evidencia

Ver sección en **[QUICKSTART.md](./QUICKSTART.md)** para instrucciones de QA.

---

## 🐛 Solución de Problemas

### Error: "Failed to fetch"
**Causa:** Backend no está corriendo  
**Solución:** Verificar que backend esté en `http://localhost:8080`

### Error: 404 en rutas de React
**Causa:** nginx no tiene `try_files` configurado  
**Solución:** Verificar `nginx.conf` tiene fallback a `index.html`

### Error: CORS
**Causa:** Backend no permite origen del frontend  
**Solución:** Agregar `http://localhost:5173` a CORS config del backend

---

## 📞 Soporte

**Repositorio:** [GitHub - VetCare Frontend]  
**Documentación Backend:** Ver README del backend  
**Guía Docker:** Ver QUICKSTART.md

---

## 📄 Licencia

Proyecto académico SENA - GA7-220501096-AA4-EV03

---

## ✅ Checklist de Entrega

- [x] Código TypeScript con comentarios
- [x] Componentes por rol implementados
- [x] Integración con endpoints backend
- [x] Dockerfile y docker-compose listos
- [x] Documentación completa (README + QUICKSTART)
- [x] Variables de entorno documentadas
- [x] .dockerignore configurado
- [x] nginx.conf para SPA
- [x] Healthchecks implementados

---

**Versión:** 1.0.0  
**Fecha:** Enero 2025  
**Autor:** [Tu Nombre]  
**Evidencia:** GA7-220501096-AA4-EV03

