// models
class Zen extends Model {}
Zen.modelName = "Book";

// createing orm
const orm = new ORM();
orm.register(Zen);

// telling redux we're using orm
const rootReducer = combineReducers({
  orm: createReducer(orm),
});
const store = createStore(rootReducer);

// To actually create some model instances, we need to start a Session and access the models below it.
const session = orm.session();
console.log(moment());
// console.log(session);
// insert
// tags and description to convert to id's
// session.Zen.create({
//   id: 1,
//   hour: "10AM CONVERT TO DATE FORM",
//   // entryTime: moment(),
//   tags: ["cookin", "cleanin"],
//   description: "desc text",
//   catogory: "unproductive",
// });
// session.Zen.create({
//   id: 2,
//   hour: "11AM CONVERT TO DATE FORM",
//   entryTime: moment(),
//   tags: ["code", "read"],
//   description: "desc text",
//   catogory: "wellspent",
// });
// session.Zen.create({
//   id: 3,
//   hour: "12AM CONVERT TO DATE FORM",
//   entryTime: moment(),
//   tags: ["sleep", "nap"],
//   description: "desc text",
//   catogory: "recreation",
// });
