import {Outlet} from 'react-router-dom'

import {Header} from '../Header'

import styles from './Layout.module.scss'

export const Layout = () => (
    <div className={styles.wrapper}>
        <Header />
        <Outlet />
    </div>
)