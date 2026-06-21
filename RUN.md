# PARTE 2

## 🚀 Bloque 1: Operaciones CRUD desde la Aplicación

### Instrucciones de ejecucion

1. Cargar variables de entorno con usuario y contraseña indicados en el informe previo

- **Opcion A**: Crear archivo fisico `.env` con las variables declaradas

```bash
touch .env
```

- **Opcion B**: Definir Variables de Entorno Locales (Consola/Sistema)

(Linux/MacOS)
```bash
export MONGO_ATLAS_USERNAME="tu_usuario_de_atlas"
export MONGO_ATLAS_PASSWORD="tu_contraseña_de_atlas"
```

(Windows CMD)
```cmd
set MONGO_ATLAS_USERNAME=tu_usuario_de_atlas
set MONGO_ATLAS_PASSWORD=tu_contraseña_de_atlas
```

(Windows Powershell)
```powershell
$env:MONGO_ATLAS_USERNAME="tu_usuario_de_atlas"
$env:MONGO_ATLAS_PASSWORD="tu_contraseña_de_atlas"
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar script
```
node operaciones_crud.js
```