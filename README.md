
---

# 🐾 Clínica Veterinaria – Frontend React
**Evidencia GA7-220501096-AA4-EV03**  
SPA web construida con **React + TypeScript + Vite**, que implementa autenticación por token, enrutamiento protegido por rol y consumo de endpoints definidos. Forma parte del componente formativo **Desarrollo de frontend con React JS**.

---

## 📌 Alcance de la evidencia

- **Producto:** Componente frontend del proyecto formativo y ejercicios de clase.
- **Código:** Comentado, tipado y estructurado según estándares.
- **Versionamiento:** Git y GitHub.
- **Basado en artefactos previos:**  
  Diagrama de clases, casos de uso, historias de usuario, prototipos y plan técnico.

---

## 📁 Entregables

- Carpeta comprimida con archivos del proyecto frontend.
- Archivo de texto con el enlace al repositorio.
- Nombre del archivo: `NOMBRE_APELLIDO_AA4_EV03.zip` o `.rar`

---

## ⚙️ Requisitos técnicos

- Node.js 18+ y npm
- Backend en Spring Boot disponible en `http://localhost:8080`
- Java 17+ con Maven o Gradle
- Terminal: PowerShell o equivalente

---

## 🧩 Estructura del proyecto

```
frontend/
├── index.html                # Punto de entrada Vite
├── src/
│   ├── main.tsx             # Arranque de React + estilos globales
│   ├── styles/theme.css     # Estilos base y layout
│   ├── App.tsx              # Enrutamiento principal + rutas protegidas
│   ├── context/AuthContext.tsx  # Manejo de token y rol
│   └── components/          # UI por rol + componentes reutilizables
│       ├── Navbar.tsx, Sidebar.tsx, Layout.tsx
│       ├── Login.tsx, CitaCard.tsx, MascotaCard.tsx
│       ├── DashboardCliente.tsx, DashboardVeterinario.tsx
│       ├── DashboardRecepcionista.tsx, DashboardAdmin.tsx
│       └── Citas.tsx
```

---

## 🧠 Estándares y buenas prácticas

- Tipado estricto con TypeScript en props, contextos y modelos.
- Nombres en `PascalCase` para componentes y `camelCase` para funciones y variables.
- Comentarios breves explicando intención del código.
- Estilos centralizados en `src/styles/theme.css`.
- Validación de roles en mayúsculas normalizadas.

---

## 🔗 Endpoints consumidos (no modificar)

```
POST   /api/auth/login
GET    /api/citas
GET    /api/citas/hoy
GET    /api/mascotas/mias
GET    /api/admin/metrics
```

> Base URL esperada: `http://localhost:8080`  
> Si cambia, ajustar en los componentes que usan `axios`.

---

## 🔐 Autenticación y control de acceso

- `AuthContext`: guarda token y rol en `localStorage`.
- `PrivateRoute`: protege rutas por token.
- `RoleRoute`: restringe acceso por rol (`CLIENTE`, `VETERINARIO`, `RECEPCIONISTA`, `ADMIN`).
- `ResolveDashboard`: redirige al dashboard según rol.

---

## 🚀 Instalación y ejecución en desarrollo

```bash
git clone <repositorio>
cd frontend
npm install
npm install lucide-react
npm run dev
```

Abrir en navegador: `http://localhost:5173`  
Backend debe estar corriendo en `http://localhost:8080`

---

## 🏗️ Construcción de producción (SPA)

```bash
npm run build
```

Archivos generados en `dist/`

---

## 📦 Empaquetar frontend dentro del backend (opcional)

### Opción manual

```bash
npm ci
npm run build
mkdir -Force backend\src\main\resources\static | Out-Null
Remove-Item -Recurse -Force backend\src\main\resources\static\* -ErrorAction SilentlyContinue
Copy-Item -Recurse -Force frontend\dist\* backend\src\main\resources\static\
```

### Fallback SPA para rutas profundas

```java
@Controller
@RequestMapping
public class SpaController {
    @GetMapping(value = {
        "/",
        "/{path:^(?!api$)[^\\.]*}",
        "/**/{path:^(?!api)[^\\.]*}"
    })
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
```

### Empaquetar backend

```bash
mvn -DskipTests package
java -jar target/app.jar
```

---

### Opción automatizada con Maven

Usar `frontend-maven-plugin` y `maven-resources-plugin` para integrar el build de Node en el ciclo de Maven. (Ver fragmento en `pom.xml`)

---

## 📜 Scripts npm disponibles

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173"
  }
}
```

---

## 🔄 Versionamiento y flujo de trabajo

- Ramas: `main`, `feature/*`, `fix/*`
- Commits: `feat:`, `fix:`, `refactor:`, `docs:`
- Pull requests con checklist y referencias a historias de usuario

---

## ✅ Lista de chequeo previa a entrega

- [x] Código comentado y tipado
- [x] Endpoints consumidos sin cambios
- [x] Navegación por rol validada
- [x] Estilos cargan desde `theme.css`
- [x] Token y rol gestionados en `localStorage`
- [x] Build exitoso en `dist/`
- [x] Fallback SPA activo si se empaqueta en JAR
- [x] Repositorio enlazado en archivo de texto
- [x] Carpeta comprimida correctamente nombrada

---

## 🧯 Solución de problemas

- ❌ Import CSS falla: verificar `theme.css` y su import en `main.tsx`
- ❌ Rutas profundas devuelven 404: asegurar `SpaController`
- ❌ CORS en desarrollo: usar proxy en Vite o habilitar CORS en backend

---

## 🎓 Créditos

- Frontend: React, TypeScript, Vite
- Íconos: lucide-react
- IDE: IntelliJ IDEA 2025.1.4.1 en Windows

---

