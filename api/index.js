const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  fetchAndSaveTemperaments,
} = require("./src/services/fetchAndSaveTemperamentsService.js");

async function main() {
  try {
    // Sincronizar los modelos en la base de datos
    await conn.sync({ force: true });

    // Obtener y guardar los temperamentos
    await fetchAndSaveTemperaments();

    // Iniciar el servidor
    server.listen(3001, () => {
      console.log(">>>> Listening at 3001");
    });
  } catch (error) {
    console.error("An error occurred in the main function:", error);
  }
}

main();
