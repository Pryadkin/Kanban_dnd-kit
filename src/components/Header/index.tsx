import {ReactComponent as Logo} from '@assets/images/dm-logo.svg'

import styles from './Header.module.scss'

export const Header = () => (
    <div className={styles.wrapper}>
        <Logo className={styles.logo} />
    </div>
)
