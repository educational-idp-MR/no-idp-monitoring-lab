# ⏱️ Guía del Sistema de Timer por Etapas

## 📖 ¿Qué es?

El sistema de timer te permite medir **exactamente cuánto tiempo pasas en cada etapa** del laboratorio. Es una herramienta útil para:

- 📊 Monitorear tu progreso en tiempo real
- 🎯 Comparar tu tiempo con el estimado
- 📈 Identificar qué secciones te toman más tiempo
- 🏆 Ver tu tiempo total al finalizar el laboratorio

---

## 🎮 Cómo Usar el Timer

### En Cada Etapa Verás:

```
┌──────────────────────────────────────┐
│   ⏱️ Tiempo en esta etapa           │
│                                      │
│           00:15:32                   │
│                                      │
│  ▶️ Iniciar  ⏸️ Pausar              │
│  ✅ Finalizar Etapa  🔄 Reiniciar   │
└──────────────────────────────────────┘
```

### Botones Disponibles:

1. **▶️ Iniciar**
   - Comienza a contar el tiempo
   - Se activa automáticamente al entrar a la etapa (si ya estaba corriendo)

2. **⏸️ Pausar**
   - Detiene temporalmente el contador
   - Útil si necesitas tomar un descanso

3. **✅ Finalizar Etapa**
   - Marca la etapa como completada
   - Guarda tu tiempo final
   - Muestra un mensaje de felicitación con el tiempo total

4. **🔄 Reiniciar**
   - Resetea el timer a 00:00:00
   - Útil si quieres empezar de nuevo

---

## 🚨 Guardado Automático al Cambiar de Etapa

### ¿Qué Sucede Cuando Haces Clic en "Siguiente"?

Cuando hagas clic en el botón **"➡️ Siguiente"** para pasar a la siguiente etapa, el sistema **detectará automáticamente** que aún no has guardado tu tiempo y te mostrará un **modal de confirmación**:

```
┌────────────────────────────────────┐
│         ⏱️                              │
│  ¿Guardar tiempo de esta etapa?      │
│                                      │
│  Estás a punto de pasar a la          │
│  siguiente etapa.                     │
│  Etapa 1: Preparación del Ambiente   │
│                                      │
│  Tiempo transcurrido:                 │
│       25m 15s                         │
│                                      │
│  ¿Quieres registrar este tiempo       │
│  como completado?                     │
│                                      │
│  [✅ Sí, Guardar]  [⏭️ Sin Guardar]  │
└────────────────────────────────────┘
```

### Opciones del Modal:

#### ✅ **Sí, Guardar Tiempo**
- Guarda automáticamente tu tiempo como completado
- Registra la etapa en tu historial
- Te lleva a la siguiente etapa después de 1 segundo
- **Recomendado**: Para llevar un registro completo

#### ⏭️ **Continuar sin Guardar**
- No guarda el tiempo de la etapa actual
- Te lleva inmediatamente a la siguiente etapa
- Puedes volver después y guardar manualmente

### ¿Cuándo Aparece el Modal?

El modal **solo aparece** cuando:
- ✅ El timer tiene tiempo registrado (> 0 segundos)
- ✅ La etapa aún NO ha sido marcada como completada
- ✅ Haces clic en un link de "Siguiente" o "➡️"

### ¿Cuándo NO Aparece?

El modal **NO aparece** si:
- ❌ Ya completaste la etapa (hiciste clic en "✅ Finalizar Etapa")
- ❌ El timer está en 00:00:00 (no has iniciado)
- ❌ Navegas hacia atrás ("⬅️ Anterior")
- ❌ Vas al inicio ("🏠 Inicio")

### Ventajas de Esta Funcionalidad:

1. **🛡️ Protección contra olvidos**: No perderás tu tiempo accidentalmente
2. **📊 Mejora la precisión**: Captura el tiempo exacto al terminar
3. **✨ Experiencia fluida**: No necesitas recordar hacer clic en "Finalizar"
4. **🎯 Flexibilidad**: Puedes elegir guardar o no en cada momento

---

## 💾 Persistencia de Datos

### ¿Dónde se Guarda?

Los tiempos se guardan en el **localStorage** de tu navegador:

- ✅ Se mantienen incluso si cierras la página
- ✅ Se mantienen entre sesiones
- ✅ Son privados (solo tú los ves)
- ❌ No se sincronizan entre diferentes navegadores/dispositivos

### Datos Guardados:

Para cada etapa se guarda:
- Tiempo transcurrido actual
- Estado (corriendo/pausado)
- Tiempo de finalización (cuando completas)
- Fecha de completación

---

## 📊 Resumen Final

Al final de la **Etapa 3**, verás una tabla completa con:

| Etapa | Tiempo Estimado | Tu Tiempo | Estado |
|-------|-----------------|-----------|--------|
| Etapa 1 | 20-30 min | 25m 15s | ✅ Completada |
| Etapa 2 | 15-20 min | 18m 42s | ✅ Completada |
| ... | ... | ... | ... |
| **Total** | - | **2h 15m 30s** | 5/5 etapas |

### Funciones del Resumen:

- 📈 Ver todos tus tiempos en un solo lugar
- 📊 Comparar con tiempos estimados
- 🗑️ Botón para limpiar todos los datos

---

## 🔧 Funcionalidades Técnicas

### Auto-inicio
Si sales de una página mientras el timer está corriendo y vuelves a entrar, **automáticamente continúa desde donde lo dejaste**.

### Multi-sesión
Puedes trabajar en el laboratorio en múltiples días. El timer recordará tu progreso.

### Sin Internet
El timer funciona completamente offline. No requiere conexión a internet.

---

## 🎯 Mejores Prácticas

### ✅ Recomendaciones:

1. **Inicia el timer al comenzar** cada etapa
2. **Pausa si te distraes** o tomas un descanso largo
3. **Usa el modal automático** cuando pases a la siguiente etapa (aparecerá solo)
4. **Guarda tu tiempo** cuando el modal te lo pregunte si completaste la etapa
5. **No reinicies** a menos que realmente quieras empezar de cero

### ❌ Evita:

1. No ignores el modal de guardado si completaste la etapa
2. No uses múltiples navegadores (los tiempos no se sincronizan)
3. No limpies el localStorage del navegador si quieres mantener tus tiempos
4. No hagas clic en "Continuar sin Guardar" si ya terminaste la etapa

---

## 🐛 Solución de Problemas

### El timer no aparece
- ✅ Verifica que JavaScript esté habilitado
- ✅ Recarga la página (Ctrl/Cmd + R)
- ✅ Limpia la caché del navegador

### Los tiempos se pierden
- ⚠️ ¿Limpiaste el localStorage?
- ⚠️ ¿Usaste modo incógnito?
- ⚠️ ¿Cambiaste de navegador?

### El timer no cuenta
- ✅ Haz clic en "Iniciar"
- ✅ Verifica que no esté pausado
- ✅ Recarga la página

---

## 🗑️ Limpiar Datos

Si quieres empezar de cero:

### Opción 1: Desde el Resumen
Al final de la Etapa 3, usa el botón **"🗑️ Limpiar Todos los Tiempos"**

### Opción 2: Manual
Abre la consola del navegador (F12) y ejecuta:
```javascript
localStorage.clear();
```

### Opción 3: Por Etapa
Usa el botón "🔄 Reiniciar" en cada etapa

---

## 💡 Tips

- 📝 Anota tus tiempos en la bitácora para referencia futura
- 📊 Compara tus tiempos con compañeros (sin competir)
- 🎯 Usa los tiempos para planificar futuras sesiones de estudio
- 🏆 Celebra cuando completes todo el laboratorio

---

## 📞 Soporte

Si tienes problemas con el timer:
1. Revisa esta guía
2. Intenta recargar la página
3. Consulta con tu instructor
4. El timer es opcional - lo importante es completar el contenido

---

**Recuerda:** El timer es una **herramienta de apoyo**, no una competencia. Tómate el tiempo que necesites para aprender correctamente. 🚀
