import {Suspense} from 'react'
import {Link, Outlet} from 'react-router-dom'

import {Header} from '../Header'

import styles from './Layout.module.scss'

export const Layout = () => (
    <div className={styles.wrapper}>
        <Header />
        <Link to="/kanban">Kanban</Link>
        <Suspense>
            <Outlet />
        </Suspense>
    </div>
)
