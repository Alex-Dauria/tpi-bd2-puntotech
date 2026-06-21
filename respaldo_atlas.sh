#!/bin/bash

# ==============================================================================
# SCRIPT DE AUTOMATIZACIÓN DE BACKUP FÍSICO - MONGODUMP (ATLAS)
# ==============================================================================
# Este script realiza un backup de la base de datos 'ecommerce_tpi' utilizando
# rutas relativas y guardando el resultado en carpetas organizadas por fecha.

# Cargar variables de entorno locales
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
fi

# Verificar que las variables de entorno necesarias estén definidas
if [ -z "$MONGO_ATLAS_USERNAME" ] || [ -z "$MONGO_ATLAS_PASSWORD" ]; then
    echo "[ERROR] - Las variables MONGO_ATLAS_USERNAME o MONGO_ATLAS_PASSWORD no están definidas."
    exit 1
fi

# 1. Definición de rutas relativas y variables de tiempo
DIRECTORIO_RAIZ="./resguardos_tpi"
FECHA_ACTUAL=$(date +%Y-%m-%d)
RUTA_DESTINO="${DIRECTORIO_RAIZ}/${FECHA_ACTUAL}"

echo "Iniciando proceso de automatizacion de backup..."
echo "Fecha: ${FECHA_ACTUAL}"

# 2. Estructura de carpetas de forma recursiva
if [ ! -d "${RUTA_DESTINO}" ]; then
    echo "Creando directorio: ${RUTA_DESTINO}"
    mkdir -p "${RUTA_DESTINO}"
else
    echo "[INFO] - El directorio ya existe: ${RUTA_DESTINO}"
fi

# Parámetros del cluster
CLUSTER_HOST="tpi-cluster.uebmoio.mongodb.net"
DB_NAME="ecommerce_tpi"

echo "Conectando al cluster de Atlas: ${CLUSTER_HOST}..."

# 3. Uso de mongodump
mongodump --uri "mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASSWORD}@${CLUSTER_HOST}/${DB_NAME}" --out "${RUTA_DESTINO}"

# 4. Verificacion
if [ $? -eq 0 ]; then
    echo "Backup completado con éxito!"
else
    echo "[ERROR] - Fallo inesperado durante la ejecucion de mongodump."
    exit 1
fi