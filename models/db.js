var users = [];
const MAX = 200;
const faker = require('faker');


for(i = 0; i < MAX; i++){
	users[i] ={
		name : faker.name.findName(),
		email : faker.internet.email()
	};
};


module.exports = users;