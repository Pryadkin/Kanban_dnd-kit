import {useState} from 'react'

import {
    Button,
} from 'antd'

import {AddColumnModal} from '../AddColumnModal'
import {AddTaskModal} from '../AddTaskModal'

import styles from './FunctionLine.module.scss'

export const FunctionLine = () => {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
    const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false)

    return (
        <div className={styles.wrapper}>
            <Button
                onClick={() => setIsAddTaskModalOpen(true)}
                size="small"
            >
                add task
            </Button>
            <Button
                onClick={() => setIsAddColumnModalOpen(true)}
                size="small"
            >
                add column
            </Button>
            <AddTaskModal
                isModalOpen={isAddTaskModalOpen}
                onModalOpen={val => setIsAddTaskModalOpen(val)}
            />
            <AddColumnModal
                isModalOpen={isAddColumnModalOpen}
                onModalOpen={val => setIsAddColumnModalOpen(val)}
            />
        </div>
    )
}
