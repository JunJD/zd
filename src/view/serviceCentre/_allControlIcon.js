// collect 1收藏 0未收藏
// state 1首页show=true 0首页show=false
export default [
    {
        name: '最近使用',
        list: [
            {icon:'icon-huiyishiguanli_huaban', name:'会议室预约', collect: 1, state: 1},
            {icon:'icon-benyouhuangye', name:'部门黄页', collect: 1, state: 1},
            {icon:'icon-kaoqinguanli', name:'考勤查询', collect: 0, state: 0},
            {icon:'icon-anpaihuiyi', name:'一周安排', collect: 1, state: 0},
            {icon:'icon-dianhua', name:'服务电话', collect: 0, state: 0},
            {icon:'icon-yikatong', name:'一卡通',collect: 1, state: 0},
            {icon:'icon-huiyishi', name:'报告会预约', collect: 0, state: 0}
        ]
    },
    {
        name: '离校服务',
        list: [
            {icon:'icon-huiyishiguanli_huaban', name:'节假日离返校确认',collect: 1, state: 0}
        ]
    },
    {
        name: '教学服务',
        list: [
            {icon:'icon-huiyishiguanli_huaban', name:'教师双鱼教学资格热顶',collect: 1, state: 0},
            {icon:'icon-benyouhuangye', name:'我的考试', collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'一周安排', collec:1},
            {icon:'icon-anpaihuiyi', name:'教职工联通业务办理', collect: 1, state: 0},
            {icon:'icon-dianhua', name:'我的线下课程',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'线下课程安排',collect: 1, state: 0}
        ]
    },
    {
        name: 'IT服务',
        list: [
            {icon:'icon-huiyishiguanli_huaban', name:'办理在职（收入）', collect: 1, state: 0},
            {icon:'icon-benyouhuangye', name:'采购申请', collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'教室借用', collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'开具工作联系函申请', collect: 1, state: 0},
            {icon:'icon-dianhua', name:'学校邮箱申请', collect: 1, state: 0},
            {icon:'icon-yikatong', name:'会议室预约', collect: 1, state: 0},
            {icon:'icon-huiyishiguanli_huaban', name:'年度个人数据报告', collect: 0, state: 0},
            {icon:'icon-benyouhuangye', name:'教职工联调业务办理', collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'考勤查询', collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'二手市场', collect: 1, state: 0},
            {icon:'icon-dianhua', name:'一卡通查询', collect: 0, state: 0},
            {icon:'icon-yikatong', name:'营业时间', collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'校内班车查询', collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'失物招领', collect: 1, state: 0},
            {icon:'icon-dianhua', name:'问卷调查', collect: 1, state: 0},
            {icon:'icon-yikatong', name:'电子证书', collect: 1, state: 0},
            {icon:'icon-huiyishiguanli_huaban', name:'失物招领管理', collect: 1, state: 0},
            {icon:'icon-benyouhuangye', name:'投票服务', collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'校外人员进校审批', collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'问题反馈', collect: 1, state: 0},
            {icon:'icon-dianhua', name:'网址收藏', collect: 1, state: 0},
            {icon:'icon-yikatong', name:'工作日志', collect: 0, state: 0},
            {icon:'icon-yikatong', name:'税务发票、财政票据',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'教职工因公短期出国',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'教职工因公长期出国',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'刻章换章申请',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'中层干部国内外进修',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'虚拟机申请',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'教师授课资格认定',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'中层干部因私出国',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'用章用引申请',collect: 0, state: 0},
            {icon:'icon-yikatong', name:'教职工请假',collect: 0, state: 0}
        ]
    },
    {
        name: '图书服务',
        list: [
            {icon:'icon-huiyishiguanli_huaban', name:'部门黄页',collect: 1, state: 0},
            {icon:'icon-benyouhuangye', name:'空闲教室',collect: 0, state: 0},
            {icon:'icon-kaoqinguanli', name:'服务电话',collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'书目查询',collect: 0, state: 0},
            {icon:'icon-dianhua', name:'图书借阅记录',collect: 0, state: 0}
        ]
    },
    {
        name: '学工服务',
        list: [
            {icon:'icon-huiyishiguanli_huaban', name:'报修',collect: 1, state: 0},
            {icon:'icon-benyouhuangye', name:'签到',collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'勤工助学面试管理',collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'通知发布',collect: 1, state: 0},
            {icon:'icon-dianhua', name:'通知公告,collect: 1, state: 0'},
            {icon:'icon-huiyishiguanli_huaban', name:'违纪处分上报',collect: 1, state: 0},
            {icon:'icon-benyouhuangye', name:'心理预约(心里咨询)',collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'智能表单',collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'组织活动',collect: 0, state: 1},
            {icon:'icon-dianhua', name:'学工队伍考核',collect: 0, state: 1},
            {icon:'icon-huiyishiguanli_huaban', name:'学习信息审核',collect: 0, state: 1},
            {icon:'icon-benyouhuangye', name:'助学贷款管理',collect: 0, state: 1},
            {icon:'icon-kaoqinguanli', name:'综合测评成绩查看',collect: 0, state: 1},
            {icon:'icon-anpaihuiyi', name:'第二课堂部落服务',collect: 0, state: 1},
            {icon:'icon-dianhua', name:'第二课堂活动中心',collect: 0, state: 1},
            {icon:'icon-benyouhuangye', name:'辅导员夜间值班',collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'第二课堂活动管理',collect: 1, state: 0},
            {icon:'icon-anpaihuiyi', name:'第二课堂部落指导',collect: 0, state: 1}
        ]
    },
    {
        name: '科研服务',
        list: [
            {icon:'icon-huiyishiguanli_huaban', name:'VPN开通申请',collect: 1, state: 0},
            {icon:'icon-benyouhuangye', name:'校内访问互联网申请',collect: 1, state: 0},
            {icon:'icon-kaoqinguanli', name:'新员工信息采集',collect: 0, state: 1},
            {icon:'icon-anpaihuiyi', name:'报告会预约',collect: 0, state: 1},
            {icon:'icon-dianhua', name:'外网访问申请',collect: 0, state: 1}
        ]
    }
]