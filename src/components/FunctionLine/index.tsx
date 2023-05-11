import {useState} from 'react'

import {
    Button,
} from 'antd'

import {AddTaskModal} from '../AddTaskModal'

import styles from './FunctionLine.module.scss'

export const FunctionLine = () => {
    const [isModalOpen, setIsAddTaskModalOpen] = useState(false)

    return (
        <div className={styles.wrapper}>
            <Button
                onClick={() => setIsAddTaskModalOpen(true)}
                size="small"
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
