const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                        <svg class="icon">
                         <use xlink:href="#icon-close1"></use>
                        </svg>
                        </div>
                    </div>
                
            </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  if(e.target.tagName.toLowerCase()==='input'){
    return
  }
  const { key } = e; //等价于const key =e.key
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});


// function pushbtn(event) {
//   var keycode = event.keyCode,
//     key = String.fromCharCode(keycode),

//     // finding the element on which the event
//     // was originally fired:
//     source = event.target,

//     // an Array of element-types upon which
//     // the function should not fire (to prevent
//     // interfering needlessly with the UI and
//     // user-expectations):
//     exclude = ['input', 'textarea'];

//   // finding the element-type (tagName) of the element
//   // upon which the event was fired, converting it to
//   // a lower-case string and then looking in the Array
//   // of excluded elements to see if the element is held
//   // within (-1 indicates the string was not found within
//   // the Array):
//   if (exclude.indexOf(source.tagName.toLowerCase()) === -1) {
//     // console.log('You pressed ' + key + ' (keyCode: ' + keycode + ').');
//     $(document).on("keypress", (e) => {
//     const { key } = e; //等价于const key =e.key
//     for (let i = 0; i < hashMap.length; i++) {
//       if (hashMap[i].logo.toLowerCase() === key) {
//       window.open(hashMap[i].url);
//     }
//   }
// });
//   }
//   return;
// }

// document.addEventListener('keypress', pushbtn);
