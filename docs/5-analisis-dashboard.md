# Etapa 3 – Experimentación y Análisis del Comportamiento del Sistema

## Objetivo
Analizar el comportamiento real de la aplicación usando el dashboard construido en Grafana, identificar patrones, anomalías o comportamientos inesperados, y reflexionar sobre posibles causas basadas únicamente en las métricas y logs observados.

Como parte de esta etapa, si detectas comportamientos anómalos en algún endpoint, deberás **intentar corregirlos modificando el código de la aplicación** y luego observar cómo cambian las métricas después del ajuste.

---

## 1. Preparación del entorno

1. Abre tu dashboard en Grafana.  
2. Verifica que la aplicación esté corriendo.  
3. Genera tráfico hacia la API utilizando el método que prefieras:
   - navegador  
   - Postman  
   - `curl`  

Ejecuta solicitudes de distintos tipos y frecuencias. Tu objetivo es observar cómo responde la aplicación bajo distintos patrones de uso.

---

## 2. Observación guiada: explorando el comportamiento del sistema

Mientras realizas experimentos con la aplicación, analiza cómo reaccionan los paneles de tu dashboard. Usa estas preguntas como guía :

### 2.1. Tráfico y carga
- ¿La tasa de solicitudes se incrementa cuando envías varias peticiones seguidas?  
- ¿Hay endpoints que muestran comportamientos distintos bajo la misma carga?

### 2.2. Rendimiento
- ¿La latencia se mantiene estable o presenta variaciones?  
- ¿Los picos de latencia coinciden con momentos de mayor tráfico?

### 2.3. Errores
- ¿Aparecen errores en la visualización de códigos HTTP?  
- ¿Se concentran en determinados endpoints?  
- ¿Coinciden temporalmente con algo en los logs?

### 2.4. Logs
Con el panel de logs basado en Loki:
- Filtra por nivel (`INFO`, `WARN`, `ERROR`).  
- ¿Se observan mensajes repetitivos?  
- ¿Los logs te ayudan a interpretar picos o caídas en las métricas?

---

## 3. Identificación de relaciones causa–efecto

Intenta correlacionar lo que ves:

- Tráfico - Latencia  
- Latencia - Errores  
- Errores - Mensajes en los logs  
- Logs - Patrones en los endpoints  

Ajusta el rango de tiempo para observar con más detalle (últimos 5 minutos, 15 minutos, 1 hora), para hacerlo puedes seleccionar una ventana de tiempo directamente sobre las visualizaciones de grafana en caso que quieras hacer "Zoom" sobre un área específica o con las opciones fijas del dashboard.

---

## 4. Detección de anomalías y puntos de interés

Durante tu experimentación, presta atención a:

- Picos de latencia inesperados  
- Tiempos de respuesta inconsistentes  
- Errores HTTP en momentos específicos  
- Repentinas caídas o aumentos de tráfico  
- Logs con mensajes atípicos o en cantidades inusuales  
- Endpoints cuyos valores no cambian como esperarías  

Reflexiona:

- ¿Qué valores parecen normales?  
- ¿Qué te llama la atención?  
- ¿Qué panel te alertó primero?  
- ¿Cómo lo confirmaste?

---

## 5. *Tarea adicional*: Intento de corrección de anomalías

Si en tu análisis detectas **anomalías persistentes** en algún endpoint (variaciones en la latencia, errores frecuentes, respuestas inesperadas, etc.):

### ✏️ 5.1. Propón una posible causa  
Basándote en las métricas y en los logs, escribe una hipótesis.  
Por ejemplo:  
- “Este endpoint parece más lento que los demás porque…”  
- “Los errores aumentan cuando hago este tipo de solicitudes…”  

### 🛠️ 5.2. Modifica el código  
Revisa el código de la aplicación y realiza un pequeño ajuste que creas que podría mitigar o corregir el comportamiento observado:  
- mejorar validaciones  
- ajustar lógica interna  
- refactorizar un fragmento  
- mover cálculos  
- corregir una condición  
- optimizar manipulación de datos  
- mejorar manejo de excepciones  

*No detectar con: lo importante es aplicar el método científico → observar, formular hipótesis, intervenir y volver a observar.)*

### 5.3. Despliega la aplicación nuevamente  
Compila, ejecuta y genera tráfico otra vez hacia el endpoint.

### 5.4. Observa cómo cambia la métrica  
¿El ajuste surtió efecto?  
- ¿La latencia cambió?  
- ¿Los errores disminuyeron?  
- ¿Los logs muestran un comportamiento más estable?  

Registra tus observaciones.

---

## 6. Registro de observaciones

En tu bitácora del laboratorio documenta:

1. **Valores observados**  : Incluye una foto con: 
   - Tiempos de respuesta  
   - Tasas de solicitudes  
   - Errores  
   - Anomalías detectadas  

2. **Correlaciones**  
   - Qué paneles se relacionan entre sí  
   - Qué métricas cambiaron al mismo tiempo  

3. **Anomalías detectadas**  
   - Cuándo ocurrieron  
   - Cómo se identificaron:
        - Qué viste en el dashboard  
        - Qué viste en los logs  

4. **Intervención (si aplica)**  
   - Hipótesis inicial sobre la causa  
   - Ajuste realizado en el código  
   - Impacto después del cambio  (Imagen  y analisis del estado del dashboard posterior al ajuste)

5. **Reflexión final**  
   - ¿Qué panel te resultó más útil para detectar problemas?  
   - ¿Qué métrica aporta mayor valor para monitorear un sistema real?  
   - ¿Qué agregarías o mejorarías en tu dashboard?

---

## 7. Conclusión de la etapa

En esta etapa has utilizado métricas y logs como herramientas fundamentales para comprender el comportamiento de un sistema en ejecución.  
También aplicaste un proceso iterativo de análisis y corrección, muy similar al que se usa en entornos reales de observabilidad, donde los dashboards son clave para detectar problemas y validar mejoras.

