# Etapa 2.2 – Propuesta de una métrica personalizada basada en el comportamiento del acortador de URLs

En esta etapa analizarás el comportamiento interno del servicio de acortamiento de URLs y propondrás una **métrica personalizada** que complemente las métricas ya expuestas en el endpoint `/actuator/prometheus`.

Esta métrica no debe ser una copia de las existentes, sino una métrica que **tenga sentido según el dominio de la aplicación** y su comportamiento real.

---

## 1. Revisa la funcionalidad de la aplicación

Dentro del proyecto, encontrarás la clase: `UrlShortenerService (paquete com.telemetry.urlshortener.service)`

Esta clase implementa la lógica principal del acortador de URLs, incluyendo:

- La creación de URLs cortas  
- La recuperación de URLs almacenadas  
- El almacenamiento en memoria  

Además, dentro de esta misma clase se encuentra definido un **Counter de ejemplo** (`dummyCounter`), que sirve únicamente como referencia para entender dónde y cómo se integran las métricas en el servicio, pero **no aporta información útil** sobre el estado real de la aplicación.

Tu tarea será analizar esta clase para identificar un comportamiento que no esté siendo medido y que sería valioso monitorear desde el punto de vista de observabilidad.

---

## 2. Identifica un comportamiento relevante para medir

Observa cómo funciona el servicio y piensa:

**¿Qué evento importante ocurre dentro de la aplicación que aún no está siendo medido?**

Una vez hayas elegido un comportamiento interesante, documenta:

1. **Nombre de la métrica.**  
2. **Qué comportamiento mide.**  
3. **Por qué es relevante para el sistema.**  
4. **En qué punto del servicio tendría sentido capturarla**  
   (por ejemplo: durante la creación de URLs, durante los accesos, etc.)  
5. **Qué tipo de métrica sería apropiada**  
   - *Counter* si cuenta eventos
   - *Gauge* si mide estados

> Escribe esta propuesta en tu bitácora del laboratorio, en máximo un párrafo breve.

---

## 3. Implementa la métrica en el código

> **Importante:** No te daré el código exacto.  
> Tú debes instrumentar tu métrica dentro de `UrlShortenerService`, siguiendo el patrón del `dummyCounter` ya existente.

Instrucciones generales:

1. En `UrlShortenerService`, declara la métrica como un atributo final, usando el `MeterRegistry` inyectado en el constructor.  
2. Regístrala usando el builder correspondiente (Counter, Gauge, Timer, etc.).  
3. Ubica la llamada al método `.increment()`, `.record()`, o equivalente **exactamente en el lugar del flujo lógico donde tu métrica tiene sentido**.  
4. Usa etiquetas si consideras que aportan valor (optional).

Cuando termines, reinicia la aplicación   y verifica que tu métrica aparece en: `http://localhost:8080/actuator/prometheus`



## 4. Define cómo la visualizarías en Grafana

Una vez tengas la métrica, debes pensar cómo se visualizaría.

### Contesta:

1. **¿Qué tipo de panel usarías en Grafana?**  
   - Time series  
   - Gauge  
   - Stat  
   - Bar chart  

2. **¿Qué consulta PromQL vas a utilizar?**
   Experimenta con el constructor de consultas en grafana, y menciona cual es la consulta resultante
   para el comportamiento que quieres visualizar.  
   

3. **¿Qué información esperas ver en ese panel?**
Provee una interpretación en palabras con el propósito de la visualización

4. **¿Qué conclusiones se podrían obtener a partir de esta visualización?**

---

## 5. Agrega el panel a tu dashboard

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


## 6. Entregable final

Para esta etapa deberás entregar:

### Una propuesta de métrica personalizada  
- Qué mide  
- Por qué es útil  
- Dónde tendría sentido instrumentarla  
- Qué tipo de métrica sería
- Implementación de la métrica
- Inluye una imagen con la vista del endpoint `/actuator/prometheus` mostrando la métrica nueva

### Un panel en Grafana que represente esa métrica  
- Incluye una imagen con el panel en Grafana mostrando la métrica visualizada

### Una explicación corta de tu diseño  
- Qué mostraría la visualización  
- Qué ayudaría a detectar  
- Por qué ese tipo de gráfico es el adecuado

---

Esta etapa te permite practicar la **definición de métricas de dominio**, parte fundamental en el diseño de sistemas observables y en la ingeniería de software moderna.

