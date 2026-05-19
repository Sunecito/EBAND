# EBAND - Prototipo funcional TRL5

EBAND es un prototipo web/mobile responsive para aprendizaje inicial de guitarra. La aplicación permite registrar un usuario, iniciar sesión, navegar entre módulos, completar lecciones, simular un afinador, usar un metrónomo interactivo y consultar progreso guardado localmente.

## Tecnologías usadas

- React + Vite
- React Router DOM
- CSS puro responsive
- Lucide React para iconografía
- localStorage para usuario, sesión, progreso, logros e historial de afinación

## Funcionalidades implementadas

- Bienvenida con identidad EBAND, slogan y accesos visuales de login social.
- Registro con validación de campos, confirmación de contraseña y términos.
- Login funcional con validación contra el usuario guardado.
- Home con saludo personalizado, banner, accesos rápidos y resumen de progreso.
- Lecciones por niveles 1 a 4 con desbloqueo progresivo y guardado de avance.
- Afinador simulado con nota, frecuencia, estado e historial reciente.
- Metrónomo real con BPM, play/pause, indicador visual de pulso y compases.
- Progreso con porcentaje general, puntos, tiempo, categorías y logros.
- Perfil con datos del usuario, nivel actual, cierre de sesión y reinicio de progreso.

## Cómo ejecutar localmente

```bash
npm install
npm run dev
```

Luego abre la URL que muestre Vite, normalmente `http://localhost:5173`.

## Usuario de prueba sugerido

Puedes registrarte desde la app con cualquier correo válido. Para una demostración rápida, también puedes iniciar sesión directamente con:

- Nombre: Estudiante EBAND
- Correo: demo@eband.com
- Contraseña: 123456

Si no existe todavía en localStorage, la app crea este usuario demo en el primer inicio de sesión correcto.

## Evidencia TRL5

El prototipo evidencia TRL5 porque integra los componentes principales de la solución en un entorno controlado de navegador: autenticación simulada, persistencia local, navegación real, actividades interactivas, cambios de estado, progreso medible y reinicio para pruebas. No depende de backend, Firebase ni APIs externas, por lo que es estable para sustentación universitaria, grabación en video y pruebas funcionales guiadas.
