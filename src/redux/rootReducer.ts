import app from './reducers/app.ts';
import user from './reducers/user.ts';
import menu from './reducers/menu.ts';

const rootReducer = {
  app,
  user,
  menu
};

export default rootReducer;
