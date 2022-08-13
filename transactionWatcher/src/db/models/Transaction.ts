import { DataTypes, Sequelize } from "sequelize";

export const transactionModel = (client: Sequelize) => {
    client.define("transaction", {
        blockHash: {
            allowNull: true,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        blockNumber: {
            allowNull: true,
            autoIncrement: false,
            type: DataTypes.NUMBER,
        },
        from: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        gas: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.NUMBER,
        },
        gasPrice: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        hash: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        input: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.STRING,
        },

        nonce: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.NUMBER,
        },

        transactionIndex: {
            allowNull: true,
            autoIncrement: false,
            type: DataTypes.NUMBER,
        },

        to: {
            allowNull: true,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        value: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        configurationId: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
    });
};
