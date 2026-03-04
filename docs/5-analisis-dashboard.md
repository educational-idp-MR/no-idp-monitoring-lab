# 🔍 Etapa 3: Experimentación y Análisis del Sistema

<div align="center">

[⬅️ Anterior: Etapa 2.2](./4-propuesta-metrica.md) | [🏠 Inicio](./README.md)

</div>

---

<!-- Timer Component -->
<link rel="stylesheet" href="./assets/css/timer.css">
<div id="stage-timer" data-stage-id="etapa3" data-stage-name="Etapa 3: Experimentación y Análisis"></div>
<script src="./assets/js/stage-timer.js"></script>

---

## 🎯 Objetivo

Analizar el comportamiento real de la aplicación usando el dashboard construido en Grafana, identificar patrones, anomalías o comportamientos inesperados, y reflexionar sobre posibles causas basadas únicamente en las métricas y logs observados.

Como parte de esta etapa, si detectas comportamientos anómalos en algún endpoint, deberás **intentar corregirlos modificando el código de la aplicación** y luego observar cómo cambian las métricas después del ajuste.

---

## 📋 Proceso de Experimentación

### 1️⃣ Preparación del Entorno

1. Abre tu dashboard en Grafana.  
2. Verifica que la aplicación esté corriendo.  
3. Genera tráfico hacia la API utilizando el método que prefieras:
   - navegador  
   - Postman  
   - `curl`  

Ejecuta solicitudes de distintos tipos y frecuencias. Tu objetivo es observar cómo responde la aplicación bajo distintos patrones de uso.

---

### 2️⃣ Observación Guiada: Explorando el Comportamiento del Sistema

Mientras realizas experimentos con la aplicación, analiza cómo reaccionan los paneles de tu dashboard. Usa estas preguntas como guía (No es necesario responderlas en la bitacora) :

#### 📊 2.1. Tráfico y Carga
- ¿La tasa de solicitudes se incrementa cuando envías varias peticiones seguidas?  
- ¿Hay endpoints que muestran comportamientos distintos bajo la misma carga?

#### ⚡ 2.2. Rendimiento
- ¿La latencia se mantiene estable o presenta variaciones?  
- ¿Los picos de latencia coinciden con momentos de mayor tráfico?

#### ⚠️ 2.3. Errores
- ¿Aparecen errores en la visualización de códigos HTTP?  
- ¿Se concentran en determinados endpoints?  
- ¿Coinciden temporalmente con algo en los logs?

#### 📝 2.4. Logs
Con el panel de logs basado en Loki:
- Filtra por nivel (`INFO`, `WARN`, `ERROR`).  
- ¿Se observan mensajes repetitivos?  
- ¿Los logs te ayudan a interpretar picos o caídas en las métricas?

---

### 3️⃣ Identificación de Relaciones Causa-Efecto

Intenta correlacionar lo que ves:

- Tráfico - Latencia  
- Latencia - Errores  
- Errores - Mensajes en los logs  
- Logs - Patrones en los endpoints  

Ajusta el rango de tiempo para observar con más detalle (últimos 5 minutos, 15 minutos, 1 hora), para hacerlo puedes seleccionar una ventana de tiempo directamente sobre las visualizaciones de grafana en caso que quieras hacer "Zoom" sobre un área específica o con las opciones fijas del dashboard.

---

### 4️⃣ Detección de Anomalías y Puntos de Interés

Documenta brevemente en tu bitacora:

- ¿Cómo describirías la anomalía?
- ¿Qué paneles te ayudaron a identificar la anomalía?  
- ¿Cual podria ser la causa de la anomalía? <--- Intenta adivinar la causa, no es necesario que sea correcta.
- Añade una captura de pantalla del dashboard mostrando la anomalía

---

### 5️⃣ Intento de Corrección de Anomalías

A partir de las anomalías identificadas previamente (variaciones en la latencia, errores frecuentes, respuestas inesperadas, etc.) intenta corregir el comportamiento observado.

#### 🔧 5.1. Modifica el Código  
Revisa el código de la aplicación y realiza los ajustes que creas que podrían mitigar o corregir la anomalía.
Algunas sugerencias:  
- mejorar validaciones  
- ajustar lógica interna  
- refactorizar un fragmento  
- corregir una condición  
- optimizar manipulación de datos  
- mejorar manejo de excepciones  

Documenta brevemente en tu bitacora los ajustes que realizaste.

*Aplica el método científico → observar, formular hipótesis, intervenir y volver a observar.*

#### 🚀 5.2. Despliega la Aplicación Nuevamente  
Compila, ejecuta y genera tráfico otra vez hacia el endpoint. (Revisa la seccion 1 - Preparación del ambiente)

### 5.4. Observa cómo cambia la métrica  
- ¿El ajuste surtió efecto?
- Analiza el impacto del cambio, ¿la latencia cambio? ¿los errores disminuyeron?   
- Agrega una captura de pantalla del dashboard mostrando el estado del dashboard posterior al ajuste (configura un rango de tiempo que permita ver el antes y el despues).

Registra tus observaciones en la bitacora.

---

### 6️⃣ Registro de Observaciones

En tu bitácora del laboratorio documenta una breve **Reflexión final:**  
   - ¿Qué panel te resultó más útil para detectar problemas?  
   - ¿Qué métrica aporta mayor valor para monitorear un sistema real?  
   - ¿Qué agregarías o mejorarías en tu dashboard?

---

## 🎉 Conclusión de la Etapa

En esta etapa has utilizado métricas y logs como herramientas fundamentales para comprender el comportamiento de un sistema en ejecución.  
También aplicaste un proceso iterativo de análisis y corrección, muy similar al que se usa en entornos reales de observabilidad, donde los dashboards son clave para detectar problemas y validar mejoras.

---


## 🎓 ¡Felicitaciones!

Has completado exitosamente el laboratorio de Observabilidad y Telemetría. Ahora tienes experiencia práctica en:

- ✅ Desplegar aplicaciones instrumentadas en la nube
- ✅ Analizar métricas con Prometheus
- ✅ Crear dashboards efectivos en Grafana
- ✅ Implementar métricas personalizadas
- ✅ Detectar y corregir anomalías usando observabilidad
- ✅ Aplicar el método científico en ingeniería de software

**Estas habilidades son fundamentales para la ingeniería de software moderna y DevOps.**

---

## Exploración Adicional (Opcional)

Si aún cuentas con tiempo disponible, siéntete libre de explorar el entorno del laboratorio y las capacidades de las herramientas por tu cuenta. Algunas ideas:

- Prueba nuevos filtros y vistas en Grafana
- Explora consultas más avanzadas en Loki
- Agrega paneles adicionales al dashboard
- Revisa cómo cambian las métricas con diferentes patrones de tráfico
- Observa qué ocurre si cargas endpoints menos utilizados
- Investiga si puedes detectar comportamientos que pasaron desapercibidos
- Explora otras funcionalidades de grafana

### 📌 Importante:
Si encuentras algo curioso, inesperado o relevante, documenta tus hallazgos adicionales en tu bitácora.
No necesitas explicaciones profundas — basta con registrar qué observaste y por qué te llamó la atención.
---

<div align="center">

### 📚 Recursos para Continuar Aprendiendo

- [Prometheus Best Practices](https://prometheus.io/docs/practices/naming/)
- [Grafana Dashboard Best Practices](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/best-practices/)
- [The Four Golden Signals](https://sre.google/sre-book/monitoring-distributed-systems/)
- [Observability Engineering (O'Reilly Book)](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)



<div class="finish-stage-container">
  <button id="finish-stage-btn" class="finish-stage-btn" data-next-url="">
    🏆 Finalizar Laboratorio ✅
  </button>
  <p class="finish-stage-info">
    💾 Al hacer clic, tu tiempo será guardado y verás el resumen completo abajo . Toma ScreenShot del informe y adjuntalo en tu bitácora.
  </p>
</div>

**¡Gracias por completar este laboratorio! 🚀**

---

## 📊 Resumen de Tiempos del Laboratorio

<div id="time-summary-container"></div>

<script>
// Display time summary for all stages
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('time-summary-container');
  if (!container) return;
  
  const stages = [
    { id: 'etapa1', name: 'Etapa 1: Preparación del Ambiente', estimated: '20-30 min' },
    { id: 'etapa2', name: 'Etapa 2: Métricas Iniciales', estimated: '15-20 min' },
    { id: 'etapa2-1', name: 'Etapa 2.1: Dashboard Base en Grafana', estimated: '30-40 min' },
    { id: 'etapa2-2', name: 'Etapa 2.2: Propuesta de Métrica Personalizada', estimated: '25-35 min' },
    { id: 'etapa3', name: 'Etapa 3: Experimentación y Análisis', estimated: '30-40 min' }
  ];
  
  let html = '<table class="time-summary-table"><thead><tr><th>Etapa</th><th>Tiempo Estimado</th><th>Tu Tiempo</th><th>Estado</th></tr></thead><tbody>';
  
  let totalTime = 0;
  let completedCount = 0;
  
  stages.forEach(stage => {
    const completionKey = `stage_${stage.id}_completed`;
    const data = localStorage.getItem(completionKey);
    
    let actualTime = '-';
    let status = '❌ No completada';
    
    if (data) {
      const completion = JSON.parse(data);
      actualTime = completion.timeText;
      status = '✅ Completada';
      totalTime += completion.timeSpent;
      completedCount++;
    }
    
    html += `<tr><td><strong>${stage.name}</strong></td><td>${stage.estimated}</td><td><strong>${actualTime}</strong></td><td>${status}</td></tr>`;
  });
  
  // Total row
  if (totalTime > 0) {
    const hours = Math.floor(totalTime / 3600000);
    const minutes = Math.floor((totalTime % 3600000) / 60000);
    const seconds = Math.floor((totalTime % 60000) / 1000);
    
    let totalText = '';
    if (hours > 0) totalText += `${hours}h `;
    if (minutes > 0) totalText += `${minutes}m `;
    totalText += `${seconds}s`;
    
    html += `<tr class="total-time-row"><td colspan="2"><strong>🏆 Tiempo Total</strong></td><td colspan="2"><strong>${totalText}</strong> (${completedCount}/5 etapas)</td></tr>`;
  } else {
    html += `<tr class="total-time-row"><td colspan="4" style="text-align:center;"><em>Aún no has completado ninguna etapa. Los tiempos se registrarán cuando hagas clic en "Finalizar Etapa" en cada sección.</em></td></tr>`;
  }
  
  html += '</tbody></table>';
  
  // Add clear data button
  html += '<div style="text-align: center; margin-top: 20px;"><button onclick="clearAllTimes()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">🗑️ Limpiar Todos los Tiempos</button></div>';
  
  container.innerHTML = html;
});

function clearAllTimes() {
  if (confirm('¿Estás seguro de eliminar todos los tiempos registrados? Esta acción no se puede deshacer.')) {
    const stages = ['etapa1', 'etapa2', 'etapa2-1', 'etapa2-2', 'etapa3'];
    stages.forEach(stageId => {
      localStorage.removeItem(`stage_${stageId}`);
      localStorage.removeItem(`stage_${stageId}_completed`);
    });
    localStorage.removeItem('lab_total_time');
    location.reload();
  }
}
</script>

</div>
