const { sequelize } = require("../database");

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
        organizationName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organizationPhoneNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        organizationEmail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        organizationAddressLine1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
         organizationAddressLine2: {
            type: DataTypes.STRING,
        }, 
        organizationCity: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organizationStateOrCounty: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organizationZipCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        organizationCountry: {
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