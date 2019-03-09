import { getConnectionOptions, createConnection } from "typeorm";
import { User } from "../entity/User";
import { BoxScore } from "../entity/BoxScore";
import { Tournament } from "../entity/Tournament";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL as string,
        entities: [User, BoxScore, Tournament],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
