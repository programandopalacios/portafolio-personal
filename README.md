# Portafolio Personal – Marlon David Palacios Parra

Sitio web estático de portafolio personal. Dark mode, totalmente responsive, sin dependencias externas.

---

## Estructura de archivos

```
PORTAFOLIO PERSONAL/
├── index.html                  # Página principal
├── css/
│   └── styles.css              # Todos los estilos (variables, componentes, responsive)
├── js/
│   └── main.js                 # Interactividad (navbar, filtros, animaciones, formulario)
├── assets/
│   ├── icons/                  # Íconos SVG de tecnologías
│   │   ├── html5.svg
│   │   ├── css3.svg
│   │   ├── javascript.svg
│   │   ├── react.svg
│   │   ├── nodejs.svg
│   │   ├── mysql.svg
│   │   ├── mongodb.svg
│   │   ├── git.svg
│   │   ├── github.svg
│   │   ├── vscode.svg
│   │   ├── figma.svg
│   │   └── tailwind.svg
│   └── images/                 # Fotos e imágenes de proyectos
│       ├── profile-hero.jpg    ← REEMPLAZAR (380×480 px)
│       ├── profile-about.jpg   ← REEMPLAZAR (280×340 px)
│       ├── project-tasks.jpg   ← REEMPLAZAR (600×360 px)
│       ├── project-ecommerce.jpg ← REEMPLAZAR (600×360 px)
│       └── project-reservas.jpg  ← REEMPLAZAR (600×360 px)
└── README.md
```

---

## Cómo agregar tus fotos

1. Coloca tus imágenes en `assets/images/` con exactamente estos nombres:
   - `profile-hero.jpg` – foto principal del hero (recomendado: 380×480 px, fondo oscuro)
   - `profile-about.jpg` – foto de la sección "Sobre mí" (recomendado: 280×340 px)
   - `project-tasks.jpg` – captura de pantalla del proyecto App de Tareas
   - `project-ecommerce.jpg` – captura de pantalla del proyecto E-commerce
   - `project-reservas.jpg` – captura de pantalla del proyecto Sistema de Reservas

2. Si no hay imagen real, el sitio muestra automáticamente un placeholder con borde punteado.

---

## Personalización rápida

### Cambiar nombre / rol
Edita `index.html` y busca:
- `Marlon David Palacios Parra` → tu nombre
- `DESARROLLADOR DE SOFTWARE` → tu rol
- Los textos de descripción en la sección Hero y Sobre mí

### Cambiar enlaces de proyectos
Busca en `index.html` los botones "Ver Demo" y "GitHub" y reemplaza el `href="#"` con tus URLs reales.

### Cambiar redes sociales
Busca la sección `contact-socials` y `footer-social` en `index.html` y actualiza los `href`.

### Cambiar colores
Edita las variables en `css/styles.css` dentro de `:root { ... }`.

### Activar envío real del formulario
En `js/main.js`, busca el comentario `/* Simulación de envío */` y reemplaza el `setTimeout`
con una llamada real a [EmailJS](https://emailjs.com), [Formspree](https://formspree.io) u otro servicio.

---

## Abrir el sitio

Abre `index.html` directamente en tu navegador, o usa la extensión **Live Server** de VS Code
para recarga automática.

---

## Paleta de colores

| Variable                | Valor     | Uso                          |
|-------------------------|-----------|------------------------------|
| `--bg-main`             | `#0A0A0B` | Fondo principal              |
| `--bg-card`             | `#161618` | Tarjetas y módulos           |
| `--border`              | `#27272A` | Bordes y separadores         |
| `--text-primary`        | `#FFFFFF` | Títulos y encabezados        |
| `--text-secondary`      | `#A1A1AA` | Párrafos y descripciones     |
| `--btn-primary-bg`      | `#FFFFFF` | Fondo botón primario         |
| `--btn-primary-fg`      | `#0A0A0B` | Texto botón primario         |
| `--btn-secondary-bg`    | `#1F1F23` | Fondo botón secundario       |
