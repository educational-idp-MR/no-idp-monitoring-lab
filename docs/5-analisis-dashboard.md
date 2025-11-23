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

Mientras realizas experimentos con la aplicación, analiza cómo reaccionan los paneles de tu dashboard. Usa estas preguntas como guía (No es necesario responderlas en la bitacora) :

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

Documenta brevemente en tu bitacora:

- ¿Cómo describirías la anomalía?
- ¿Qué paneles te ayudaron a identificar la anomalía?  
- ¿Cual podria ser la causa de la anomalía? <--- Intenta adivinar la causa, no es necesario que sea correcta.
- Añade una captura de pantalla del dashboard mostrando la anomalía

---

## 5. Intento de corrección de anomalías

A partir de las anomalías identificadas previamente (variaciones en la latencia, errores frecuentes, respuestas inesperadas, etc.) intenta corregir el comportamiento observado.

### 5.1. Modifica el código  
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

### 5.2. Despliega la aplicación nuevamente  
Compila, ejecuta y genera tráfico otra vez hacia el endpoint. (Revisa la seccion 1 - Preparación del ambiente)

### 5.4. Observa cómo cambia la métrica  
- ¿El ajuste surtió efecto?
- Analiza el impacto del cambio, ¿la latencia cambio? ¿los errores disminuyeron?   
- Agrega una captura de pantalla del dashboard mostrando el estado del dashboard posterior al ajuste (configura un rango de tiempo que permita ver el antes y el despues).

Registra tus observaciones en la bitacora.

---

## 6. Registro de observaciones

En tu bitácora del laboratorio documenta una breve **Reflexión final:**  
   - ¿Qué panel te resultó más útil para detectar problemas?  
   - ¿Qué métrica aporta mayor valor para monitorear un sistema real?  
   - ¿Qué agregarías o mejorarías en tu dashboard?

---

## 7. Conclusión de la etapa

En esta etapa has utilizado métricas y logs como herramientas fundamentales para comprender el comportamiento de un sistema en ejecución.  
También aplicaste un proceso iterativo de análisis y corrección, muy similar al que se usa en entornos reales de observabilidad, donde los dashboards son clave para detectar problemas y validar mejoras.

