'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Comment.init({
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type:DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model:'Users',
          key: 'userId',
      },
      onDelete:'cascade',
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Posts',
        key: 'postId',
    },
    onDelete:'cascade',
  },
      nickname: {
        type: DataTypes.STRING
      },
      comment: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};