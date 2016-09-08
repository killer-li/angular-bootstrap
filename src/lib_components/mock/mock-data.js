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

    .mock('/mock/forum', { //版块管理
        'total': 150,
        "data|10": [
            {
                'id|+1': 20,
                'name': '@cname',
                'state|1': true,
                'url': '@url',
                'requestType': function () {
                    return Mock.Random.boolean() ? 'GET' : 'POST';
                },
                'responseType': function () {
                    return Mock.Random.boolean() ? 'JSON' : 'TXT';
                },
                'alarmTimes': 3,
                'alarmInterval': 60,
                'rotationTime': 10,
                'timeout': 60,
                'delayTime': 60
            }
        ]
    })
