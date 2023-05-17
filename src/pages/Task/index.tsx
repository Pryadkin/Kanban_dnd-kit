import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

import {Button, Input, Select} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import cn from 'classnames'

import styles from './Task.module.scss'

import {EditBar} from '@/components/EditBar'
import {updateColumns, updateTasks} from '@/redux'
import {RootState} from '@/redux/store'
import {TStatusColor} from '@/types'

const Task = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const {taskId} = useParams()
    const tasks = useSelector((state: RootState) => state.kanban.tasks)
    const columns = useSelector((state: RootState) => state.kanban.columns)
    const currentTask = tasks.find(task => task.id === taskId)
    const [isEdit, setIsEdit] = useState(false)
    const [titleInput, setTitleInput] = useState(currentTask?.title || '')
    const [assignedInput, setAssignedInput] = useState(currentTask?.assigned || '')
    const [prioritySelect, setPrioritySelect] = useState<TStatusColor>(currentTask?.priority || 'low')
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

    const handlePrioritySelectChange = (val: any) => {
        setPrioritySelect(val)
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

    const handleEditPriorityClick = () => {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    priority: prioritySelect,
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
        const newColumns = columns.map(column => {
            if (taskId && column.tasks.includes(taskId)) {
                const updateTaskList = column.tasks.filter(id => id !== taskId)

                return {
                    ...column,
                    tasks: updateTaskList,
                }
            }
            return column
        })

        dispatch(updateTasks(newTasks))
        dispatch(updateColumns(newColumns))
        nav('/kanban')
    }

    return (
        <div className={styles.wrapper}>
            <EditBar
                onEdit={handleEditButtonClick}
                onDelete={handleDeleteButtonClick}
            />

            <h1>{currentTask?.title}</h1>
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
                <h3>Priority</h3>

                {!isEdit
                    ? <p>{currentTask?.priority}</p>
                    : (
                        <div className={styles.elementEditWrapper}>
                            <Select
                                defaultValue="low"
                                value={{value: prioritySelect, label: prioritySelect}}
                                style={{width: 120}}
                                onChange={handlePrioritySelectChange}
                                options={[
                                    {value: 'high', label: 'high'},
                                    {value: 'medium', label: 'medium'},
                                    {value: 'low', label: 'low'},
                                ]}
                            />
                            <Button
                                type="primary"
                                onClick={handleEditPriorityClick}
                                className={styles.btn}
                            >
                                Ok
                            </Button>
                        </div>
                    )}
            </div>

            <div className={cn(styles.elementWrapper, styles.column)}>
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

export default Task
