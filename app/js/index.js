var titleName = "233" //主页标题
var Options = [ //侧标工具栏选项的内容
    { text: "123", url: "./htmls/123.html" } //每一个代表一个<li></li>
]
var urls = Options[0].url //存储选项卡对应的网址链接


//以下为绑定组件
const title = new Vue({
    el:"#title",
    data: {
        title: titleName
    }
})
const options = new Vue({
    el:"#list",
    data: {
        opts: Options
    },
    methods: {
        refreshPage: () => {
            document.getElementById("displayOpt").src = urls
        }
    }
})
// const displayOptions = new Vue({
//     el:"#displayOpt",
//     methods: {
//         refreshPage: () => {
//             document.getElementById("displayOpt").src = urls
//         }
//     }
// })