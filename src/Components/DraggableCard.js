import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

const Btn = styled.button`
  border: none;
  cursor: pointer;
`;

function DraggableCard({ toDoId, toDoText, index }) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = (event) => {
    const targetCategory =
      event.target.parentNode.parentNode.parentNode.firstChild.innerText;
    setToDos((prev) => {
      const newArray = [...prev[targetCategory]];
      const targetIndex = newArray.findIndex((todo) => todo.id === toDoId);
      newArray.splice(targetIndex, 1);
      return {
        ...prev,
        [targetCategory]: newArray,
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <Btn onClick={onClick}>💨</Btn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
