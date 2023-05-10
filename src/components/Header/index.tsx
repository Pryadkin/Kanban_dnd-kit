import {ReactComponent as Logo} from '@assets/images/dm-logo.svg'

import styles from './Header.module.scss'

export const Header = () => {
    console.log('svg')
    return (
        <div className={styles.wrapper}>
            <Logo />
        </div>
    )
}
