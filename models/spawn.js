import Sequelize, { Model } from "sequelize";

export default class Spawn extends Model {
    static init(database) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
					autoIncrement: true
                },
                key: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true
					}
                },
                title: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true
					}
                },
                description: {
					type: Sequelize.STRING,
					allowNull: true
                },
                latitude: {
					type: Sequelize.FLOAT,
					allowNull: false,
					validate: {
						notEmpty: true
					}
				},
				longitude: {
					type: Sequelize.FLOAT,
					allowNull: false,
					validate: {
						notEmpty: true
					}
				}
            },
            {
                tableName: "spawn",
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