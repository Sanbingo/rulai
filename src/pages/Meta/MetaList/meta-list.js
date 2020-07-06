import React, { Component } from 'react'
import { Table, Menu, Divider, Dropdown, Icon, message, Modal, Tag } from 'antd'
import {connect} from 'dva'
import MetaSearch from './meta-search'
import JsonEditor from '../jsoneditor'

@connect(({meta_data}) => ({
    meta_data,
    listData: meta_data.listData,
    pagination: meta_data.pagination,
    searchParams: meta_data.searchParams,
}))
class MetaList extends Component {
    componentDidMount() {
        //初始化拉取表格数据
        this.handleGetListData();
    }
    //获取基本数据列表
    handleGetListData = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'meta_data/handleListData',
            payload: {pageSize: 10, page: 1}
        });
    };
    //分页改变
    handlePaginationChange = (pagination) => {
        const {dispatch, searchParams} = this.props;
        const params = {
            //current: pagination.current,
            page: pagination.current, //page、current都表示当前页，但是laravel框架需要用page
            pageSize: pagination.pageSize,
            ...searchParams,
        };
        dispatch({
            type: 'meta_data/handleListData',
            payload: params,
        });
    };
    // 编辑
    handleTableRecordData = (record) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'meta_data/show',
            payload: {
                tabActiveKey: '3',
                tableRecordData: record,
            },
        });
    };
    // 删除
    handleDelTableRecord = (id, username) => {
        const {dispatch} = this.props;
        const userNameHtml = <span>您确定要删除 <span style={{color: 'blue'}}>{username} </span>吗？</span>;
        Modal.confirm({
            title: userNameHtml,
            content: '一旦删除，数据将无法恢复，请慎重操作',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'auth_user/handleDelData',
                    payload: {ids: [id]},
                    callback: () => {
                        //重新加载数据
                        this.handleGetListData();

                        //提示
                        message.success(this.props.msg, 3);

                    }
                });
            },
            onCancel() {
            }
        })
    };
    // 操作
    handleTableOperation = ({key}, record) => {
        //key=1 删除 ，key=2 分配角色 ，key=3 分配权限
        if (key === '1') this.handleDelTableRecord(record.id, record.name);
    };
    menu = (record) => (
        <Menu onClick={(key) => {
            this.handleTableOperation(key, record)
        }}>
            <Menu.Item key="1">
                <a href="#">删 除</a>
            </Menu.Item>

            {record.status === 'draft' && <Menu.Item key="2">
                <a href="#">发布</a>
            </Menu.Item>}

            {record.status === 'publish' &&<Menu.Item key="3">
                <a href="#">下架</a>
            </Menu.Item>
            }
        </Menu>
    );

    columns = [{
        title: 'ID',
        dataIndex: 'id'
    }, {
        title: '名称',
        dataIndex: 'name',
        // render: (e) => (
        //     <a href="#">{e}</a>
        // ),
    }, {
        title: '描述',
        dataIndex: 'description'
    }, {
        title: '状态',
        dataIndex: 'status',
        render: (e)  => {
            return e === 'publish' ? <Tag color="#87d068">已发布</Tag>: <Tag color="#108ee9">草稿</Tag>
        }
    }, {
        title: '修改日期',
        dataIndex: 'datetime'
    }, {
        title: '操作',
        render: (e, record) => (
            <div>
                <a onClick={() => this.handleTableRecordData(record)}>编辑</a>
                <Divider type='vertical'/>
                <Dropdown overlay={() => this.menu(record)}>
                    <a href="#">
                        更多<Icon type="down"/>
                    </a>
                </Dropdown>
            </div>
        )
    }]
    render() {
        const { listData=[], pagination } = this.props;
        // 分页配置
        const paginationParams = {
            pageSize: pagination.pageSize,
            total: pagination.total,
            current: pagination.current
        }
        return (
            <div style={{paddingRight: '1%', paddingLeft: '1%'}}>
                <MetaSearch />
                <Table
                    dataSource={listData}
                    columns={this.columns}
                    rowKey="id"
                    pagination={paginationParams}
                    onChange={this.handlePaginationChange}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}><JsonEditor value={record.content}/></p>,
                        rowExpandable: record => record.content !== undefined,
                        expandRowByClick: true
                    }}
                />
            </div>
            
        );
    }
}

export default MetaList