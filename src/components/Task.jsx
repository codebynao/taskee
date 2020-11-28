import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";
import EditableText from "./EditableText";

const Task = ({ data, taskIndex, onChange, remove }) => {
  const ref = useRef(null);
  const inputElement = useRef(null);

  const [task, setTask] = useState({
    title: "",
    isCompleted: false
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    document.addEventListener("click", clickListener, true);
    return () => {
      document.removeEventListener("click", clickListener, true);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setTask(data);
    }
  }, [data]);

  useEffect(() => {
    if (inputElement.current && isEditingTitle) {
      inputElement.current.focus();
    }
  }, [inputElement, isEditingTitle]);

  const toggleEditingTitle = () => {
    if (!isEditingTitle) {
      setIsEditingTitle(true);
    }
  };

  const onCheckboxChange = event => {
    const updatedTask = { ...task, isCompleted: event.target.checked };
    setTask(updatedTask);
    onChange(updatedTask, taskIndex);
  };

  const onTitleChange = event => {
    event.target.value = event.target.value.replace("\n", "");
    const updatedTask = { ...task, title: event.target.value };
    setTask(updatedTask);
    onChange(updatedTask, taskIndex);
  };

  const clickListener = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsEditingTitle(false);
    }
  };

  const removeTask = () => {
    remove(taskIndex);
  };

  return (
    <Container>
      <div>
        <button onClick={removeTask}>x</button>
      </div>
      <div>
        <div className="card">
          <label>
            <input
              type="checkbox"
              name={task.title}
              checked={task.isCompleted}
              onChange={onCheckboxChange}
            />
          </label>
          <div ref={ref} onClick={toggleEditingTitle}>
            <EditableText
              ref={inputElement}
              value={task.title}
              onChange={onTitleChange}
              disabled={!isEditingTitle}
              cols="40"
              maxLength="140"
            />
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => setIsModalVisible(true)}>. . .</button>
      </div>
      <TaskModal
        data={task}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onChange={updatedTask => onChange(updatedTask, taskIndex)}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-around;
  div {
    display: inline-block;
    flex-grow: 1;
    align-self: center;
    text-align: center;
  }
  .card {
    align-self: center;
    flex-grow: 3;
    padding: 15px;
    margin: 10px;
    background: white;
    border-radius: 8px;
    display: flex;
    label {
      align-self: center;
    }
    textarea {
      align-self: center;
    }
  }
`;
export default Task;
