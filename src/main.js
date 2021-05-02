let $addButton = $('.addButton')
let $lastLi = $addButton.find('li.last')
let $siteList = $('.siteList')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const HashMap = xObject || [
  {logo:'Y', url:'https://www.youtube.com'},
  {logo:'B', url:'https://www.bilibili.com'}
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
  .replace('http://', '')
  .replace('www.', '')
  .replace(/\/.*/,'')
}
const render = () => {
  HashMap.forEach((node,index) => {
    console.log(index);
    const $li = $(`<li>
    <a href="${node.url}">
    <div class="site">
      <div class="logo">${node.logo[0]}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class="close">
      <svg class="icon" >
    <use xlink:href="#icon-close"></use>
</svg>
</div>
    </div>
  </a>
  </li>`).insertBefore($addButton)
  $li.on('click', () => {
    window.open(node.url)
  })
  $li.on('click', '.close', (e) => {
    e.stopPropagation() // 阻止冒泡
    hashMap.splice(index, 1)
    render()
  })
  })
}
render()
$('.addButton').on('click', () => {
  let url = window.prompt('Please input the website')
  if(url.indexOf('http') !== 0){
    url = 'https://' + url
  }
  HashMap.push(
    {logo:url[0],
      url:url
    }
  );
  $siteList.find('li:not(:last-child)').remove()
  render()
});

window.onbeforeunload = () => {
  const string = JSON.stringify(HashMap)
  localStorage.setItem('x',string)
}
