const { sequelize } = require("../database");
const { DataTypes } = require("sequelize");

const AccountRequest = sequelize.define(
    'AccountRequest',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        addressLine1: {
            type: DataTypes.STRING,
        },
         addressLine2: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        stateOrCounty: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organisationName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organisationPhoneNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        organisationEmail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        organisationAddressLine1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
         organisationAddressLine2: {
            type: DataTypes.STRING,
        }, 
        organisationCity: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organisationStateOrCounty: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organisationZipCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organisationCountry: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        additionalInformation: {
            type: DataTypes.TEXT,
        },
        termsAndConditions: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
);
(async () => {
    await AccountRequest.sync();
})();

module.exports = { AccountRequest };
