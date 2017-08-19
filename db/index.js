var Sequelize = require('sequelize');
//create 'wolfpack' database
var db = new Sequelize('wolfpack', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
  logging: false,
	define: {
        timestamps: false
    }
});


//test connection
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


//define schema
var User = db.define('User', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {underscored: true});

var Listing = db.define('Listing', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
	description: Sequelize.STRING,
	image_url: Sequelize.STRING,
  initializer: { type: Sequelize.INTEGER, defaultValue: 1},
  price: Sequelize.DECIMAL(5, 2),
  completed: { type: Sequelize.BOOLEAN, defaultValue: false},
  arrived: { type: Sequelize.BOOLEAN, defaultValue: false},
  packed: { type: Sequelize.BOOLEAN, defaultValue: false},
  location: Sequelize.STRING,
  num_of_participants:{ type: Sequelize.INTEGER, defaultValue: 4},
  created_dt: Sequelize.DATE
}, {underscored: true});

var UserListings = db.define('UserListings', {
  received: { type: Sequelize.BOOLEAN, defaultValue: false}
});

User.belongsToMany(Listing, { through: UserListings});
Listing.belongsToMany(User, { through: UserListings});
//create Users and listings table


User.sync()
// .then(() => User.create({username: 'dylan', password: '123d'}))
// .then(() => User.create({username: 'clarence', password: '123c'}))
// .then(() => User.create({username: 'kevin', password: '123k'}))
// .then(() => User.create({username: 'jason', password: '123j'}))
// .then(() => User.create({username: 'fred', password: '1234'}))
// .then(() => User.create({username: 'tyler', password: '123t'}))
.then(() => {
  return Listing.sync();
})
.then(() => {
  return UserListings.sync();
});
// .then(() => Listing.create({
//   name: '69 pack of shampoo',
//   initializer: 1,
//   price: 5.00,
//   complete: true,
//   location: '944 Market St, San Francisco, CA 94121',
//   num_of_participants: 3
// }))
// .then(() => Listing.create({
//   name: '30 pack of paper towels',
//   initializer: 1,
//   price: 7.50,
//   complete: false,
//   location: '944 Market St, San Francisco, CA 94121',
//   num_of_participants: 2,
//   created_dt:'2017-08-11 20:11:30'
// }))
// .then(() => Listing.create({
//   name: '100 pack of protein bars',
//   initializer: 2,
//   price: 20.00,
//   complete: false,
//   location: '1015 Folsom St, San Francisco, CA 94103',
//   num_of_participants: 4
// }))
// .then(() => Listing.create({
//   name: '40 lbs of Weed',
//   initializer: 3,
//   price: 200.00,
//   complete: false,
//   location: '1552 11th Ave, San Francisco, CA 94103',
//   num_of_participants: 3
// }))



exports.User = User;
exports.Listing = Listing;
exports.UserListings = UserListings;
