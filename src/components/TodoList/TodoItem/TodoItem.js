import React from "react";
import { connect } from "react-redux";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";

import * as actions from "../../../store/actions/index";

const TodoItem = props => {
  return (
    <tr className={props.isCompleted ? "table-secondary" : ""}>
      <td>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" checked={props.isCompleted} /> &#8203;
          </Label>
        </FormGroup>
      </td>
      <td
        style={{ textDecoration: props.isCompleted ? "line-through" : "none" }}
      >
        {props.title}
      </td>
      <td>
        <Button
          close
          onClick={event => {
            event.preventDefault();
            props.onRemoveTodo(props.id);
          }}
        />
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
