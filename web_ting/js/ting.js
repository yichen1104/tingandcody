ELEMENT.locale(ELEMENT.lang.zhTW);
import {content} from './public_paramater.js';
// content = require('./public_paramater');
var b64pad = "";
new Vue({
    el: '#web',
    // 資料
    data: function () {
        return {
            username:'怡婷',
            password:'',
            store_erroe:0,
            pass_size:8,
        }
    },


    mounted: function () {

        //鼠標監控
        // that = this
        this.$nextTick(function(){
            let body = document.body;
            body.addEventListener('keypress', (event)=>{
                if (event.key === 'Enter') {
                  event.preventDefault();
                  this.user_login();
                }
            })
            body.addEventListener('click', function (e) {
                // console.log("點選");
                let x = e.pageX;
                let y = e.pageY; //当前坐标
                let randContent = Math.ceil(Math.random() * (content).length);
                let text = new Text(x, y, randContent);
                let span = document.createElement('span')
                span.style.color = text.getRandom();
                text.create(span);
                setTimeout(function () {
                    text.out(span)
                }, 1900)
            })

            function Text(x, y, rand) {
                this.x = x;
                this.y = y;
                this.rand = rand;
            }

            Text.prototype.create = function (_this) {
                let body = document.body;
                _this.innerHTML = content[this.rand - 1];
                _this.className = 'text'
                _this.style.top = this.y - 20 + 'px'
                _this.style.left = this.x - 50 + 'px'
                _this.style.animation = 'remove 2s'
                body.appendChild(_this);
                let i = 0
                setInterval(() => {
                    _this.style.top = this.y - 20 - i + 'px'
                    i++
                }, 10);
            }
            Text.prototype.out = function (_this) {
                _this.remove()
            }
            //设置随机颜色
            Text.prototype.getRandom = function () {
                let allType = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f'; //16进制颜色
                let allTypeArr = allType.split(','); //通过','分割为数组
                let color = '#';
                for (var i = 0; i < 6; i++) {
                    //随机生成一个0-16的数
                    var random = parseInt(Math.random() * allTypeArr.length);
                    color += allTypeArr[random];
                }
                return color; //返回随机生成的颜色
            }

            this.onWindowload();
        })

    },

    methods: {
        //網頁載入
        onWindowload(){
        },

        //使用者登入
        user_login(){
            // console.log(this.username);
            // console.log(this.password);
            //檢查密碼是否為空值
            if(this.password == ''){
                this.$notify.closeAll()
                this.store_erroe += 1;
                //累積五次錯誤
                if(this.store_erroe == 5){
                    this.$notify.info({
                        title: '密碼提示',
                        message: '生日相關(⁎˃ᆺ˂)',
                        dangerouslyUseHTMLString:true,
                        // customClass:'customClassNotify'
                    });
                    return
                }else if(this.store_erroe == 10){
                    this.$notify.info({
                        title: '密碼提示',
                        message: '八位數，夠明顯了吧٩(✿∂‿∂✿)۶',
                        dangerouslyUseHTMLString:true,
                        // customClass:'customClassNotify'
                    });
                    return
                }else{
                    this.$notify({
                        title: 'NoNo',
                        message: '密碼怎麼可能是空的呢(╬ Ò ‸ Ó)' + '</br>' + '累積錯誤: '+this.store_erroe,
                        type: 'warning',
                        dangerouslyUseHTMLString:true,
                        // customClass:'customClassNotify'
                    });
                    return
                }
            }


            //密碼儲存
            let store_password = 'JFnnPCq0hZoOcWx3vKMxTaiGBis'
            if(this.b64_sha1(this.password) == store_password){
                //正確
                // localStorage.setItem("loginstatus", true)
                // window.location.href = "/page_1.html";
            }else{
                this.$notify.close()
                if(this.store_erroe == 5){
                    this.$notify.info({
                        title: '密碼提示',
                        message: '生日相關(⁎˃ᆺ˂)',
                        dangerouslyUseHTMLString:true,
                        // customClass:'customClassNotify'
                    });
                    return
                }else if(this.store_erroe == 10){
                    this.$notify.info({
                        title: '密碼提示',
                        message: '八位數，夠明顯了吧٩(✿∂‿∂✿)۶',
                        dangerouslyUseHTMLString:true,
                        // customClass:'customClassNotify'
                    });
                    return
                }else{
                    this.store_erroe += 1;
                    this.$notify({
                        title: 'NoNo',
                        message: '密碼錯誤喔!!再猜猜' + '</br>' + '累積錯誤: '+this.store_erroe,
                        type: 'warning',
                        dangerouslyUseHTMLString:true,
                        // customClass:'customClassNotify'
                    });
                    return
                }
            }
        },

        //加密作業
        b64_sha1(s) {  
            return this.binb2b64(this.core_sha1(this.str2binb(s), s.length * this.pass_size));  
        },
        binb2b64(binarray) {  
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
            var str = "";  
            for (var i = 0; i < binarray.length * 4; i += 3) {  
                var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);  
                for (var j = 0; j < 4; j++) {  
                    if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;  
                    else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);  
                }  
            }  
            return str;  
        },
        core_sha1(x, len) {  
            x[len >> 5] |= 0x80 << (24 - len % 32);  
            x[((len + 64 >> 9) << 4) + 15] = len;  
          
            var w = Array(80);  
            var a = 1732584193;  
            var b = -271733879;  
            var c = -1732584194;  
            var d = 271733878;  
            var e = -1009589776;  
          
            for (var i = 0; i < x.length; i += 16) {  
                var olda = a;  
                var oldb = b;  
                var oldc = c;  
                var oldd = d;  
                var olde = e;  
          
                for (var j = 0; j < 80; j++) {  
                    if (j < 16) w[j] = x[i + j];  
                    else w[j] = this.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);  
                    var t = this.safe_add(this.safe_add(this.rol(a, 5), this.sha1_ft(j, b, c, d)), this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));  
                    e = d;  
                    d = c;  
                    c = this.rol(b, 30);  
                    b = a;  
                    a = t;  
                }  
          
                a = this.safe_add(a, olda);  
                b = this.safe_add(b, oldb);  
                c = this.safe_add(c, oldc);  
                d = this.safe_add(d, oldd);  
                e = this.safe_add(e, olde);  
            }  
            return Array(a, b, c, d, e);  
        },
        str2binb(str) {  
            var bin = Array();  
            var mask = (1 << this.pass_size) - 1;  
            for (var i = 0; i < str.length * this.pass_size; i += this.pass_size)  
            bin[i >> 5] |= (str.charCodeAt(i / this.pass_size) & mask) << (24 - i % 32);  
            return bin;  
        },
        safe_add(x, y) {  
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);  
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);  
            return (msw << 16) | (lsw & 0xFFFF);  
        },
        rol(num, cnt) {  
            return (num << cnt) | (num >>> (32 - cnt));  
        },
        sha1_ft(t, b, c, d) {  
            if (t < 20) return (b & c) | ((~b) & d);  
            if (t < 40) return b ^ c ^ d;  
            if (t < 60) return (b & c) | (b & d) | (c & d);  
            return b ^ c ^ d;  
        },
        sha1_kt(t) {  
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;  
        } 
        

        
    },


})