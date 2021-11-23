import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function CreateTask({ modal, toggle, create, taskList }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "taskTitle") {
            setTaskTitle(value)
        } if (name === "taskDescription") {
            setTaskDescription(value)
        } else {
            setTaskDate(value)
        }
    }

    const handleCreate = () => {
        let taskObj = {}
        taskObj["Id"] = taskList.length + 1
        taskObj["Title"] = taskTitle
        taskObj["Description"] = taskDescription
        taskObj["Date"] = taskDate
        taskObj["Check"] = false
        create(taskObj)
        setTaskTitle("")
        setTaskDescription("")
        setTaskDate("")
    }
    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            fullscreen="md"
            centered
        >
            <ModalHeader toggle={toggle}>
                Create Task
            </ModalHeader>
            <form onSubmit={handleCreate}>
            <ModalBody>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="taskTitle"
                            placeholder="Title"
                            value={taskTitle}
                            onChange={handleChange}
                            className="form-control"
                            required
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
                    <div className="form-group mb-3">
                        <input
                            type="date"
                            name="taskDate"
                            value={taskDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
            </ModalBody>
            <ModalFooter>
                <input 
                    type="submit"
                    className="btn btn-primary"
                    value="Create"
                />
                {' '}
                <Button onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
            </form>
        </Modal>
    )
}

export default CreateTask
