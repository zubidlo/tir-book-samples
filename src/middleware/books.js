import {BOOKS, FETCH_BOOKS, setBooks} from '../actions/books';
import {API_ERROR, API_SUCCESS, apiRequest} from '../actions/api';
import {setLoader} from '../actions/ui';
import {setNotification} from '../actions/notification';

const BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=redux';

export const booksMiddleware = () => (next) => (action) => {
  console.log('booksMiddleware', action);
  next(action);

  switch(action.type) {
    case FETCH_BOOKS:
      next([
        apiRequest({method: 'GET', url: BOOKS_URL, feature: BOOKS}),
        setLoader({state: true, feature: BOOKS}),
      ]);
      break;
    case `${BOOKS} ${API_SUCCESS}`:
      next([
        setBooks({books: action.payload.items, normalizeKey: 'id'}),
        setLoader({state: false, feature: BOOKS}),
      ]);
      break;
    case `${BOOKS} ${API_ERROR}`:
      next([
        setNotification({message: action.payload.message, feature: BOOKS}),
        setLoader({state: false, feature: BOOKS}),
      ]);
      break;
    default:
      break;
  }
};
