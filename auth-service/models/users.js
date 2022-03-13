module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'name'
        },
        surname: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'surname'
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'email'
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'password'
        }
      }, {
        tableName: 'users'
      });      
      
    return User;

};