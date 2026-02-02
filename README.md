
<div align="center">

  # VitalViewSync

  Una plataforma con numerosas funciones para controlar y comprender tu salud. Este panel de control ofrece visualizaciones detalladas de la actividad diaria, la calidad del sueño y los indicadores clave de salud. Participa en retos personales, gana premios y obtén información valiosa sobre tu bienestar a través de una interfaz limpia y receptiva.

  <img src="pics/Dashboard-preview .jpeg" alt="Project Screenshot" />


</div>

---

## 🚀 Key Features

- **📊 Visualización de Datos:** Gráficos interactivos para el seguimiento de la actividad, la calidad del sueño y otras métricas de salud.
- **🏆 Desafíos y Logros:** Gamifica tu viaje de salud con desafíos y premios.
- **📅 Calendario de Actividades:** Registra y visualiza tus actividades diarias.
- **💡 Consejos de Salud:** Recibe consejos personalizados para mejorar tu bienestar.
- **📱 Diseño Responsivo:** Totalmente funcional en dispositivos de escritorio y móviles.

---

## 💻 Tech Stack

| Technology | Description |
| :--- | :--- |
| **React** | Biblioteca de UI para construir la interfaz. |
| **Vite** | Herramientas de frontend para un desarrollo rápido. |
| **TypeScript** | Tipado estático para un código más robusto. |
| **Tailwind CSS** | Framework de CSS para un diseño rápido y personalizado. |
| **shadcn/ui** | Componentes de UI bellamente diseñados. |
| **Recharts** | Biblioteca de gráficos para la visualización de datos. |

---

## ⚙️ Getting Started

Sigue estos pasos para tener una copia local del proyecto funcionando.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x o superior)
- [pnpm](https://pnpm.io/installation) (o npm / yarn)

### Installation

1. **Clona el repositorio:**
   ```bash
   https://github.com/amnotwallas/VitalViewSync.git
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y copia el contenido de `example.env`.
   ```bash
   cp example.env .env
   ```
   El archivo `.env` se verá así:
   ```env
   # Si es true, la aplicación usará datos mockeados en lugar de una API real.
   VITE_USE_MOCK=true
   ```

### Running the Application

Inicia el servidor de desarrollo:
```bash
npm run dev
```
Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal) en tu navegador para ver la aplicación.

---

## 🤝 Contributing

¡Las contribuciones son bienvenidas! Si tienes una idea para mejorar la aplicación, por favor, abre un issue o envía un pull request.

1. Haz un Fork del Proyecto.
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Haz Push a la Branch (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

---

## 📄 License

Distribuido bajo la Licencia MIT. Consulta `LICENSE` para más información.