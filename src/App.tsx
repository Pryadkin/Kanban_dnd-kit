import {useState} from 'react'

import {Kanban} from './components/Kanban'

const App = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <Kanban />
        </div>
    )
}

export default App
