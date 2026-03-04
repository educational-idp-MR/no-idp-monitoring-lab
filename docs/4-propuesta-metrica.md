# 🔧 Etapa 2.2: Propuesta de Métrica Personalizada

<div align="center">

[⬅️ Anterior: Etapa 2.1](./3-grafana-dashboard-base.md) | [🏠 Inicio](./README.md) | [➡️ Siguiente: Etapa 3](./5-analisis-dashboard.md)

</div>

---

<!-- Timer Component -->
<link rel="stylesheet" href="./assets/css/timer.css">
<div id="stage-timer" data-stage-id="etapa2-2" data-stage-name="Etapa 2.2: Propuesta de Métrica Personalizada"></div>
<script src="./assets/js/stage-timer.js"></script>

---

## 🎯 Objetivo

En esta etapa analizarás el comportamiento interno del servicio de acortamiento de URLs y propondrás una **métrica personalizada** que complemente las métricas ya expuestas en el endpoint `/actuator/prometheus`.

Esta métrica no debe ser una copia de las existentes, sino una métrica que **tenga sentido según el dominio de la aplicación** y su comportamiento real.

---

## 📋 Construcción de tu Métrica Personalizada

### 2.2.1 Revisa la Funcionalidad de la Aplicación

Dentro del proyecto, encontrarás la clase: `UrlShortenerService (paquete com.telemetry.urlshortener.service)`

Esta clase implementa la lógica principal del acortador de URLs, incluyendo:

- La creación de URLs cortas  
- La recuperación de URLs almacenadas  
- El almacenamiento en memoria  

Además, dentro de esta misma clase se encuentra definido un **Counter de ejemplo** (`dummyCounter`), que sirve únicamente como referencia para entender dónde y cómo se integran las métricas en el servicio, pero **no aporta información útil** sobre el estado real de la aplicación.

Tu tarea será analizar esta clase para identificar un comportamiento que no esté siendo medido y que sería valioso monitorear desde el punto de vista de observabilidad.

---

### 2.2.2 Identifica un Comportamiento Relevante para Medir

Observa cómo funciona el servicio y piensa:

**¿Qué evento importante ocurre dentro de la aplicación que aún no está siendo medido?**

Una vez hayas elegido un comportamiento interesante, documenta en tu bitácora:

1. **Nombre de la métrica.**  
2. **Qué tipo de métrica sería apropiada**  
   - *Counter* si cuenta eventos
   - *Gauge* si mide estados
3. **Qué comportamiento mide.**  
4. **Por qué es relevante para el sistema.**  


---

### 2.2.3 Implementa la Métrica en el Código

> Debes instrumentar tu métrica dentro de `UrlShortenerService`, siguiendo el patrón del `dummyCounter` ya existente.

Instrucciones generales:

1. En `UrlShortenerService`, declara la métrica como un atributo final, usando el `MeterRegistry` inyectado en el constructor.  
2. Regístrala usando el builder correspondiente (Counter, Gauge, Timer, etc.).  
3. Ubica la llamada al método `.increment()`, `.record()`, o equivalente **exactamente en el lugar del flujo lógico donde tu métrica tiene sentido**.  
4. Usa etiquetas si consideras que aportan valor (optional).

Cuando termines, despliega nuevamente la aplicación   y verifica que tu métrica aparece en: `http://{Public-DNS}/actuator/prometheus`.


---

### 2.2.4 Define Cómo la Visualizarías en Grafana

Una vez tengas la métrica, debes pensar cómo se visualizaría.

### Contesta en tu bitácora:

1. **¿Qué tipo de panel usarías en Grafana?**  
   - Time series  
   - Gauge  
   - Stat  
   - Bar chart  

2. **¿Qué consulta PromQL vas a utilizar?**
   Experimenta con el constructor de consultas en grafana, y menciona cual es la consulta resultante
   para el comportamiento que quieres visualizar.  
   

3. **¿Cuál es el propósito de la visualización?**
Provee una interpretación en palabras con el propósito de la visualización

---

### 2.2.5 Agrega el Panel a tu Dashboard

Usando la métrica , crea **un panel** en Grafana que represente la nueva visualización.

Instrucciones:

1. Abre tu dashboard.  
2. Selecciona **Add panel**.  
3. Usa tu métrica para crear la consulta.  
4. Ajusta:
   - Título descriptivo  
   - Tipo de visualización  
   - Unidades  
   - Límites o colores si aplica  

---

Incluye una captura de pantalla del panel en tu bitácora.

---

## ✅ Verificación

**Asegúrate de haber completado:**
- ☑️ Análisis del comportamiento del servicio
- ☑️ Propuesta documentada de la métrica en tu bitácora
- ☑️ Implementación de la métrica en el código Java
- ☑️ Verificación en el endpoint `/actuator/prometheus`
- ☑️ Panel creado en Grafana con tu métrica

> **💡 Reflexión:** Las métricas de dominio son más valiosas que las métricas técnicas genéricas, porque reflejan el comportamiento específico de tu negocio.

---

## 📍 Próximos Pasos

Con tu métrica personalizada implementada y visualizada, es momento de analizar el comportamiento del sistema y detectar anomalías.


---

<div class="finish-stage-container">
  <button id="finish-stage-btn" class="finish-stage-btn" data-next-url="./5-analisis-dashboard">
    ✅ Finalizar Etapa y Continuar ➡️
  </button>
  <p class="finish-stage-info">
    💾 Al hacer clic, tu tiempo será guardado automáticamente y continuarás a la siguiente etapa
  </p>
</div>

