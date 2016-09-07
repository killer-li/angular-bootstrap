Mock

    .mock('/mock/topic', { //帖子管理
        'total': 30,
        'data|10': [{
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

    .mock('/mock/forum', {
        'count': 23,
        "data|10": [
            {
                'name': "@cname",
                'age|+1': 25
            }
        ]
    })
