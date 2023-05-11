import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

import {Button, Input} from 'antd'
import TextArea from 'antd/es/input/TextArea'

import styles from './Task.module.scss'

import {EditBar} from '@/components/EditBar'
import {updateTasks} from '@/redux'
import {RootState} from '@/redux/store'

export const Task = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const {taskId} = useParams()
    const tasks = useSelector((state: RootState) => state.kanban.tasks)
    const currentTask = tasks.find(task => task.id === taskId)
    const [isEdit, setIsEdit] = useState(false)
    const [titleInput, setTitleInput] = useState(currentTask?.title || '')
    const [assignedInput, setAssignedInput] = useState(currentTask?.assigned || '')
    const [descriptionInput, setDescriptionInput] = useState(currentTask?.description || '')

    const handleEditButtonClick = () => {
        setIsEdit(!isEdit)
    }

    const handleTitleInputChange = (val: any) => {
        setTitleInput(val.target.value)
    }

    const handleAssignInputChange = (val: any) => {
        setAssignedInput(val.target.value)
    }

    const handleDescInputChange = (val: any) => {
        setDescriptionInput(val.target.value)
    }

    const handleEditTitleClick = () => {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    title: titleInput,
                }
            }
            return task
        })
        dispatch(updateTasks(newTasks))
        setIsEdit(false)
    }

    const handleEditAssignClick = () => {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    assigned: assignedInput,
                }
            }
            return task
        })
        dispatch(updateTasks(newTasks))
        setIsEdit(false)
    }

    const handleEditDescClick = () => {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    description: descriptionInput,
                }
            }
            return task
        })
        dispatch(updateTasks(newTasks))
        setIsEdit(false)
    }

    const handleDeleteButtonClick = () => {
        const newTasks = tasks.filter(task => task.id !== taskId)
        nav('/kanban')
        setTimeout(() => {
            dispatch(updateTasks(newTasks))
        })
    }

    return (
        <div className={styles.wrapper}>
            <EditBar
                onEdit={handleEditButtonClick}
                onDelete={handleDeleteButtonClick}
            />

            <div className={styles.elementWrapper}>
                <h2>{currentTask?.title}</h2>
                {isEdit && (
                    <div className={styles.elementEditWrapper}>
                        <Input
                            className={styles.input}
                            value={titleInput}
                            onChange={handleTitleInputChange}
                        />
                        <Button
                            type="primary"
                            onClick={handleEditTitleClick}
                            className={styles.btn}
                        >
                            Ok
                        </Button>
                    </div>
                )}
            </div>

            <div className={styles.elementWrapper}>
                <h3>Assigned</h3>
                <p>{currentTask?.assigned}</p>
                {isEdit && (
                    <div className={styles.elementEditWrapper}>
                        <Input
                            className={styles.input}
                            value={assignedInput}
                            onChange={handleAssignInputChange}
                        />
                        <Button
                            type="primary"
                            onClick={handleEditAssignClick}
                            className={styles.btn}
                        >
                            Ok
                        </Button>
                    </div>
                )}
            </div>

            <div className={styles.elementWrapper}>
                <h3>Description</h3>
                {!isEdit
                    ? (
                        <p>{currentTask?.description}</p>
                    )
                    : (
                        <div className={styles.elementEditWrapper}>
                            <TextArea
                                rows={10}
                                value={descriptionInput}
                                onChange={handleDescInputChange}
                            />
                            <Button
                                type="primary"
                                onClick={handleEditDescClick}
                                className={styles.btn}
                            >
                                Ok
                            </Button>
                        </div>
                    )}
            </div>

        </div>
    )
}
