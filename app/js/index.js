var titleName = "concept-music-desktop" //主页标题
var Options = [ //侧标工具栏选项的内容
    //{ text: "123", url: "./htmls/123.html" }, //每一个代表一个<li></li>

]

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
        refreshPage: (url) => {
            document.getElementById("displayOpt").src = url;
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