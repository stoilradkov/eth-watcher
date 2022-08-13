import { DataTypes, Sequelize } from "sequelize";

export const transactionModel = async (client: Sequelize) => {
    const transaction = client.define("transaction", {
        blockHash: {
            allowNull: true,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        blockNumber: {
            allowNull: true,
            autoIncrement: false,
            type: DataTypes.BIGINT,
        },
        from: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.STRING,
        },
        gas: {
            allowNull: false,
            autoIncrement: false,
            type: DataTypes.BIGINT,
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
            type: DataTypes.BIGINT,
        },

        transactionIndex: {
            allowNull: true,
            autoIncrement: false,
            type: DataTypes.BIGINT,
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
    await transaction.sync();
};
