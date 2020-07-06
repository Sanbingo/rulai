import {
    queryListData,
    queryOneRecordData,
    saveNewData,
} from '@/services/meta'
import { message } from 'antd'

export default {
    namespace: 'meta_data',
    state: {
        listData: [],
        pagination: {
            page: 1,
            pageSize: 10
        },
        tabActiveKey: '1', //默认是Meta列表
        searchParams: {},
        tableRecordData: {}
    },
    effects: {
        *handleListData({ payload, callback}, {put, call}) {
            const res = yield call(queryListData, payload)
            if (!res.status) { // status = 0 表示成功，非0表示失败
                yield put({
                    type: 'show',
                    payload: {
                        listData: res.data
                    }
                })
            }
        },
        *handleSearchParams({ payload }, {put}) {
            //保存搜索框，用户输入的参数选项值
            yield put({
                type: 'show',
                payload: payload,
            });
        },
        *handleSubmitBtn ({ payload, callback}, {put, call}) {
            console.log('payload', payload)
            // 保存数据
            const res = yield call(saveNewData, payload)
            if (!res.status) {
                callback && callback()
                // 刷新meta列表数据
                yield put({
                    type: 'handleListData',
                })
            }
        }
    },
    reducers: {
        show(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}