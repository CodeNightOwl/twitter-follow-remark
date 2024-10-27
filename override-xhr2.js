//2024年10月27日23:00:28  owl
function draw(k, v) {
    k='共同关注的人数为:'+k
    // console.log('开始绘制')
    window.draw_msg = draw
    // 找到匹配的元素
    var targetElement = document.querySelector('[style*="position: relative"]')
    if (targetElement) {
        // 获取第一级子级div
        var childDivs = targetElement.children;
        // console.log(childDivs.length)
        // 循环遍历每个div
        Array.from(childDivs).forEach(function (div) {
            // 检查并移除已存在的canvas元素
            // var existingCanvas = div.querySelector("canvas");
            // if (existingCanvas && div.contains(existingCanvas)) {
            //     div.removeChild(existingCanvas);
            // }

            // 创建一个新的canvas元素
            var canvas = document.createElement("canvas");
            canvas.id = "myMsg";
            canvas.width = 250;
            canvas.height = 20;
            canvas.style.backgroundColor = "rgba(255, 255, 0, 0.6)"; // 设置背景色为半透明的黄色
            canvas.style.border = "0px solid black";
            canvas.style.display = "block";
            canvas.style.position = "fixed";
            canvas.style.top = "0";
            canvas.style.left = "330px";
            canvas.style.zIndex = 9999;
            canvas.style.pointerEvents = "none";

            // 将新的canvas添加到div中
            div.appendChild(canvas);

            // 获取绘图上下文
            var ctx = canvas.getContext("2d");

            // 清除canvas内容(可选，确保没有残留图像)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 设置文本颜色和字体
            ctx.fillStyle = "red"; // 设置文本颜色为红色
            ctx.font = "16px Arial";
            ctx.fillStyle = "green"; // 设置文本颜色为绿色

            ctx.fillText(k, 10, 20); // 第一个参数是文本，第二个和第三个参数是文本的起始坐标
        });
    }
}


function getFollows(friend_id, ct0, auth_token, guest_id,user_name) {
    var cookies = {
        'twid': guest_id,
        'auth_token': auth_token,
        'ct0': ct0
    };

    var headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
        'priority': 'u=1, i',
        'referer': 'https://x.com/home',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Microsoft Edge";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
        'x-client-transaction-id': 'lrkTV2XWOK61wlp9Go77V90aK96PqpeBIpTUYaqppvEvni2cTEDf4OViHRlF5BYEjhXFWJTx8qJR/wYQyYP5BMNdscQxlQ',
        'x-client-uuid': '8a9c8a50-f1aa-41e2-a127-4a23af697bf6',
        'x-csrf-token': ct0
    };

    var params = {
        'include_profile_interstitial_type': '1',
        'include_blocking': '1',
        'include_blocked_by': '1',
        'include_followed_by': '1',
        'include_want_retweets': '1',
        'include_mute_edge': '1',
        'include_can_dm': '1',
        'include_can_media_tag': '1',
        'include_ext_is_blue_verified': '1',
        'include_ext_verified_type': '1',
        'include_ext_profile_image_shape': '1',
        'skip_status': '1',
        'cursor': '-1',
        'user_id': friend_id,
        'count': '13',
        'with_total_count': 'true'
    };

    fetch('https://x.com/i/api/1.1/friends/following/list.json?' + new URLSearchParams(params), {
        method: 'GET',
        headers: headers,
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data =>{
            draw(data["total_count"], user_name)
        });
}

// var ret = getFollows('1232187552527876096');
// var users = ret["users"];
// for (var i = 0; i < users.length; i++) {
//     console.log(users[i]["name"]);
// }
// console.log('共同关注的人数为:', ret["total_count"]);



// 获取指定的 cookie
function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}


function showFollowersDialog() {
    // 获取数据
    let friendsData = JSON.parse(sessionStorage.getItem('friends'));
    // 通过调用 getCookie 方法获取指定的 cookie
    const auth_token = getCookie("auth_token");
    console.log(auth_token);
    const guest_id = getCookie("guest_id");
    // console.log(guest_id);get_recent(auth_token)
    const ct0 = getCookie("ct0");
    console.log(11111, friendsData)
    for (let i in friendsData) {
            user_name=friendsData[i]['user_name']
            remark=friendsData[i]['remark']
            friend_id=friendsData[i]['friend_id']
            getFollows(friend_id, ct0, auth_token, guest_id,user_name);

    }
    return

}



var XHR = XMLHttpRequest.prototype
var open1 = XHR.open;
var send1 = XHR.send;
XHR.send = function (postData) {
    this['hookQuery'] = postData
    return send1.apply(this, arguments);
}

XHR.open = function (method, url) {
    this._method = method;
    this._url = url;
    console.log('request网址:', url)
    this.addEventListener("load", function () {
        if (this._url.startsWith('https://x.com/i/api/graphql')) {
            const responseData = JSON.parse(this.responseText);
            if (responseData == undefined) {
                return
            }
            // console.log('返回数据:',responseData)
            let friends = responseData.data.search_by_raw_query.search_timeline.timeline.instructions[0].entries
            if (friends == undefined) {
                return
            }
            // console.log(frinds)
            let friendsArray = JSON.parse(sessionStorage.getItem('friends')) || [];
            for (let i = 0; i < friends.length; i++) {
                try {
                    let user_name = friends[i].content.itemContent.tweet_results.result.core.user_results.result.legacy.name
                    let friend_id = friends[i].content.itemContent.tweet_results.result.core.user_results.result.rest_id
                    friendsArray.push({ "user_name": user_name, "friend_id": friend_id,"remark": '3333333' });

                }
                catch (error) {
                    // console.log('循环错误', error);
                }
            }
            console.log('users:-----------', friends)
            sessionStorage.setItem('friends', JSON.stringify(friendsArray));
            showFollowersDialog()
            // // 在请求前获取之前存储在 localStorage 中的数据
            // if(localStorage.getItem('frinds')) {
            //     window.frinds = JSON.parse(localStorage.getItem('frinds'));
            // } else {
            //     window.frinds = {};
            // }
            // window.postMessage({ type: "FROM_PAGE", data: { action: "showFollowersDialog", friends: frinds } }, "*");
        }
        // window.postMessage({

        // }, "*")
    })
    return open1.apply(this, arguments)
}


localStorage.setItem('friends', JSON.stringify([{1111: 2222},[3333,4455]]));