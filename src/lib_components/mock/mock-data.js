Mock
    .mock('/mock/topic', {
        'data|5-15': [{
            'number|+1': 10000,
            'title': '@ctitle(3, 5)',
            'nickName': '@cname',
            'postTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
            'replyCount|+1': 100,
            'address': '@url',
            'status|1': true
        }]
    })

    .mock('http://mockjs.test.data/sdkv2/httpheader', {
        'key1': 'key1',
        'key2': 'key2'
    })
