import React, {forwardRef, CSSProperties} from 'react'

import classNames from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    active?: {
        fill: string;
        background: string;
    };
    cursor?: CSSProperties['cursor'];
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        active, className, cursor, style, ...props
    }, ref) => (
        <button
            type="button"
            ref={ref}
            {...props}
            className={classNames(styles.Action, className)}
            tabIndex={0}
            style={
                {
                    ...style,
                    cursor,
                    '--fill': active?.fill,
                    '--background': active?.background,
                } as CSSProperties
            }
        />
    ),
)
