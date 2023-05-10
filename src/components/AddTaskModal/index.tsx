import {FC} from 'react'

import {
    Button, Form, Input, Modal,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'

interface Props {
    isModalOpen: boolean,
    onModalOpen: (val: boolean) => void
}
export const AddTaskModal: FC<Props> = ({
    isModalOpen,
    onModalOpen,
}) => {
    const [form] = Form.useForm()

    const submitForm = (values: any) => {
        console.log('values', values)
        form.resetFields()
        onModalOpen(false)
    }

    const handleOk = () => {
        onModalOpen(false)
    }

    const handleCancel = () => {
        onModalOpen(false)
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
