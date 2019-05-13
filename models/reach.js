import Sequelize, { Model } from "sequelize";

export default class Reach extends Model {
    static init(database) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
					autoIncrement: true
                }
            },
            {
                tableName: "reach",
				sequelize: database,
				
				indexes: [
					{
						unique: true,
						fields: ["id"]
					}
				]
            }
        )
    }
}