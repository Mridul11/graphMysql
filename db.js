import Sequelize from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'

const Conn = new Sequelize('api_node', 'root', 'root', {
    host : '127.0.0.1',
    dialect:'mysql',
    port : '8889',
    freezeTableName: true,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

const Person = Conn.define('person', {
    firstName :{
        type: Sequelize.STRING,
        allowNull:true
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull : true
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail : true
        }
    }
});


const Post = Conn.define('post',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    content : {
        type : Sequelize.STRING,
        allowNull:false
    }
});

//relationShip between oneTomany
Person.hasMany(Post);
Post.belongsTo(Person);


//sync the connections
Conn.sync({ force:true }).then(() => {

    _.times(10, ()=> {
        return Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email : Faker.internet.email()
        }).then(person => {
            return person.createPost({
                title : `Sample title by ${Faker.name.firstName()}`,
                content:`This is sample article`
            })
        })
    })
});

export default Conn;
