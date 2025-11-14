# Etapa 2 – Configuración y Exploración de Métricas

## Objetivo
Analizar las métricas expuestas por la aplicación Java y verificar su recolección en Prometheus.

## Instrucciones

## 1. Generar actividad en la aplicación
Antes de observar las métricas, debes generar tráfico hacia la aplicación para producir datos y logs iniciales.

1. Abre tu navegador y accede al endpoint principal de la aplicación: `http://{Public-DNS}/`

2. Realiza varias solicitudes a diferentes rutas de la API.  Los endpoints disponibles son :

    1. **`GET /api/`**  
    - **Descripción:** Devuelve el estado general del servicio.  
    - **Ejemplo:**  
        ```
        curl http://{Public-DNS}/api/
        ```

    2. **`POST /api/shorten`**  
    - **Descripción:** Crea una URL acortada a partir de un JSON con la URL original.  
    - **Entrada esperada:**
        ```json
        {
        "url": "https://example.com",
        "customCode": "opcional"
        }
        ```
    - **Ejemplo:**  
        ```
        curl -X POST http://{Public-DNS}/api/shorten \
        -H "Content-Type: application/json" \
        -d '{"url": "https://google.com"}'
        ```

    3. **`GET /api/{shortCode}`**  
    - **Descripción:** Redirige a la URL original asociada a un código corto.   
    - **Ejemplo:**  
        ```
        curl -I http://{Public-DNS}/api/abc123
        ```

    4. **`GET /api/urls`**  
   - **Descripción:** Retorna todas las URLs almacenadas en memoria.  
   - **Ejemplo:**  
     ```
     curl http://{Public-DNS}/api/urls
     ```

---

3. Espera unos segundos para que las métricas se actualicen en el endpoint de Prometheus

## 2. Explorar las métricas expuestas por la aplicación

El microservicio Java expone sus métricas en formato Prometheus a través del endpoint `/actuator/prometheus`. Estas métricas reflejan distintos aspectos del comportamiento de la aplicación, tales como rendimiento, latencia y errores.

1. Abre el endpoint de métricas en tu navegador `http://{Public-DNS}/actuator/prometheus`. Deberías encontrar algo como lo que se muestra en la siguiente imagen :
![alt text](./resources/metricas-iniciales/metricpath.png)


2. Examina el contenido del endpoint y busca métricas relacionadas con:
- Número de solicitudes HTTP 
- Latencia o duración de las solicitudes 
- Códigos de estado HTTP 
- Uso de memoria o CPU

3.  En tu bitácora de laboratorio:

    - Selecciona tres métricas relevantes y describe qué información aportan sobre el sistema.
        -  Menciona que tipo de métrica son (gauge, counter, histograma)
        - Con que otras métricas podría estar relacionada? Por ejemplo, un aumento en peticiones podría influir en el uso de CPU
        - Cómo nos ayuda esta métrica a identificar problemas de rendimiento o disponibilidad?

    - ¿Qué unidades o etiquetas se utilizan para agrupar los datos?

    - ¿Cuáles métricas crees que serían más útiles para diagnosticar el rendimiento del sistema?


