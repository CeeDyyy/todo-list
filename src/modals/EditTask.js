import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function EditTask({ modal, toggle, updateTask, taskObj }) {
    const [taskId, setTaskId] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskCheck, setTaskCheck] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "taskTitle") {
            setTaskTitle(value)
        } if (name === "taskDescription") {
            setTaskDescription(value)
        } if (name === "taskDate") {
            setTaskDate(value)
        }
    }

    useEffect(() => {
        setTaskId(taskObj.Id)
        setTaskTitle(taskObj.Title)
        setTaskDescription(taskObj.Description)
        setTaskDate(taskObj.Date)
        setTaskCheck(taskObj.Check)
    }, [])

    const handleEdit = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['Id'] = taskId
        tempObj['Title'] = taskTitle
        tempObj['Description'] = taskDescription
        tempObj['Date'] = taskDate
        tempObj['Check'] = taskCheck
        updateTask(tempObj)
    }
    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            fullscreen="md"
            centered
        >
            <ModalHeader toggle={toggle}>
                Edit Task
            </ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="taskTitle"
                            placeholder="Title"
                            value={taskTitle}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            name="taskDescription"
                            rows="5"
                            placeholder="Write something..."
                            value={taskDescription}
                            onChange={handleChange}
                            className="form-control"
                        >
                        </textarea>
                    </div>
                    <div className="form-group mb-3 mb-3">
                        <input
                            type="date"
                            name="taskDate"
                            value={taskDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={handleEdit}
                >
                    Update
                </Button>
                {' '}
                <Button onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditTask
