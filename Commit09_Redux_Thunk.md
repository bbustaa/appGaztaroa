# Commit 09: Redux y Thunk — AppGaztaroa

## 1. Introducción

En este commit se ha integrado **Redux** como arquitectura de gestión de estado centralizado, junto con el middleware **Redux-Thunk** (incluido en `@reduxjs/toolkit`) para gestionar las llamadas asíncronas a la API REST del servidor JSON.

Antes de esta refactorización, cada componente mantenía su propio estado local cargando los datos directamente desde ficheros JavaScript locales (`comun/excursiones.js`, etc.). Ahora, existe una única fuente de verdad: el **Store de Redux**.

---

## 2. Principios de Redux aplicados

| Principio | Aplicación en AppGaztaroa |
|---|---|
| **Una sola fuente de verdad** | El Store centraliza excursiones, cabeceras, actividades y comentarios |
| **Estado de solo lectura** | Los componentes nunca modifican el estado directamente |
| **Cambios con funciones puras** | Los reducers reciben `(state, action)` y devuelven un nuevo estado sin mutar el anterior |

---

## 3. Estructura de ficheros Redux

```
redux/
  ActionTypes.js      → Constantes de tipos de acción
  ActionCreators.js   → Funciones Thunk (fetch asíncrono) + action creators
  excursiones.js      → Reducer de excursiones
  cabeceras.js        → Reducer de cabeceras
  actividades.js      → Reducer de actividades
  comentarios.js      → Reducer de comentarios
  configureStore.js   → Combina los 4 reducers y crea el Store
```

### 3.1 ActionTypes

Define las constantes de los tipos de acción para los 4 recursos. Cada recurso tiene 3 tipos:

```
EXCURSIONES_LOADING  /  ADD_EXCURSIONES  /  EXCURSIONES_FAILED
COMENTARIOS_LOADING  /  ADD_COMENTARIOS  /  COMENTARIOS_FAILED
CABECERAS_LOADING    /  ADD_CABECERAS    /  CABECERAS_FAILED
ACTIVIDADES_LOADING  /  ADD_ACTIVIDADES  /  ACTIVIDADES_FAILED
```

### 3.2 Reducers

Cada reducer gestiona el estado de un recurso. El estado inicial de cada uno tiene la misma forma:

```js
{ isLoading: true, errMess: null, <recurso>: [] }
```

Responden a 3 casos:
- **LOADING** → marca que la carga está en progreso
- **ADD** → almacena los datos recibidos del servidor
- **FAILED** → almacena el mensaje de error

### 3.3 ActionCreators (Thunk)

Cada recurso tiene una función `fetch<Recurso>()` que:
1. Despacha `<recurso>Loading()` para indicar inicio de carga
2. Realiza un `fetch()` a la URL del servidor JSON
3. Si la respuesta es correcta → despacha `add<Recurso>(datos)`
4. Si hay error → despacha `<recurso>Failed(mensaje)`

### 3.4 ConfigureStore

Combina los 4 reducers en un único Store usando `configureStore` de `@reduxjs/toolkit`, que incluye automáticamente el middleware Thunk:

```js
reducer: {
  excursiones, comentarios, cabeceras, actividades
}
```

---

## 4. Integración con los componentes

### App.js
Envuelve toda la aplicación con `<Provider store={store}>`, haciendo el Store accesible para todos los componentes.

### CampobaseComponent
- Usa `mapDispatchToProps` para inyectar las 4 funciones fetch como props
- En `componentDidMount()` lanza los 4 fetches al iniciar la app
- Ya no mantiene estado local ni pasa datos a sus hijos

### Componentes conectados al Store

| Componente | Datos del Store | Función |
|---|---|---|
| `HomeComponent` | excursiones, cabeceras, actividades | Muestra los 3 elementos destacados |
| `CalendarioComponent` | excursiones | Lista de excursiones con navegación al detalle |
| `DetalleExcursionComponent` | excursiones, comentarios | Detalle de excursión + comentarios. Mantiene `favoritos[]` en estado local |
| `QuienesSomosComponent` | actividades | Lista de actividades del club |

---

## 5. Diagrama de flujo Redux — AppGaztaroa

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                          App.js                                 │
 │                    <Provider store>                             │
 └──────────────────────────┬──────────────────────────────────────┘
                            │
                 ┌──────────▼──────────┐
                 │   CampobaseComponent │
                 │  componentDidMount() │
                 │  ─────────────────  │
                 │  fetchExcursiones() │
                 │  fetchComentarios() │
                 │  fetchCabeceras()   │
                 │  fetchActividades() │
                 └──────────┬──────────┘
                            │ dispatch
                            ▼
 ┌─────────────────────────────────────────────────────────────────┐
 │                     ActionCreators.js                           │
 │                  (Thunk middleware)                             │
 │                                                                 │
 │  fetchExcursiones() ──► dispatch(excursionesLoading())          │
 │                     ──► fetch(baseUrl + 'excursiones')          │
 │                     ──► dispatch(addExcursiones(datos))         │
 │                     ──► dispatch(excursionesFailed(err))        │
 │                                                                 │
 │  [Mismo patrón para comentarios, cabeceras y actividades]       │
 └──────────────────────────┬──────────────────────────────────────┘
                            │ dispatch(action)
                            ▼
 ┌─────────────────────────────────────────────────────────────────┐
 │                      Redux Store                                │
 │  ┌─────────────────────────────────────────────────────────┐   │
 │  │                     Reducers                            │   │
 │  │  excursiones  │  comentarios  │  cabeceras  │ actividades│   │
 │  │  {isLoading,  │  {isLoading,  │  {isLoading,│ {isLoading,│   │
 │  │   errMess,    │   errMess,    │   errMess,  │  errMess,  │   │
 │  │   excursiones}│   comentarios}│   cabeceras}│  actividades}  │
 │  └─────────────────────────────────────────────────────────┘   │
 └──────────────────────────┬──────────────────────────────────────┘
                            │ mapStateToProps
          ┌─────────────────┼──────────────────┐
          ▼                 ▼                  ▼
 ┌────────────────┐ ┌───────────────┐ ┌──────────────────────┐
 │ HomeComponent  │ │  Calendario   │ │  DetalleExcursion    │
 │                │ │  Component    │ │  Component           │
 │ excursiones ✓  │ │               │ │                      │
 │ cabeceras   ✓  │ │ excursiones ✓ │ │ excursiones       ✓  │
 │ actividades ✓  │ │               │ │ comentarios       ✓  │
 └────────────────┘ └───────────────┘ │ favoritos (local) ✓  │
                                      └──────────────────────┘
          ▼
 ┌────────────────────┐
 │ QuienesSomos       │
 │ Component          │
 │                    │
 │ actividades ✓      │
 └────────────────────┘
```

---

## 6. Flujo de trabajo completo (secuencia)

```
Usuario abre la app
        │
        ▼
  App.js crea el Store (ConfigureStore)
  y envuelve la app con <Provider>
        │
        ▼
  CampobaseComponent se monta
  → componentDidMount() llama a los 4 fetch
        │
        ▼
  ActionCreators despachan LOADING
  → Store actualiza isLoading: true en los 4 reducers
        │
        ▼
  fetch() llama al servidor JSON (baseUrl:3001)
        │
    ┌───┴───┐
    │ OK    │ ERROR
    ▼       ▼
  ADD_*   FAILED_*
  action  action
    │       │
    └───┬───┘
        ▼
  Reducer actualiza el Store
  (isLoading: false, datos: [...])
        │
        ▼
  Componentes conectados re-renderizan
  con los nuevos datos del Store
        │
        ▼
  Usuario ve la aplicación con datos del servidor
```

---

## 7. Cambios respecto al commit anterior

| Elemento | Antes (Commit 08) | Después (Commit 09) |
|---|---|---|
| Origen de los datos | Ficheros `.js` locales en `comun/` | Store Redux (fetch desde servidor JSON) |
| Estado de los componentes | Cada componente tenía su propio `state` | Estado centralizado en el Store |
| Comunicación padre→hijo | `CampobaseComponent` pasaba `excursiones` como prop | Cada componente accede al Store directamente |
| Llamadas asíncronas | No había | Thunk en `ActionCreators.js` |
| `App.js` | Solo `<SafeAreaProvider>` | `<Provider store>` envuelve todo |
| Ficheros `comun/` | 5 ficheros (4 datos + comun.js) | Solo `comun.js` (baseUrl y colores) |
