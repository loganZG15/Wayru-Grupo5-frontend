# Wary-u (frontend)

Aplicación web de Wary-u hecha con Angular, para reportar y consultar incidentes de seguridad en cada zona. Es el frontend del proyecto de curso en equipo (Grupo 5) de la UPC y consume la API del [backend de Wary-u](https://github.com/loganZG15/Wayru-Grupo5).

## Funcionalidades

- Inicio de sesión con autenticación JWT
- Gestión de incidencias: listar, buscar, registrar, editar y ver mis incidencias
- Gestión de categorías de incidencia
- Gestión de distritos, con mapa de Google Maps al registrarlos
- Reportes con gráficos (Chart.js) de incidencias y de distritos
- Menú de navegación y manejo de errores de la API con un interceptor

## Tecnologías

| Parte | Tecnologías |
| --- | --- |
| Framework | Angular 21, TypeScript |
| Interfaz | Angular Material, HTML, CSS |
| Gráficos | Chart.js, ng2-charts |
| Mapas | Angular Google Maps |
| Autenticación | @auth0/angular-jwt |
| Pruebas | Vitest |

## Cómo ejecutarlo

### Requisitos

- Node.js y npm
- Angular CLI (`npm install -g @angular/cli`)
- Backend de Wary-u en ejecución o acceso a su versión desplegada

### Pasos

```bash
npm install
ng serve
```

Abre `http://localhost:4200/`.

### Configuración

- **URL de la API:** los servicios de `src/app/services` apuntan a la URL del backend. Cámbiala si usas el backend en local (por ejemplo `http://localhost:8080`).
- **Google Maps:** el mapa necesita una clave de API propia en `src/index.html`.

## Estructura del proyecto

```
src/app/
  components/   Pantallas: login, inicio, menú, incidencias, categorías, distritos, reportes
  services/     Comunicación con la API
  models/       Modelos de datos
```

## Autoría

Proyecto realizado por el Grupo 5 (UPC). Los aportes de cada persona se pueden ver en la pestaña Contributors y en el historial de commits.

- Leonel Venicius Jimenez Solis ([LinkedIn](https://www.linkedin.com/in/leonel-venicius-jimenez-solis-0198a42b0/)), con las cuentas `leonel` y `loganZG15`: desarrollo de la mayor parte del frontend (41 de los 43 commits).
- Otro integrante del grupo: contribuciones puntuales (ver Contributors).

## Estado del proyecto

Proyecto finalizado y funcional. Se desarrolló como trabajo del curso Arquitectura de aplicaciones web en la UPC y quedó concluido al terminar el ciclo.
