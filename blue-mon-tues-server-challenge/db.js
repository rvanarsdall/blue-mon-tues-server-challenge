const Sequelize = require('./node_modules/sequelize');

const sequelize = new Sequelize('blue-server-challenges', 'postgres', 'I_love_my_mom_too', {
  host: 'localhost',
  dialect: 'postgres',
})

sequelize.authenticate()
  .then(
    function(){
      console.log('Connected to blue-server-challenges postgres database!')
    }, 
    function(err){
      console.log(err);
    }
  )

  module.exports = sequelize;