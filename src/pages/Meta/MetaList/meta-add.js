import React, { Component } from 'react'
import { Input, Form, Row, Col, Select, Button, message, Spin } from 'antd'
import { connect } from 'dva'
import JsonEditor from '../jsoneditor'

const Item = Form.Item;
const Option = Select.Option;

const MetaForm = (props) => {
    const [form] = Form.useForm();
    const { tableRecordData } = props;
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
    }
    //重置表单
    const handleReSetForm = () => {
        form.resetFields();
    };
    // 切换Tab
    const handleTabsChange = (key) => {
        const {dispatch, tabActiveKey} = props;
        //改变tabs状态和清除tableRecordData
        dispatch({
            type: 'meta_data/show',
            payload: {
                tabActiveKey: key,
                tableRecordData: [],
            },
        });
    };
    const handleSubmitBtn = (v) => {
        const { dispatch } = props;
        form.validateFields().then(values => {
            console.log('form submit values', values)
            dispatch({
                type: 'meta_data/handleSubmitBtn',
                payload: values,
                callback: () => {
                    // 切换Tabs，到Meta列表页
                    handleTabsChange("1")
                    //重置表单
                    handleReSetForm();
                }
            });

        }).catch(err => {
            console.log('err', err)
        })
    }
    return (
        <Form {...formItemLayout}
            layout='horizontal' labelAlign='right' form={form} name="control-hooks"
            initialValues={{
                ...tableRecordData
            }}
        >
            <Item label="名称" name="name">
                <Input placeholder='请输入Meta名称' />
            </Item>
            <Item label='描述' name="description">
                <Input placeholder='请输入Meta描述' />
            </Item>
            <Item label='内容' name="content">
                <JsonEditor />
            </Item>
            <Row type='flex' justify='center'>
                <Col xs={{ span: 6 }} sm={{ span: 3 }}><Button type='danger' onClick={handleReSetForm}>重
                            置</Button></Col>
                <Col xs={{ span: 6 }} sm={{ span: 3 }}>
                    <Button type='primary' onClick={handleSubmitBtn}>立即提交</Button>
                </Col>

            </Row>
        </Form>
    );

}

export default connect(({meta_data, loading}) => ({
    tabActiveKey: meta_data.tabActiveKey,
    tableRecordData: meta_data.tableRecordData
}))(MetaForm)