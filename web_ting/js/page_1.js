ELEMENT.locale(ELEMENT.lang.zhTW);
var windowwidth = 0
var windowheight = 0
new Vue({
    el: '#web',
    // 資料
    data: function () {
        return {
            srcdata:'https://www.youtube.com/embed/NnbGla3GZrg?mute=0&loop=1',
            music_status:true,
            show_status:0,
            loading:false,
            count_startdate:0,
            url_images:[
                {
                    url:'../web_ting/image_1.jpg',
                    width:'300px',
                    height:'350px'
                },
                {
                    url:'../web_ting/image_2.jpg',
                    width:'230px',
                    height:'350px'
                },
                {
                    url:'../web_ting/image_7.jpg',
                    width:'300px',
                    height:'350px'
                }
            ],
            cerousel_height:'0px',
            less_width:false,
            questiondata:'',
            dialogVisible:false,
            return_true:'',
            return_false:'',
            question_sort:1,
            buuton_status:false,
            next_or_return:'',
            count_erroe:0,
            false_show:false,
            dialog_width:'0px'
        }
    },

    mounted: function () {
        //頁面預先初始化
        this.onWindowload();
        
        window.onresize = () =>{
            this.setting_widthhight()
        }
    },

    methods: {
        //頁面資訊載入
        onWindowload(){


            this.setting_widthhight()

            //配置幻燈片高度
            this.cerousel_height = windowheight - 300 + 'px'

            //檢查是否登入
            if(!localStorage.getItem("loginstatus")){
                window.location.href = "/tingandcody/web_ting/index.html";
                // window.location.href = "/index.html";
                return
            }

            if(localStorage.getItem("question")){
                this.start_question()
            }

            

            //自動播放音樂
            this.change_music()
            // setVolume(20);

            //計算天數
            let today = new Date();
            let startday = new Date('2023/08/20')
            let count_day = today.getTime() - startday.getTime()
            // console.log(count_day);
            this.count_startdate = Math.floor(count_day/ (1000 * 3600 * 24));
        },

        //配置高度
        setting_widthhight(){
            //取得寬度高度
            windowwidth = window.innerWidth;
            windowheight = window.innerHeight;

            if(windowwidth > 768){
                this.less_width = '⬅️⬅️左邊'
            }else{
                this.less_width = '⬆️⬆️上方'
            }
            console.log(windowwidth);
            if(windowwidth >=1920 ){
                this.dialog_width = '30%'
            }else if(windowwidth <1920 && windowwidth >=1200){
                this.dialog_width = '40%'
            }else if(windowwidth <1200 && windowwidth >=992){
                this.dialog_width = '60%'
            }else if(windowwidth <992 && windowwidth >=768){
                this.dialog_width = '80%'
            }else{
                this.dialog_width = '100%'
            }

        },

        //選擇Menu
        handselect(key, keyPath){
            this.$notify.closeAll()
            // console.log(key);
            switch (key) {
                case '1':
                    
                    break;
                case '2':
                    this.$notify.info({
                        title: '維修中',
                        message: '還在製作中，請勿偷看喔愛你୧〳 ＾ ౪ ＾ 〵୨',
                        dangerouslyUseHTMLString:true
                    });
                    break;
                case '3':
                    //清除Session並登出
                    localStorage.removeItem("userName")
                    window.location.href = "/tingandcody/web_ting/index.html";
                    // window.location.href = "/index.html";
                    break
                default:
                    break;
            }
        },

        //啟用問答
        start_question(){
            this.return_true = ''
            this.return_false = ''
            this.buuton_status = false
            this.next_or_return = ''
            this.count_erroe = 0
            this.false_show = false
            this.dialogVisible = true
            this.question_sort = 1
            this.setting_questuins();
        },

        //題目定義區
        setting_questuins(){
            switch (this.question_sort) {
                case 1:
                    this.questiondata = '怡婷是不是最漂亮的女生 ʕ •̀ o •́ ʔ'
                    this.return_true = '是'
                    this.return_false = '不是'
                    break;
                case 2:
                    this.questiondata = '羿辰是不是又帥又聰明٩(✿∂‿∂✿)۶'
                    this.return_true = '是'
                    this.return_false = '不是'
                    break;
                case 3:
                    this.questiondata = '要不要做我女朋友 ლ(∘◕‵ƹ′◕ლ)'
                    this.return_true = '要'
                    this.return_false = '不要'
                    break;
                case 4:
                    this.questiondata = '要不要做我女朋友 ლ(∘◕‵ƹ′◕ლ)'
                    this.return_true = '要'
                    this.return_false = '要'
                    break;
                default:
                    break;
            }
        },

        answer_value(answer){
            this.$notify.closeAll()
            switch(this.question_sort){
                case 1:
                    if(answer){
                        this.questiondata = '沒錯，婷是最可愛的٩(^ᴗ^)۶'
                        this.buuton_status = true
                        this.$notify.info({
                            title: '接收結果',
                            message: '婷最可愛了!!'
                        });
                        this.count_erroe = 0
                        this.next_or_return = '下一題'
                    }else{
                        this.count_erroe +=1
                        if(this.count_erroe == 6){
                            this.false_show = true
                            this.$notify.info({
                                title: '接收結果',
                                message: '這麼堅持，那不給你選了（〜^∇^)〜',
                                dangerouslyUseHTMLString:true
                            });
                        }else{
                            this.$notify.info({
                                title: '接收結果',
                                message: '這這答案不對喔 (ᗒᗣᗕ)՞' + '<br/>'+
                                         '累積錯誤:' + this.count_erroe,
                                dangerouslyUseHTMLString:true
                            });
                        }
                    }
                    break;
                case 2:
                    if(answer){
                        this.questiondata = '害羞害羞σ(≧ε≦ｏ)，愛你'
                        this.buuton_status = true
                        this.$notify.info({
                            title: '接收結果',
                            message: '最愛婷了!!'
                        });
                        this.count_erroe = 0
                        this.next_or_return = '下一題'
                    }else{
                        this.count_erroe +=1
                        if(this.count_erroe == 6){
                            this.false_show = true
                            this.$notify.info({
                                title: '接收結果',
                                message: '接收到病毒入侵，三秒鐘後即將自動退出',
                                dangerouslyUseHTMLString:true
                            });
                            setTimeout(() => {
                                    localStorage.removeItem("userName")
                                    localStorage.removeItem("question")
                                    window.location.href = "/tingandcody/web_ting/index.html";
                                    // window.location.href = "/index.html";
                                }, 3000);
                        }else{
                            this.$notify.info({
                                title: '接收結果',
                                message: '這這答案不對喔 (ᗒᗣᗕ)՞' + '<br/>'+
                                         '累積錯誤:' + this.count_erroe,
                                dangerouslyUseHTMLString:true
                            });
                        }
                    }
                    break
                case 3:
                    if(answer){
                        this.questiondata = '一起進入專屬於我們的世界吧σ(≧ε≦ｏ)'
                        this.buuton_status = true
                        this.$notify.info({
                            title: '接收結果',
                            message: '我也願意做你的男朋友!!'
                        });
                        this.count_erroe = 0
                        this.next_or_return = '進入'
                        localStorage.removeItem("question")
                        this.dialogVisible = false
                    }else{
                        this.count_erroe +=1
                        if(this.count_erroe == 6){
                            this.questiondata = '再給你最後一次機會٩(๑❛ᴗ❛๑)۶'
                            this.buuton_status = true
                            this.$notify.info({
                                title: '接收結果',
                                message: '最後詢問!!'
                            });
                            this.count_erroe = 0
                            this.next_or_return = '返回'
                        }else{
                            this.$notify.info({
                                title: '接收結果',
                                message: '這這答案不行喔 (ᗒᗣᗕ)՞' + '<br/>'+
                                         '累積錯誤:' + this.count_erroe,
                                dangerouslyUseHTMLString:true
                            });
                        }
                    }
                    break
                case 4:
                    if(answer){
                        this.questiondata = '一起進入專屬於我們的世界吧σ(≧ε≦ｏ)'
                        this.buuton_status = true
                        this.$notify.info({
                            title: '接收結果',
                            message: '我也願意做你的男朋友!!'
                        });
                        this.count_erroe = 0
                        this.next_or_return = '進入'
                        localStorage.removeItem("question")
                        this.dialogVisible = false
                    }else{
                        this.questiondata = '一起進入專屬於我們的世界吧σ(≧ε≦ｏ)'
                        this.buuton_status = true
                        this.$notify.info({
                            title: '接收結果',
                            message: '我也願意做你的男朋友!!'
                        });
                        this.count_erroe = 0
                        this.next_or_return = '進入'
                        localStorage.removeItem("question")
                        this.dialogVisible = false
                    }

            }
        },

        next_question(){
            this.question_sort += 1
            this.setting_questuins();
            this.buuton_status = false
        },

        //開啟menu
        handleOpen(key, keyPath){
           console.log(key);

        },

        //關閉Menu
        handleClose(key, keyPath){
            console.log(key);
        },

        //更改音樂狀態
        change_music(){
            if(this.music_status){
                this.music_status = false
                this.srcdata = 'https://www.youtube.com/embed/NnbGla3GZrg?autoplay=0&mute=0&loop=1'
            }else{
                this.music_status = true
                this.srcdata = 'https://www.youtube.com/embed/NnbGla3GZrg?autoplay=1&mute=0&loop=1'
            }
        },

        //執行
        excute(){
            this.loading = true
            //產生個隨機數字
            let random_value = Math.ceil(Math.random()*1000)
            setTimeout(() => {
                // console.log(random_value);
                this.$notify.closeAll()
                if(random_value < 800){
                    this.show_status = 0
                    this.$notify.info({
                        title: '執行錯誤',
                        message: '真可惜，這次執行錯誤了(//●⁰౪⁰●)//加油' +'<br/>'+ '可能不夠想我喔 ༼ つ◕(oo)◕༽つ',
                        dangerouslyUseHTMLString:true,

                    });
                }else{
                    this.show_status = 1
                    this.$notify.info({
                        title: '執行成功',
                        message: 'YA 成功瞜~這次戀愛分數為:' + random_value
                    });
                }
                this.loading = false
            }, 2000);
        }
    }

})


