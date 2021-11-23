import React, { useState, useEffect } from 'react'
import CreateTask from '../modals/CreateTask'
import Task from './Task';
import { Row } from 'reactstrap';
import { format } from 'date-fns';

function TodoList() {
    const [taskList, setTaskList] = useState(() => {
        const savedTaskList = localStorage.getItem("taskList");
        if (savedTaskList) {
            return JSON.parse(savedTaskList);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList))
    }, [taskList])

    function deleteTask(id) {
        const removeItem = taskList.filter((task) => {
            return task.Id !== id
        })

        setTaskList(removeItem);
    }

    function updateListArray(obj) {
        const updatedItem = taskList.map((task) => {
          return task.Id === obj.Id ? obj : task;
        })

        setTaskList(updatedItem);
      }

    const createTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        setModal(false)
    }

    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)

    const d = new Date();
    const [displayDate, setDisplayDate] = useState(new Date())
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const day = weekDay[displayDate.getDay()]
    const month = months[displayDate.getMonth()]
    const date = displayDate.getDate()
    const year = displayDate.getFullYear()
    const dateFormat = format(displayDate, 'yyyy-MM-dd')

    function nextDay() {
        d.setDate(displayDate.getDate() + 1)
        setDisplayDate(d)
    }
    function prevDay() {
        d.setDate(displayDate.getDate() - 1)
        setDisplayDate(d)
    }

    const [isAll, setIsAll] = useState(false)
    const toggleAll = () => setIsAll(!isAll)

    return (
        <div className="todoList">
            <div className="header text-center">
                <h1 className="pt-5">{day}</h1>
                <h5 className="date mb-5">{month} {date}, {year}</h5>
                <button className="btn btn-primary mt-2 ms-2 me-2" onClick={() => prevDay()}>Prev Day</button>
                <button className="btn btn-primary mt-2 ms-2 me-2" onClick={toggleAll}>{isAll ? "Show Today's" : "Show All"}</button>
                <button className="btn btn-primary mt-2 ms-2 me-2" onClick={() => nextDay()}>Next Day</button>
                <button className="btn btn-primary btn-circle btn-md mt-2" onClick={toggleModal}><i className="bi bi-plus"></i></button>
            </div>
            <div className="container">
                <Row>
                    {taskList.map((obj, index) =>
                        isAll ?
                            <Task taskObj={obj} deleteTask={deleteTask} updateListArray={updateListArray} key={index} />
                            :
                            obj.Date === dateFormat &&
                            <Task taskObj={obj} deleteTask={deleteTask} updateListArray={updateListArray} key={index} />
                    )}
                </Row>
            </div>
            <CreateTask toggle={toggleModal} modal={modal} create={createTask} taskList={taskList} />
        </div >
    )
}

export default TodoList
