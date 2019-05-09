import Sequelize from "sequelize";
import User from "./user";
import Reach from "./reach";
import Spawn from "./spawn";
import Type from "./type";

// postgres://USER:PASS@HOST:PORT/DBNAME
export const db = new Sequelize("postgresql://root:efreitech@zombiemap.cjzbdtjvped0.us-west-2.rds.amazonaws.com/ZombieMap");

User.init(db);
Reach.init(db);
Spawn.init(db);
Type.init(db);

Spawn.belongsTo(Type);

Reach.belongsTo(User);
Reach.belongsTo(Spawn);
