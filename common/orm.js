import { ORM } from "redux-orm";
import { Book, Author, Publisher } from "./model";
const orm = new ORM({
  stateSelector: (state) => state.orm,
});
orm.register(Book, Author, Publisher);

export default orm;
