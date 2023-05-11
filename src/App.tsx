/* eslint-disable import/no-cycle */
import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'

import {Layout} from '@components/Layout'

import {Task} from './pages'
import {Kanban} from './pages/Kanban'

export const App: FC = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route
                path="/kanban"
                element={<Kanban />}
            />
            <Route path="/tasks/:taskId" element={<Task />} />
        </Route>
    </Routes>
)

export default App
