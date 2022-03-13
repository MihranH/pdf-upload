module.exports = function(sequelize, DataTypes) {
    const Session = sequelize.define('sessions', {
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
            references: {
                model: 'users',
                key: 'id'
            },
            field: 'userId'
        },
        token: {
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'token'
        },
        expireAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            field: 'expireAt'
        },
      }, {
        tableName: 'sessions'
      });      
      
    return Session;

};