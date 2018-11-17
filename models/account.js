
var uuidv1  = require('uuid/v1');

var bcrypt  = require('bcrypt');


module.exports = function(sequelize, DataTypes) {
    var Accounts = sequelize.define("Accounts", {
        
        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            isUnique :true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        account_key: {
            type: DataTypes.STRING,
            validate: {
                len:[8]
            }
        }

    });
      // generating hash
      Accounts.generateHash = function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      };

      // checking password
      Accounts.prototype.validPassword = function(password) {
          return bcrypt.compareSync(password, this.account_key);
      };

    return Accounts;
}