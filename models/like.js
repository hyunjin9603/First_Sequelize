// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Likes extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Likes.init({
//     likeId: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references:{
//         model:'Users',
//         key:'userId'
//       }
//     },
//     postId: {
//       type: DataTypes.INTEGER,
//         references: {
//           model:'Posts',
//           key: 'postId',
//       },
//     },
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE
//     }
//   });
//   return Likes;
// };