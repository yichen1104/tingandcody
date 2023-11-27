ELEMENT.locale(ELEMENT.lang.zhTW);
new Vue({
    el: '#web',
    // 資料
    data: function () {
        return {
            srcdata:'https://www.youtube.com/embed/NnbGla3GZrg?mute=0&loop=1',
            music_status:true,
            show_status:1,
            loading:false,
            count_startdate:0,
        }
    },

    mounted: function () {
        //頁面預先初始化
        this.onWindowload();
    },

    methods: {
        //頁面資訊載入
        onWindowload(){
            //檢查是否登入
            if(!localStorage.getItem("loginstatus")){
                window.location.href = "/index.html";
                return
            }

            //自動播放音樂
            this.change_music()

            //計算天數
            let today = new Date();
            let startday = new Date('2023/08/20')
            let count_day = today.getTime() - startday.getTime()
            // console.log(count_day);
            this.count_startdate = Math.floor(count_day/ (1000 * 3600 * 24));
        },
        //選擇Menu
        handselect(key, keyPath){
            console.log(key);
            switch (key) {
                case '1':
                    
                    break;
                case '2':
                    break;
                case '3':
                    //清除Session並登出
                    localStorage.removeItem("userName")
                    window.location.href = "/index.html";
                    break
                default:
                    break;
            }
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
                this.srcdata = 'https://www.youtube.com/embed/NnbGla3GZrg?autoplay=1&mute=0&loop=1'
            }else{
                this.music_status = true
                this.srcdata = 'https://www.youtube.com/embed/NnbGla3GZrg?mute=1&loop=1'
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
                    this.$notify.error({
                        title: '執行錯誤',
                        message: '真可惜，這次執行錯誤了(//●⁰౪⁰●)//加油' +'<br/>'+ '可能不夠想我喔 ༼ つ◕(oo)◕༽つ',
                        dangerouslyUseHTMLString:true,

                    });
                }else{
                    this.show_status = 1
                    this.$notify.error({
                        title: '執行成功',
                        message: 'YA 成功瞜~這次戀愛分數為:' + random_value
                    });
                }
                this.loading = false
            }, 2000);
        }
    }

})


