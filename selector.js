import { createSelector } from 'redux-orm';
import orm from './orm';

const authorSelector = createSelector(orm, (session) => {
  return session.Author.all()
    .toModelArray()
    .map((author) => {
      /**
       * author is a model instance and exposes relationship accessors
       * such as author.books …
       *
       * This gets a reference to the model's underlying object
       * which has no such accessors, containing only raw attributes.
       */
      const { ref } = author;
      // Object.keys(ref) === ['id', 'name']

      return {
        ...ref,
        books: author.books.toRefArray().map((book) => book.name),
      };
    });
});

// Will result in something like this when run:
// [
//   {
//     id: 0,
//     name: 'Tommi Kaikkonen',
//     books: ['Introduction to Redux-ORM', 'Developing Redux applications'],
//   },
//   {
//     id: 1,
//     name: 'John Doe',
//     books: ['John Doe: an Autobiography']
//   }
// ]
