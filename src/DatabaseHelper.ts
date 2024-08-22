
import { createClient, type RedisClientType } from "redis";

export type ConnectionOptions = {
    url: string;
}

class DatabaseHelper {

    static db: RedisClientType;
    static isReady: boolean = false;

    public static async close() {
        await this.db.disconnect();
    }

    public static async connect(opts: ConnectionOptions): Promise<RedisClientType> {

        console.log("Attempting to connect to redis...");

        this.db = createClient(opts);

        this.db.on("error", (err) => console.error(`Redis Error: ${err}`));
        this.db.on("connect", () => console.info("Redis connected"));
        this.db.on("reconnecting", () => console.info("Redis reconnecting"));
        this.db.on("ready", () => {
            DatabaseHelper.isReady = true;
            console.info("Redis ready!");
        });

        return await this.db.connect();
    }
}

export async function createConnection(opts: ConnectionOptions) {
    return await DatabaseHelper.connect(opts);
}

export function getClient():RedisClientType {
    return DatabaseHelper.db;
}












