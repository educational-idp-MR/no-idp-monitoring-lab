# 🔄 Flujo del Sistema de Timer

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO DE ETAPA                          │
│                                                             │
│  Usuario entra a una etapa (ej: Etapa 1)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│               INICIALIZACIÓN DEL TIMER                      │
│                                                             │
│  • Carga tiempo guardado (si existe)                       │
│  • Auto-reanuda si estaba corriendo                        │
│  • Muestra display 00:00:00                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  USUARIO TRABAJA                            │
│                                                             │
│  ▶️  [Iniciar] → Timer comienza a contar                   │
│  ⏸️  [Pausar] → Timer se detiene temporalmente             │
│  🔄 [Reiniciar] → Timer vuelve a 00:00:00                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Usuario decide continuar...
                      ▼
┌─────────────────────────────────────────────────────────────┐
│          USUARIO HACE CLIC EN "➡️ SIGUIENTE"               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
              ┌───────┴────────┐
              │                │
              ▼                ▼
    ┌─────────────┐   ┌──────────────┐
    │ ¿Completada?│   │ ¿Tiene tiempo?│
    └─────┬───────┘   └──────┬───────┘
          │                  │
     NO   │                  │ SÍ (> 0s)
          │                  │
          └─────────┬────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │    🚨 MODAL DE CONFIRMACIÓN           │
    │                                       │
    │  ┌─────────────────────────────────┐ │
    │  │  ⏱️  ¿Guardar tiempo?           │ │
    │  │                                 │ │
    │  │  Tiempo: 25m 15s                │ │
    │  │                                 │ │
    │  │  [✅ Sí, Guardar]               │ │
    │  │  [⏭️ Continuar sin Guardar]    │ │
    │  └─────────────────────────────────┘ │
    └───────────────┬───────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│  ✅ SÍ, GUARDAR │   │ ⏭️ SIN GUARDAR │
└────────┬────────┘   └────────┬────────┘
         │                     │
         ▼                     │
┌─────────────────┐            │
│  • Guarda tiempo│            │
│  • Marca como   │            │
│    completada   │            │
│  • Muestra 🎉  │            │
└────────┬────────┘            │
         │                     │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  NAVEGA A SIGUIENTE  │
         │       ETAPA          │
         └─────────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  NUEVA ETAPA INICIA  │
         │  (Ciclo se repite)   │
         └─────────────────────┘
```

---

## 🎬 Escenarios de Uso

### Escenario 1: Completar Etapa Normalmente ✅

1. Usuario entra a **Etapa 1**
2. Hace clic en **▶️ Iniciar**
3. Trabaja en la etapa (25 minutos)
4. Hace clic en **➡️ Siguiente** (hacia Etapa 2)
5. 🚨 **Aparece modal**: "¿Guardar 25m 15s?"
6. Hace clic en **✅ Sí, Guardar**
7. ✅ Tiempo guardado
8. Navega a Etapa 2

**Resultado:** ✅ Etapa 1 marcada como completada con 25m 15s

---

### Escenario 2: Usuario Olvida Finalizar ⚠️

1. Usuario entra a **Etapa 2**
2. Hace clic en **▶️ Iniciar**
3. Trabaja en la etapa (18 minutos)
4. ❌ **Olvida hacer clic en "Finalizar Etapa"**
5. Hace clic en **➡️ Siguiente** (hacia Etapa 2.1)
6. 🚨 **Modal lo salva**: "¿Guardar 18m 42s?"
7. Hace clic en **✅ Sí, Guardar**
8. ✅ Tiempo guardado automáticamente

**Resultado:** ✅ Etapa 2 guardada aunque olvidó finalizar manualmente

---

### Escenario 3: Usuario No Quiere Guardar ⏭️

1. Usuario entra a **Etapa 2.1**
2. Hace clic en **▶️ Iniciar**
3. Solo explora rápido (2 minutos)
4. Hace clic en **➡️ Siguiente**
5. 🚨 **Aparece modal**: "¿Guardar 2m 15s?"
6. Hace clic en **⏭️ Continuar sin Guardar**
7. Navega sin guardar

**Resultado:** ❌ Etapa 2.1 NO marcada como completada

---

### Escenario 4: Etapa Ya Completada ✅

1. Usuario completó **Etapa 1** (guardó 25m 15s)
2. Vuelve a entrar a Etapa 1 para revisar
3. Hace clic en **➡️ Siguiente**
4. ✅ **Modal NO aparece** (ya está completada)
5. Navega directamente a Etapa 2

**Resultado:** Sin interrupciones, navegación fluida

---

### Escenario 5: Timer Sin Iniciar 🚫

1. Usuario entra a **Etapa 3**
2. ❌ **No hace clic en Iniciar**
3. Solo lee sin trabajar
4. Hace clic en **➡️ Siguiente**
5. ✅ **Modal NO aparece** (timer en 00:00:00)
6. Navega directamente

**Resultado:** Sin interrupciones si no hay tiempo registrado

---

## 🎯 Casos Especiales

### Navegación Hacia Atrás
```
Usuario en Etapa 2 → Hace clic en "⬅️ Anterior"
→ Modal NO aparece (solo intercepta "Siguiente")
```

### Navegación al Inicio
```
Usuario en cualquier etapa → Hace clic en "🏠 Inicio"
→ Modal NO aparece (solo intercepta "Siguiente")
```

### Múltiples Visitas
```
Usuario completa Etapa 1 (25m)
→ Después vuelve a Etapa 1
→ Timer muestra 25m (tiempo guardado)
→ Puede reiniciar si quiere empezar de nuevo
```

---

## 📊 Beneficios del Sistema

### Para Estudiantes:
- 🛡️ **Protección**: No pierden tiempo por olvido
- ⚡ **Rapidez**: Un clic para guardar
- 🎯 **Flexibilidad**: Pueden elegir guardar o no
- 📈 **Motivación**: Ven su progreso acumulado

### Para Instructores:
- 📊 **Datos**: Pueden pedir capturas del resumen final
- ⏱️ **Planificación**: Datos reales de tiempo por etapa
- 🎓 **Evaluación**: Identificar etapas que toman más tiempo

---

## 🔮 Flujo Completo del Laboratorio

```
Etapa 1    → Modal → ✅ Guardado (25m)
             ↓
Etapa 2    → Modal → ✅ Guardado (18m)
             ↓
Etapa 2.1  → Modal → ✅ Guardado (35m)
             ↓
Etapa 2.2  → Modal → ✅ Guardado (28m)
             ↓
Etapa 3    → Modal → ✅ Guardado (32m)
             ↓
      📊 RESUMEN FINAL 📊
      
┌─────────────────────────────────────┐
│  🏆 LABORATORIO COMPLETADO          │
│                                     │
│  Tiempo Total: 2h 18m               │
│  Etapas: 5/5 ✅                     │
│                                     │
│  [Ver Resumen Detallado]            │
└─────────────────────────────────────┘
```

---

**Este flujo garantiza que ningún estudiante pierda su progreso accidentalmente! 🎉**
