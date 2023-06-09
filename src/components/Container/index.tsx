import React, {forwardRef} from 'react'

import {Handle} from '@components/Handle'
import {Remove} from '@components/Remove'
import classNames from 'classnames'

import styles from './Container.module.scss'

export interface ContainerProps {
    children: React.ReactNode;
    columns?: number;
    label?: string;
    style?: React.CSSProperties;
    horizontal?: boolean;
    hover?: boolean;
    handleProps?: React.HTMLAttributes<any>;
    scrollable?: boolean;
    shadow?: boolean;
    placeholder?: boolean;
    unstyled?: boolean;
    onClick?(): void;
    onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            children,
            columns = 1,
            handleProps,
            horizontal,
            hover,
            onClick,
            onRemove,
            label,
            placeholder,
            style,
            scrollable,
            shadow,
            unstyled,
            ...props
        }: ContainerProps,
        ref,
    ) => {
        const Component = onClick ? 'button' : 'div'

        return (
            <div
                role="button"
                ref={ref}
                {...props}
                style={
                    {
                        ...style,
                        '--columns': columns,
                    } as React.CSSProperties
                }
                className={classNames(
                    styles.Container,
                    unstyled && styles.unstyled,
                    horizontal && styles.horizontal,
                    hover && styles.hover,
                    placeholder && styles.placeholder,
                    scrollable && styles.scrollable,
                    shadow && styles.shadow,
                )}
                onClick={onClick}
                tabIndex={onClick ? 0 : undefined}
            >
                {label
                    ? (
                        <div className={styles.Header}>
                            {label}
                            <div className={styles.Actions}>
                                {onRemove ? <Remove onClick={onRemove} /> : undefined}
                                <Handle {...handleProps} />
                            </div>
                        </div>
                    )
                    : null}
                {placeholder ? children : <ul>{children}</ul>}
            </div>
        )
    },
)
