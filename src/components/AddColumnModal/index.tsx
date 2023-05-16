import {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {
    Button, Form, Input, Modal,
} from 'antd'
import {v4 as uuidv4} from 'uuid'

import {updateColumns} from '@/redux'
import {RootState} from '@/redux/store'

interface Props {
    isModalOpen: boolean,
    onModalOpen: (val: boolean) => void
}

export const AddColumnModal: FC<Props> = ({
    isModalOpen,
    onModalOpen,
}) => {
    const dispatch = useDispatch()
    const columns = useSelector((state: RootState) => state.kanban.columns)
    const [form] = Form.useForm()

    const submitForm = (values: any) => {
        form.resetFields()

        const newColumn = {
            id: uuidv4(),
            title: values.columnName,
            tasks: [],
        }

        const updateCols = [
            ...columns,
            newColumn,
        ]

        dispatch(updateColumns(updateCols))
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
                    label="Название колонки"
                    name="columnName"
                    rules={[{required: true, message: 'Пожалуйста, введите название колонки'}]}
                >
                    <Input />
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
