Mock

    .mock('/mock/topic', { //帖子管理
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
    .mock('/mock/hot', { //最热帖子
        'data|5-7': [{
            'title': '@ctitle(5, 15)',
            'nickName': '@cname',
            'postTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
            'replyCount|+1': 100
        }]
    })
    .mock('/mock/recent', { //最新帖子
        'data|5-7': [{
            'title': '@ctitle(5, 15)',
            'nickName': '@cname',
            'postTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
            'replyCount|+1': 100
        }]
    })

    .mock('http://mockjs.test.data/sdkv2/httpheader', {
        'key1': 'key1',
        'key2': 'key2'
    })
