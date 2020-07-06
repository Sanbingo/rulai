export default {
    'POST /api/meta/list': (req, res) => {
        const origins = [
            {
              id: '10001',
              name: '嗨星座',
              description: '这是一段测试的描述信息',
              datetime: '2020-01-02',
              status: 'publish',
              content: {
                name: 'san'
              }
            },
            {
              id: '10002',
              name: '寓见未来',
              description: '这是一段测试的描述信息',
              datetime: '2020-03-04',
              status: 'publish',
              content: {
                name: 'san'
              }
            },
            {
              id: '10003',
              name: 'Joe Black',
              description: '这是一段测试的描述信息',
              datetime: '2020-05-06',
              status: 'draft',
              content: {
                name: 'san'
              }
            },
            {
                id: '10004',
                name: '嗨星座',
                description: '这是一段测试的描述信息',
                datetime: '2020-01-02',
                status: 'publish',
              },
              {
                id: '10005',
                name: '寓见未来',
                description: '这是一段测试的描述信息',
                datetime: '2020-03-04',
                status: 'publish',
              },
              {
                id: '10006',
                name: 'Joe Black',
                description: '这是一段测试的描述信息',
                datetime: '2020-05-06',
                status: 'draft',
              },
              {
                id: '10007',
                name: '嗨星座',
                description: '这是一段测试的描述信息',
                datetime: '2020-01-02',
              },
              {
                id: '10008',
                name: '寓见未来',
                description: '这是一段测试的描述信息',
                datetime: '2020-03-04',
              },
              {
                id: '10003',
                name: 'Joe Black',
                description: '这是一段测试的描述信息',
                datetime: '2020-05-06',
              },
              {
                id: '10009',
                name: '嗨星座',
                description: '这是一段测试的描述信息',
                datetime: '2020-01-02',
              },
              {
                id: '100010',
                name: '寓见未来',
                description: '这是一段测试的描述信息',
                datetime: '2020-03-04',
              },
              {
                id: '100011',
                name: 'Joe Black',
                description: '这是一段测试的描述信息',
                datetime: '2020-05-06',
              },
              {
                id: '100012',
                name: '嗨星座',
                description: '这是一段测试的描述信息',
                datetime: '2020-01-02',
              },
              {
                id: '100013',
                name: '寓见未来',
                description: '这是一段测试的描述信息',
                datetime: '2020-03-04',
              },
              {
                id: '100014',
                name: 'Joe Black',
                description: '这是一段测试的描述信息',
                datetime: '2020-05-06',
              }
        ]
        const { name } = req.body;
        const results = origins.filter(item => item.name === name)
        res.send({
            status: 0,
            data: origins,
            message: 'success'
        })
    },
    'POST /api/meta/content': (req, res) => {
        const { metaId} = req.body;
        if (metaId === 100) {
            res.send({
                status: 0,
                data: { content: '2222222233333' },
                message: 'success'
            })
        }
    },
    'POST /api/meta/save': (req, res) => {
        const data = req.body;
        console.log('req.body: ', req.body)
        res.send({
          status: 0,
          data,
          message: 'success'
        })
    },
}