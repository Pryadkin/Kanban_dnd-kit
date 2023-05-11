import {FC} from 'react'

import {FunctionLine} from '../../components/FunctionLine'
import {Header} from '../../components/Header'
import {KanbanWrapper} from '../../components/KanbanWrapper'

import styles from './App.module.scss'

export const App: FC = () => (
    <div className={styles.wrapper}>
        <Header />
        <FunctionLine />
        <KanbanWrapper />
    </div>
)

export default App
