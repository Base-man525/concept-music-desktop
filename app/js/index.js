
var titleName = "concept-music-desktop" //主页标题

var Options = [ //侧标工具栏选项的内容
    //{ text: "123", url: "./htmls/123.html" }, //每一个代表一个<li></li>
    { text:"settings", url:"./htmls/settings.html", title:"settings" },
    { text:"search", url:"./htmls/search.html", title:"search" },
    { text:"list", url:"./htmls/list.html", title:"list" },
    { text:"downloadList", url:"./htmls/downloadList.html", title:"download list" },
    { text:"rankingList", url:"./htmls/rankingList.html", title:"ranking list" }
]
function startSearch(keywords)
{
    document.getElementById("displayOpt").src = "./htmls/search.html";
    try {
        localSearch(keywords);
        // InternetSearch(keywords);
    } catch (error) {
        console.error(error);
    }
}

const requestAsPromise = (params) =>{
    return new Promise((res,rej)=>{
    $.ajax({
            ...params,
            success: res,
            error: rej,
        });
    }) 
}
const getDownloadJSON = async() =>{
    const data = await requestAsPromise({
        url: './data/data.json',
        type: "GET",
        dataType: "json",
    });
    return data.downloadPath;
}
var downloadPath = getDownloadJSON();//用户指定的下载音乐的文件夹路径
downloadPath.then((val)=>{
    downloadPath = val;
});

// function InternetSearch(keywords) //没想好怎么写
function localSearch(keywords) { //目前想法:先在本地匹配，若匹配不成功，则用接入的API在网络上寻找
    const fs = require('fs');
    var allFileNames =[];
    if(fs.existsSync(downloadPath)) {
        const files = fs.readdirSync(downloadPath);
        for(let i=0; i<files.length; i++) {
            var stats = fs.lstatSync(downloadPath+'/'+files[i]);
            if(stats.isDirectory())
                allFileNames = allFileNames.concat(downloadPath+'/'+files[i]);
            else
                allFileNames.push(files[i]);
        }
    }
    else
        console.warn(`指定的目录${downloadPath}不存在！`);
    return allFileNames;
    // var fso = new ActiveXObject("Scripting.FileSystemObject");
    // var fileFolder = fso.GetFolder(downloadPath); //paths指代用户指定的下载音乐的文件夹路径(绝对)(暂时只考虑Windows系统), 设想采用json读取到paths
    // folder_recursive(fileFolder, keywords);
    // function folder_recursive(folderGroup, keyword) { //遍历整个文件夹的文件及其子文件夹
    //     var needReturnObjects;
    //     var cnt=0;
    //     var files = folderGroup.getFiles();
    //     for(var i=0;i<files.length; i++) {
    //         var file = files[i];
    //         if(file instanceof Folder)
    //         {
    //             folder_recursive(file);
    //             continue;
    //         }
    //         //获取名称
    //         else if(file.name == keyword) needReturnObjects[++cnt]=file;
    //     }
    //     return needReturnObjects; //返回一个FILE数组
    // }
} /*此函数bug较多*/ 


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
        },
        changeTitle: (title) => {
            document.getElementById("title").innerHTML = title;
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