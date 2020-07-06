import React, { Component } from 'react'
import { Tabs, Card, Button } from 'antd'
import {connect} from 'dva'
import MetaList from './meta-list'
import MetaForm from './meta-add'

const TabPane = Tabs.TabPane;

@connect(({meta_data}) => ({
    meta_data,
    tabActiveKey: meta_data.tabActiveKey,
}))
class MetaIndex extends Component {
    handleTabsChange = (key) => {
        const {dispatch, tabActiveKey} = this.props;
        dispatch({
            type: 'meta_data/show',
            payload: {
                tabActiveKey: key,
                tableRecordData: [],
            },
        });
    }
    render() {
        const {tabActiveKey } = this.props;
        return (
            <Card style={{ margin: '1.8%'}}>
                <Tabs
                    activeKey={tabActiveKey}
                    onChange={this.handleTabsChange}
                >
                    <TabPane tab={<Button type='primary' style={{fontWeight: '700'}}>Meta列表</Button>} key="1">
                        <MetaList />
                    </TabPane>
                    <TabPane tab={<Button style={{fontWeight: '700'}}>新建Meta</Button>} key="2">
                        <MetaForm />
                    </TabPane>
                    {
                        tabActiveKey === '3' && <TabPane tab={<Button style={{fontWeight: '700'}}>编辑Meta</Button>} key="3">
                        <MetaForm />
                    </TabPane>
                    }
                </Tabs>
            </Card>
        );
    }
}

export default MetaIndex