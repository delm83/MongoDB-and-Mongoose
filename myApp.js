require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

let Schema = mongoose.Schema;

let personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);;

const createAndSavePerson = function(done) {
  var mikeJones = new Person({name: "Mike Jones", age: 39, favoriteFoods: ["cheese", "proscutto", "pizza"]});

  mikeJones.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  {name: "Bob Roberts", age: 34, favoriteFoods: ["potatoes", "wine"]},
  {name: "Andy Capp", age: 12, favoriteFoods: ["turkey", "cranberry sauce"]},
  {name: "Edward Smith", age: 53, favoriteFoods: ["beer", "whiskey"]},
  {name: "Finn Alan", age: 22, favoriteFoods: ["kipper", "chips"]}
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const newFood = 'hamburger';
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
    person.favoriteFoods.push(newFood);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = function(done) {
  const newFood = "burrito";
  Person.find({favoriteFoods:newFood}).sort({name : "asc"}).limit(2).select("-age").exec((err, data) => {
     if(err)
       done(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
