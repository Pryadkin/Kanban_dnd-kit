/* eslint-disable import/no-cycle */
import {FC, lazy} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {Layout} from '@components/Layout'

const Kanban = lazy(() => import('./pages/Kanban'))
const Task = lazy(() => import('./pages/Task'))

export const App: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    path="/kanban"
                    element={<Kanban />}
                />
                <Route
                    path="/tasks/:taskId"
                    element={<Task />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App
