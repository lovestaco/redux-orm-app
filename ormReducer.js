import { createReducer } from 'redux-orm';
import orm from './orm';

const reducer = createReducer(orm);

function createReducer(orm, updater = defaultUpdater) {
  return (state, action) => {
    const session = orm.session(state || orm.getEmptyState());
    updater(session, action);
    return session.state;
  };
}

function defaultUpdater(session, action) {
  session.sessionBoundModels.forEach((modelClass) => {
    if (typeof modelClass.reducer === 'function') {
      modelClass.reducer(action, modelClass, session);
    }
  });
}
