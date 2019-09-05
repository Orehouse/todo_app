import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

const TodoItem = props => {
  return (
    <tr>
      <td>{props.title}</td>
      <td
        onClick={() => {
          props.onRemoveTodo(props.id);
        }}
      >
        Delete
      </td>
    </tr>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveTodo: id => dispatch(actions.removeTodo(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
