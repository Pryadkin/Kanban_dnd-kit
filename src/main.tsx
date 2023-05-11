import {StrictMode} from 'react'
import {Provider} from 'react-redux'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import ReactDOM from 'react-dom/client'

import {App, Task} from './pages'
import {store} from './redux/store'

import './styles/global.scss'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'tasks/:taskId',
        element: <Task />,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>,
    )
