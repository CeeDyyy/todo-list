import React, { useState } from 'react'
import EditTask from '../modals/EditTask';
import { Col, Card, CardTitle, CardText } from 'reactstrap';

function Task({ taskObj, deleteTask, updateListArray }) {
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const updateTask = (obj) => {
        updateListArray(obj)
        setModal(false)
    }

    const handleDelete = () => {
        deleteTask(taskObj.Id)
    }

    function handleCheck() {
        let tempObj = {}
        tempObj['Id'] = taskObj.Id
        tempObj['Title'] = taskObj.Title
        tempObj['Description'] = taskObj.Description
        tempObj['Date'] = taskObj.Date
        tempObj['Check'] = !taskObj.Check
        updateTask(tempObj)
    }

    return (
        <>
            <Col sm="3">
                <Card body inverse style={{
                    backgroundColor: '#474747',
                    borderColor: '#363636',
                    marginBottom: '1rem'
                }}>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={handleCheck} defaultChecked={taskObj.Check}/>
                    </div>
                    <CardTitle tag="h5">
                        {taskObj.Title} {taskObj.Date}
                    </CardTitle>
                    <CardText style={{
                        color: '#A8A7A7'
                    }}>
                        {taskObj.Description}
                    </CardText>
                    <div className="card-btn">
                        <i className="bi bi-pencil-square me-3" style={{ "cursor": "pointer" }} onClick={toggleModal}></i>
                        <i className="bi bi-trash" style={{ "cursor": "pointer" }} onClick={handleDelete}></i>
                    </div>
                </Card>
            </Col>

            <EditTask modal={modal} toggle={toggleModal} updateTask={updateTask} taskObj={taskObj} />
        </>
    )
}

export default Task
