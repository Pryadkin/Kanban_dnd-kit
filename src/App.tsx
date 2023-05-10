import {FC} from 'react'

import {Header} from './components/Header'
import {KanbanWrapper} from './components/KanbanWrapper'

import styles from './App.module.scss'

const App: FC = () => (
    <div className={styles.wrapper}>
        <Header />
        <KanbanWrapper />
    </div>
)

export default App
