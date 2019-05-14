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
						notEmpty: true,
						isEmail: true
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
					type: Sequelize.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: true
					}
				},
				admin: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					validate: {
						notEmpty: true
					}
				},
				lifePoints: {
					type: Sequelize.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: true
					}
				},
				attackPoints: {
					type: Sequelize.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: true
					}
				}
            },
            {
                tableName: "user",
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