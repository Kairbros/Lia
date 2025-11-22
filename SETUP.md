# Instrucciones de Configuración - LIA

## Instalación de Tailwind CSS

Para que la aplicación funcione correctamente, necesitas instalar Tailwind CSS. Solo necesitas ejecutar este comando una vez en tu terminal:

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Ejecutar la Aplicación

Una vez instalado Tailwind, ejecuta:

```bash
npm run dev
```

## Personalización

### Cambiar el Video de YouTube

En el archivo `src/App.jsx`, busca esta línea (línea 19):

```javascript
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'
```

Reemplaza `'dQw4w9WgXcQ'` con el ID de tu video de YouTube. El ID es la parte que viene después de `v=` en la URL del video.

Por ejemplo, si tu video es: `https://www.youtube.com/watch?v=ABC123xyz`  
El ID sería: `ABC123xyz`

### Personalizar el Chatbot

Las respuestas del chatbot están en la función `getBotResponse` (líneas 37-46). Puedes modificar las respuestas o conectarlo a una API real de chatbot.

## Características

✨ **Video de YouTube embebido** - Responsive y con diseño moderno  
🎨 **Animaciones suaves** - Transiciones elegantes entre secciones  
💬 **Chat interactivo** - Con indicador de escritura y burbujas de mensajes  
📱 **Responsive** - Funciona en móvil, tablet y escritorio  
🌈 **Diseño moderno** - Gradientes vibrantes y efectos glassmorphism
