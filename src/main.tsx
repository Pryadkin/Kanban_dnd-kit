import {StrictMode} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import ReactDOM from 'react-dom/client'

import {App} from './pages'
import {store} from './redux/store'

import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </StrictMode>,
    )
