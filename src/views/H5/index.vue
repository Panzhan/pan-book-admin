<template>
  <div class="lottery_container">
    <lottery
      :activityId="activityId"
      :chance_num="chance_num"
      :total_remian_chances="total_remian_chances"
      :rewordLst="rewordLst"
      @handleLogin="handleLogin"
      @handleJumpToRewordList="handleJumpToRewordList"
      @getPrize="getPrize"
    ></lottery>
  </div>
</template>

<script>
import lottery from './components/lottery'

// eslint-disable-next-line no-unused-vars
const TASK_IMG_MAP = {
    lottery_activity_bind_official_account_enum: require('./images/icon_fuwuhao.png'),
    lottery_activity_share_invite_card_to_moments_enum: require('./images/icon_pengyouquan.png'),
    lottery_activity_share_activity_to_wechat_group_enum: require('./images/icon_weixin.png'),
    lottery_activity_upload_invite_card_sharing_screenshot_enum: require('./images/icon_fuwuhao.png'),
    lottery_activity_upload_invite_friends_sign_up_enum: require('./images/icon_fuwuhao.png'),
    lottery_activity_invite_friends_audition_purchase_enum: require('./images/icon_hear.png'),
}
// eslint-disable-next-line no-unused-vars
const TASK_OPERATING_MAP = {
    lottery_activity_bind_official_account_enum: '去完成', // 关注并绑定服务号
    lottery_activity_share_invite_card_to_moments_enum: '去分享', // 分享邀请卡到盆友圈
    lottery_activity_share_activity_to_wechat_group_enum: '去分享', // 分享活动到微信群
    lottery_activity_upload_invite_card_sharing_screenshot_enum: '去上传', // 上传邀请分享卡截图
    lottery_activity_upload_invite_friends_sign_up_enum: '去邀请', // 邀请好友注册
    lottery_activity_invite_friends_audition_purchase_enum: '去邀请', // 邀请好友试听/购课
}
export default {
    components: {
        lottery,
    },
    props: {},
    data() {
        return {
            prizeDialogShow: false,
            isShowLogin: false,
            channelNo: '', // 渠道号
            activityId: '', // 加密活动ID
            // 任务列表
            taskList: [],
            // 奖品列表
            rewordLst: [
                {
                    picked: false,
                    vid: '',
                    award_preview_image_url: require('./images/icon_fuwuhao.png'),
                },
            ],
            // 中奖奖品
            userPrize: {},
            isShowBottom: false,
            platform: '',
            chance_num: 0, // 当日次数
            total_remian_chances: 0, // 总次数
        }
    },
    created() {},
    methods: {
        handleLogin() {},
        handleJumpToRewordList() {},
        getPrize() {},
    },
}
</script>

<style lang="less" scoped>
.lottery_container {
  background: url('./images/bg_home.png') no-repeat;
  background-size: 100%;
  background-color: #ed3321;
  padding-bottom: 40px;
  .right_star {
    position: absolute;
    top: 1170px;
    right: 0;
    width: 100px;
    height: 100px;
    background: url('./images/star_top.png') center no-repeat;
    background-size: cover;
  }
  .bottom_star {
    position: absolute;
    top: 1840px;
    left: 0;
    width: 100px;
    height: 100px;
    background: url('./images/star_bottom.png') center no-repeat;
    background-size: cover;
  }
  .bottom {
    position: absolute;
    top: 2060px;
    left: 0;
  }
}
</style>
