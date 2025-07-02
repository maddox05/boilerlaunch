import "dotenv/config";
import { db } from "./index.js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });

    console.log("Migration successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
