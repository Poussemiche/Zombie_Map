import Sequelize, { Model } from "sequelize";

export default class User extends Model {
    static init(database) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
					autoIncrement: true
                },
                nickname: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true
					}
                },
                email: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true
					}
                },
                password: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true
					}
                },
                score: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true
					}
				}
            },
            {
                tableName: "",
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