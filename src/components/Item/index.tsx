/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Handle} from '@components/Handle'
import {Remove} from '@components/Remove'
import type {DraggableSyntheticListeners} from '@dnd-kit/core'
import type {Transform} from '@dnd-kit/utilities'
import classNames from 'classnames'

import styles from './Item.module.scss'

import {ITask} from '@/types'

export interface Props {
    dragOverlay?: boolean;
    color?: string;
    disabled?: boolean;
    dragging?: boolean;
    handle?: boolean;
    handleProps?: any;
    height?: number;
    index?: number;
    fadeIn?: boolean;
    transform?: Transform | null;
    listeners?: DraggableSyntheticListeners;
    sorting?: boolean;
    style?: React.CSSProperties;
    transition?: string | null;
    wrapperStyle?: React.CSSProperties;
    value: ITask;
    onRemove?(): void;
    renderItem?(args: {
        dragOverlay: boolean;
        dragging: boolean;
        sorting: boolean;
        index: number | undefined;
        fadeIn: boolean;
        listeners: DraggableSyntheticListeners;
        ref: React.Ref<HTMLElement>;
        style: React.CSSProperties | undefined;
        transform: Props['transform'];
        transition: Props['transition'];
        value: Props['value'];
    }): React.ReactElement;
}

export const Item = React.memo(
    React.forwardRef<HTMLLIElement, Props>(
        (
            {
                color,
                dragOverlay,
                dragging,
                disabled,
                fadeIn,
                handle,
                handleProps,
                height,
                index,
                listeners,
                onRemove,
                renderItem,
                sorting,
                style,
                transition,
                transform,
                value,
                wrapperStyle,
                ...props
            },
            ref,
        ) => {
            const nav = useNavigate()
            const [contentActive, setContentActive] = useState(false)

            const handleContentMouseOver = () => {
                setContentActive(true)
            }

            const handleContentMouseLeave = () => {
                setContentActive(false)
            }

            const handleContentBtnClick = () => {
                nav(`/tasks/${value.id}`)
            }

            useEffect(() => {
                if (!dragOverlay) {
                    return
                }

                document.body.style.cursor = 'grabbing'

                return () => {
                    document.body.style.cursor = ''
                }
            }, [dragOverlay])

            return renderItem
                ? (
                    renderItem({
                        dragOverlay: Boolean(dragOverlay),
                        dragging: Boolean(dragging),
                        sorting: Boolean(sorting),
                        index,
                        fadeIn: Boolean(fadeIn),
                        listeners,
                        ref,
                        style,
                        transform,
                        transition,
                        value,
                    })
                )
                : (
                    <li
                        className={classNames(
                            styles.Wrapper,
                            fadeIn && styles.fadeIn,
                            sorting && styles.sorting,
                            dragOverlay && styles.dragOverlay,
                        )}
                        onMouseOver={handleContentMouseOver}
                        onMouseLeave={handleContentMouseLeave}
                        style={
                            {
                                ...wrapperStyle,
                                transition: [transition, wrapperStyle?.transition]
                                    .filter(Boolean)
                                    .join(', '),
                                '--translate-x': transform
                                    ? `${Math.round(transform.x)}px`
                                    : undefined,
                                '--translate-y': transform
                                    ? `${Math.round(transform.y)}px`
                                    : undefined,
                                '--scale-x': transform?.scaleX
                                    ? `${transform.scaleX}`
                                    : undefined,
                                '--scale-y': transform?.scaleY
                                    ? `${transform.scaleY}`
                                    : undefined,
                                '--index': index,
                                '--color': color,
                            } as React.CSSProperties
                        }
                        ref={ref}
                    >
                        <div
                            className={classNames(
                                styles.Item,
                                dragging && styles.dragging,
                                handle && styles.withHandle,
                                dragOverlay && styles.dragOverlay,
                                disabled && styles.disabled,
                                color && styles.color,
                            )}
                            style={style}
                            data-cypress="draggable-item"
                            {...(!handle ? listeners : undefined)}
                            {...props}
                            tabIndex={!handle ? 0 : undefined}
                        >
                            <div className={styles.contant}>
                                <div
                                    className={styles.title}
                                >
                                    {value.title}
                                </div>
                                <div
                                    className={styles.assigned}
                                >
                                    {value.assigned}
                                </div>
                                <button
                                    className={classNames(
                                        styles.contentBtn,
                                        contentActive && styles.show,
                                    )}
                                    onClick={handleContentBtnClick}
                                    type="button"
                                >
                                    Подробнее
                                </button>
                            </div>
                            <span className={styles.Actions}>
                                {onRemove
                                    ? (
                                        <Remove className={styles.Remove} onClick={onRemove} />
                                    )
                                    : null}
                                {handle ? <Handle {...handleProps} {...listeners} /> : null}
                            </span>
                        </div>
                    </li>
                )
        },
    ),
)
