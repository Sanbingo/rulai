import React, { Component } from 'react'
import { Button, Card, Col, DatePicker, Form, Icon, Input, Row, Select } from 'antd'
import { connect } from 'dva'

const Item = Form.Item;
const Option = Select.Option;

const MetaSearch = (props) => {
    const [form] = Form.useForm();
    const onFinish = (v) => {
        const { pagination, dispatch } = props;
        // 搜索栏校验条件，一般搜索不会添加校验
        form.validateFields().then(values => {
            if (values.datetime) {
                values.datetime = values.datetime.format('YYYY-MM-DD')
            }
            // 保存搜索条件
            dispatch({
                type: 'meta_data/handleSearchParams',
                payload: {
                    searchParams: {
                        ...values
                    }
                }
            })
            // 请求数据
            dispatch({
                type: 'meta_data/handleListData',
                payload: {
                    ...values,
                    ...pagination,
                },
            });
        })

    };
    const advanceSearch = (
        <Form labelAlign='left' form={form} name="control-hooks" onFinish={onFinish}>
            <Row gutter={24}>
                <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Item label='Meta名称:' name="name">
                        <Input placeholder='请输入' />
                    </Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Item label='MetaID:' name="id" hasFeedback>
                        <Input placeholder='请输入' />
                    </Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Item label='状态' name="status">
                        <Select placeholder='请选择'>
                            <Option key='draft'>草稿</Option>
                            <Option key='publish'>已发布</Option>
                        </Select>
                    </Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Item label='更新时间:' name="datetime">
                        <DatePicker
                            placeholder='请选择时间'
                            style={{ width: '100%' }}
                        >
                        </DatePicker>
                    </Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Item>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Item>
                </Col>

            </Row>
        </Form>
    )
    return (
        <Card
            style={{ marginBottom: '1%' }}
            bodyStyle={{ paddingBottom: 0, paddingTop: '3%' }}
        >
            {advanceSearch}
        </Card>
    );
}

// 函数组件无法使用@connect装饰注入，需要手动调用函数连接。
export default connect(({ meta_data }) => ({
    pagination: meta_data.pagination
}))(MetaSearch)