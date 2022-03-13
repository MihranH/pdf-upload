module.exports = function(sequelize, DataTypes) {
    const UserUpload = sequelize.define('userUploads', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'userId'
        },
        fileName: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'fileName'
        }
      }, {
        tableName: 'user_uploads'
      });      
      
    return UserUpload;

};