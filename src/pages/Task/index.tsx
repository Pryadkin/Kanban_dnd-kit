import {useLocation, useParams} from 'react-router-dom'

export const Task = () => {
    const {taskId} = useParams()
    return (
        <div>{taskId}</div>
    )
}
