// import important parts of sequelize library
const { Model, DataTypes, INTEGER } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stock: {
      type: dayaTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes: INTEGER,
      model: 'category',
      allowNull: false,
      key: 'id',
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
