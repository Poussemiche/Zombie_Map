import Sequelize, { Model } from "sequelize";

export default class Type extends Model {
    static init(database) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
					autoIncrement: true
                },
                label: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true
					}
                }
            },
            {
                tableName: "type",
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