import { Model, fk, many, attr } from "redux-orm";

class Book extends Model {
  static reducer(action, Book, session) {
    switch (action.type) {
      case "CREATE_BOOK":
        Book.create(action.payload);
        break;
      case "UPDATE_BOOK":
        Book.withId(action.payload.id).update(action.payload);
        break;
      case "REMOVE_BOOK":
        const book = Book.withId(action.payload);
        book.delete();
        break;
      case "ADD_AUTHOR_TO_BOOK":
        Book.withId(action.payload.bookId).authors.add(action.payload.author);
        break;
      case "REMOVE_AUTHOR_FROM_BOOK":
        Book.withId(action.payload.bookId).authors.remove(
          action.payload.authorId
        );
        break;
      case "ASSIGN_PUBLISHER":
        Book.withId(action.payload.bookId).publisherId =
          action.payload.publisherId;
        break;
    }
    // Return value is ignored.
    return undefined;
  }
  toString() {
    return `Book: ${this.name}`;
  }
  // Declare any static or instance methods you need.
}
Book.modelName = "Book";

class Publisher extends Model {
  toString() {
    return `Publisher: ${this.name}`;
  }
}
Publisher.modelName = "Publisher";
class Author extends Model {
  toString() {
    return `Author: ${this.name}`;
  }
}
Author.modelName = "Author";

// Declare your related fields.
Book.fields = {
  id: attr(), // non-relational field for any value; optional but highly recommended
  name: attr(),

  // foreign key field
  publisherId: fk({
    to: "Publisher",
    as: "publisher",
    relatedName: "books",
  }),
  authors: many("Author", "books"),
};

export { Book, Publisher, Author };
