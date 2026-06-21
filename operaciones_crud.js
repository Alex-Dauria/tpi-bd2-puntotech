require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

// Cargar variables de entorno y URL de conexion al cluster de MongoDB Atlas
const username = encodeURIComponent(process.env.MONGO_ATLAS_USERNAME);
const password = encodeURIComponent(process.env.MONGO_ATLAS_PASSWORD);

const uri = `mongodb+srv://${username}:${password}@tpi-cluster.uebmoio.mongodb.net/ecommerce_tpi`;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("ecommerce_tpi");
    const productos = db.collection("productos");

    console.log("--- Conectado exitosamente a MongoDB Atlas ---");

    // 1. CREATE: Insertar un nuevo producto
    const nuevoProducto = {
      nombre: "Teclado Mecánico Keychron K2",
      descripcion: "Teclado mecánico inalámbrico 75% switches brown",
      precio: 120000,
      stock: 10,
      categoria: "Perifericos",
      activo: true
    };
    
    const resultadoInsert = await productos.insertOne(nuevoProducto);
    const idGenerado = resultadoInsert.insertedId;
    console.log(`\n[CREATE] Producto creado con ID: ${idGenerado}`);


    // 2. READ: Consultar productos activos
    console.log("\nCatálogo de productos activos:");
    const listadoActivos = await productos.find({ activo: true }).toArray();
    listadoActivos.forEach(p => {
      console.log(` - ${p.nombre} ($${p.precio}) - Stock: ${p.stock}`);
    });


    // 3. UPDATE: Modificar campos específicos
    const updateResult = await productos.updateOne(
      { _id: idGenerado },
      { $set: { precio: 125000, stock: 9 } }
    );
    console.log(`\nDocumentos modificados: ${updateResult.modifiedCount}`);


    // 4. DELETE: Baja Lógica
    const deleteLogicoResult = await productos.updateOne(
      { _id: idGenerado },
      { $set: { activo: false } } // Se pasa a false simulando su eliminación
    );
    console.log(`\nBaja logica aplicada al producto con ID: ${idGenerado}`);


    // Verificación final para demostrar que ya no aparece en las lecturas ordinarias
    const verifBaja = await productos.findOne({ _id: idGenerado, activo: true });
    console.log(`\n[VERIFICACIÓN] Producto visible en el catalogo activo: ${verifBaja !== null}`);

  } finally {
    // Cierre seguro de la conexión con Atlas
    await client.close();
    console.log("\nConexión cerrada");
  }
}

run().catch(console.dir);