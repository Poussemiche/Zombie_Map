import Sequelize from "sequelize";
import User from "./user";

// postgres://USER:PASS@HOST:PORT/DBNAME
export const db = new Sequelize("postgresql://root:efreitech@zombiemap.cjzbdtjvped0.us-west-2.rds.amazonaws.com/ZombieMap");

User.init(db);