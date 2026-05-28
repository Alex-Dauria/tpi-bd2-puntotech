# Modelo de Datos NoSQL - TPI BD2

## Colecciones

### 1. `clientes`

Datos personales y de contacto de cada comprador
registrado en la plataforma.

**Esquema:**
```json
{
  "_id": ObjectId("..."),
  "nombre": "Laura Gomez",
  "email": "laura.gomez@email.com",
  "telefono": "1155443322",
  "direccion": {
    "calle": "Av. Corrientes 1234",
    "ciudad": "Buenos Aires",
    "provincia": "CABA"
  },
  "activo": true,
  "fecha_registro": ISODate("2024-01-15T00:00:00Z")
}
```

### 2. `productos`

Catálogo completo de artículos disponibles para la
venta, con precio, stock y categoría.

**Esquema:**
```json
{
  "_id": ObjectId("..."),
  "nombre": "Notebook Lenovo IdeaPad",
  "descripcion": "Notebook 15.6 pulgadas, 8GB RAM, 256GB SSD",
  "precio": 450000,
  "stock": 15,
  "categoria": "Computacion",
  "activo": true
}
```

### 3. `pedidos`

Órdenes de compra realizadas por los clientes, con
los productos incluidos y el estado del pedido

**Esquema:**
```json
{
  "_id": ObjectId("..."),
  "cliente_id": ObjectId("6a181851ff54edefa22d8fcb"),
  "cliente_nombre": "Laura Gomez",
  "fecha_pedido": ISODate("2024-03-15T10:30:00Z"),
  "estado": "entregado",
  "activo": true,
  "productos": [
    {
      "producto_id": ObjectId("6a181942ff54edefa22d8fdb"),
      "nombre": "Notebook Lenovo IdeaPad",
      "precio_unitario": 450000,
      "cantidad": 1
    },
    {
      "producto_id": ObjectId("6a181942ff54edefa22d8fdc"),
      "nombre": "Mouse Logitech MX Master",
      "precio_unitario": 35000,
      "cantidad": 1
    }
  ],
  "total": 485000
}
```
