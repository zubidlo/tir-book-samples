import React from 'react';
import {connect} from 'react-redux';

import {fetchBooks} from '../actions/books';

const Dispatchers = ({dispatch}) => (
  <div className="dispatchers">
    <button
      className="dispatch-button"
      onClick={() => dispatch(fetchBooks())}
    >
      <i className="fa fa-rocket" />
      fetchBooks
    </button>
    {/* <button className="dispatch-button"><i className="fa fa-undo" /></button> */}
  </div>
);

export default connect()(Dispatchers);
