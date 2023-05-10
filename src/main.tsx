import {StrictMode} from 'react'
import {Provider} from 'react-redux'

import ReactDOM from 'react-dom/client'

import App from './App'
import {store} from './redux/store'

import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    )
