import {useState} from 'react'

import {
    Button,
} from 'antd'

import {AddTaskModal} from '../AddTaskModal'

export const FunctionLine = () => {
    const [isModalOpen, setIsAddTaskModalOpen] = useState(false)

    return (
        <div>
            <Button
                onClick={() => setIsAddTaskModalOpen(true)}
            >
                add task
            </Button>
            <AddTaskModal
                isModalOpen={isModalOpen}
                onModalOpen={val => setIsAddTaskModalOpen(val)}
            />
        </div>
    )
}
