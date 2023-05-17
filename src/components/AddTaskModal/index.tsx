import {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {
    Button, Form, Input, Modal, Select,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {v4 as uuidv4} from 'uuid'

import {addTask, updateColumns} from '@/redux'
import {RootState} from '@/redux/store'
import {TStatusColor} from '@/types'

interface Props {
    isModalOpen: boolean,
    onModalOpen: (val: boolean) => void
}

export const AddTaskModal: FC<Props> = ({
    isModalOpen,
    onModalOpen,
}) => {
    const dispatch = useDispatch()
    const columns = useSelector((state: RootState) => state.kanban.columns)
    const [form] = Form.useForm()

    const submitForm = (values: any) => {
        form.resetFields()

        const newTask = {
            id: uuidv4(),
            title: values.taskName,
            description: values.taskDescription,
            assigned: values.taskAssigned,
            priority: values.taskPriority,
        }

        const updateCols = columns.map(column => {
            if (column.title === 'to do') {
                return {
                    ...column,
                    tasks: [...column.tasks, newTask.id],
                }
            }
            return column
        })

        dispatch(addTask(newTask))
        dispatch(updateColumns(updateCols))
        onModalOpen(false)
    }

    const handleOk = () => {
        onModalOpen(false)
    }

    const handleCancel = () => {
        onModalOpen(false)
    }

    const handlePrioritySelectChange = (value: TStatusColor) => {
        switch (value) {
            case 'high':
                form.setFieldsValue({priority: 'high'})
                break
            case 'medium':
                form.setFieldsValue({priority: 'medium'})
                break
            case 'low':
                form.setFieldsValue({priority: 'low'})
                break
            default:
        }
    }

    return (
        <Modal
            title="Add task"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={submitForm}
            >
                <Form.Item
                    label="Название задачи"
                    name="taskName"
                    rules={[{required: true, message: 'Пожалуйста, введите название задачи'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Имя ответственного"
                    name="taskAssigned"
                    rules={[{required: true, message: 'Пожалуйста, введите имя ответственного'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Приоритет"
                    name="taskPriority"
                    rules={[{required: true, message: 'Пожалуйста, введите приоритет задачи'}]}
                >
                    <Select
                        defaultValue="low"
                        style={{width: 120}}
                        onChange={handlePrioritySelectChange}
                        options={[
                            {value: 'high', label: 'high'},
                            {value: 'medium', label: 'medium'},
                            {value: 'low', label: 'low'},
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Описание задачи"
                    name="taskDescription"
                    rules={[{required: true, message: 'Пожалуйста, введите описание задачи'}]}
                >
                    <TextArea />
                </Form.Item>
                <div>
                    <Button
                        type="default"
                        htmlType="reset"
                        onClick={submitForm}
                    >
                        Отменить
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        ОК
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}
