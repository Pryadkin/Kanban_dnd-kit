import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import styles from './Task.module.scss'

import {RootState} from '@/redux/store'

export const Task = () => {
    const {taskId} = useParams()
    const tasks = useSelector((state: RootState) => state.kanban.tasks)
    const currentTask = tasks.find(task => task.id === taskId)

    return (
        <div className={styles.wrapper}>
            <h2>{currentTask?.title}</h2>
            <h3>Description</h3>
            <p>{currentTask?.description}</p>
        </div>
    )
}
