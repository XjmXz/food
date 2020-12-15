<template>
    <view class="conbox">
        <view class="container">
            <!-- 背景 -->
            <image src="../../static/img/bg.png" class="cont"></image>
            <image src="../../static/img/caidai.png" class="caidai"></image>
            <view class="main" style="padding-top: 50upx;">
                <view class="canvas-container">

                    <view :animation="animationData" class="canvas-content" id="zhuanpano" style="">
                        <view class="canvas-line">
                            <view class="canvas-litem" v-for="(item,index) in list" :key="index"
                                  :style="{transform:'rotate('+(index * width + width / 2)+'deg)'}"></view>
                        </view>

                        <view class="canvas-list">
                            <view class="canvas-item" :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" v-for="(iteml,index) in list" :key="index">
                                <view class="canvas-item-text" :style="'transform:rotate('+(index )+')'">
                                    <text class="b" style="font-size: 32upx;">{{iteml.name}}</text>
                                    <text class="icon-awrad iconfont " :class="iteml.icon"></text>
                                </view>
                            </view>
                        </view>
                    </view>

                    <view @tap="playReward" class="canvas-btn" v-bind:class="btnDisabled">开始 </view>
                </view>
            </view>
            <!-- 规则 -->
            <view class="guize" style="margin-top: 100upx;">
                <view class="title">
                    规则说明
                </view>
                <view class="g_item">
                    1.用户每天登录即送1次抽奖机会，分享好友则多赠1次机会
                </view>
                <view class="g_item">
                    2.用户点击大转盘抽奖按钮，有积分和现金两种方式可参与抽奖，没抽一次消耗1次抽奖机会
                </view>
                <view class="g_item">
                    3.用户获得的奖品，可在我的道具里查看
                </view>
            </view>
        </view>

    </view>
</template>

<script>


  export default {
    data() {
      return {
        list: [
          {
            "name": "5折",
            "value": "5",
            icon: 'icondazhe text-danger',
          },
          {
            "name": "6折",
            "value": "6",
            icon: 'icondazhe text-danger',
          },
          {
            "name": "7折",
            "value": "7",
            icon: 'icondazhe text-danger',
          },
          {
            "name": "8折",
            "value": "8",
            icon: 'icondazhe text-danger',
          },
          {
            "name": "9折",
            "value": "9",
            icon: 'icondazhe text-danger',
          },
          {
            "name": "感谢参与",
            "value": "10",
            icon: 'iconfangqi1 text-master',
            isNoPrize: true, // 是否未中奖
          },
        ],
        width: 0,
        animationData: {},
        btnDisabled: '',
      }
    },
    onLoad: function() {
      // 获取奖品列表
      this.width = 360 / this.list.length
    },
    methods: {
      animation(index, duration)
      {
        //中奖index
        var list = this.list;
        // var awardIndex = 1 || Math.round(Math.random() * (awardsNum.length - 1)); //随机数
        var runNum = 4; //旋转8周

        // 旋转角度
        this.runDeg = this.runDeg || 0;
        this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - index * (360 / list.length)) +1
        //创建动画
        var animationRun = uni.createAnimation({
          duration: duration,
          timingFunction: 'ease'
        })
        animationRun.rotate(this.runDeg).step();
        this.animationData = animationRun.export();
        this.btnDisabled = 'disabled';

      },
      //发起抽奖
      playReward()
      {
        let index = 3, duration = 4000
        this.animation(index, duration)

        setTimeout(() => {
          uni.showModal({content: this.list[index].isNoPrize ? '抱歉，您未中奖' : '恭喜，中奖'})
          this.btnDisabled = '';
          // document.getElementById('zhuanpano').style=''
        }, duration + 1000)

      },

    }

  }
</script>
<style scoped>

    .icon-awrad {
        font-size: 50upx !important;
    }

    .conbox {
        width: 750upx;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .container,
    image.cont {
        width: 750upx;
        min-height: 100vh;
        height: auto;
        position: relative;
    }

    image.cont {
        height: 100%;
        position: absolute;
        z-index: 0;
    }

    image.caidai {
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 1024upx;
    }


    .header-title>view {
        padding: 8upx 16upx;
        border: 1px solid #d89720;
        color: #d89720;
        font-size: 28upx;
        border-radius: 26upx;
    }

    /* 转盘 */
    .canvas-container {
        margin: 0 auto;
        position: relative;
        width: 600upx;
        height: 600upx;
        background: url(../../static/img/circle.png) no-repeat;
        background-size: cover;
        border-radius: 50%;
    }


    .canvas-content {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        display: block;
        width: 600upx;
        height: 600upx;
        border-radius: inherit;
        /* background-clip: padding-box; */
        /* background-color: #ffcb3f; */
    }

    .canvas-list {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        z-index: 9999;
    }

    .canvas-item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: #e4370e;
        /* text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6); */
    }

    .canvas-item-text {
        position: relative;
        display: block;
        padding-top: 46upx;
        margin: 0 auto;
        text-align: center;
        -webkit-transform-origin: 50% 300upx;
        transform-origin: 50% 300upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #FB778B;
    }

    .canvas-item-text text {
        font-size: 30upx;
    }

    /* 分隔线 */
    .canvas-line {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        z-index: 99;
    }

    .canvas-litem {
        position: absolute;
        left: 300upx;
        top: 0;
        width: 3upx;
        height: 300upx;
        background-color: rgba(228, 55, 14, 0.4);
        overflow: hidden;
        -webkit-transform-origin: 50% 300upx;
        transform-origin: 50% 300upx;
    }

    /**
* 抽奖按钮
*/
    .canvas-btn {
        position: absolute;
        left: 260upx;
        top: 260upx;
        z-index: 400;
        width: 80upx;
        height: 80upx;
        border-radius: 50%;
        color: #f4e9cc;
        background-color: #e44025;
        line-height: 80upx;
        text-align: center;
        font-size: 26upx;
        text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
        text-decoration: none;
    }

    .canvas-btn::after {
        position: absolute;
        display: block;
        content: ' ';
        left: 12upx;
        top: -44upx;
        width: 0;
        height: 0;
        overflow: hidden;
        border-width: 30upx;
        border-style: solid;
        border-color: transparent;
        border-bottom-color: #e44025;
    }
    .canvas-btn.disabled {
        pointer-events: none;
        background: #b07a7b;
        color: #ccc;
    }

    .canvas-btn.disabled::after {
        border-bottom-color: #b07a7b;
    }


    .typecheckbox view {
        border: 1px solid #FF3637;
        background: transparent;
        color: #FF3637;
        display: flex;
        height: 60upx;
        width: 140upx;
        border-radius: 50upx;
        align-items: center;
        justify-content: center;
        display: flex;
        margin-left: 20upx;
    }


    .guize {
        width: 502upx;
        min-height: 300upx;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 3;
        background-image: linear-gradient(-180deg, #F48549 0%, #F2642E 100%);
        border: 18upx solid #E4431A;
        border-radius: 16px;
        margin: 0 auto;
        margin-top: -104upx;
        padding: 48upx;
        /* box-sizing: border-box; */
        color: #fff;
    }

    .guize .title {
        text-align: center;
        margin-bottom: 28upx;
    }

    .guize .g_item {
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        color: #FFFFFF;
        letter-spacing: 0.5px;
        text-align: justify;
        line-height: 20px;
    }

    .myrewards .title {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #E4431A;
        letter-spacing: 0.57px;
        display: flex;
        padding-top: 36upx;
        justify-content: center;
    }


</style>
