// 抽取tab对象
let that
class Tab {
    // 获取元素
    constructor(id) {
            that = this
            this.main = document.querySelector(id);
            this.lis = this.main.querySelectorAll('li')
            this.section = this.main.querySelectorAll('section')
            this.tabadd = this.main.querySelector('.tabadd')
            this.ul = this.main.querySelector('.fisrstnav ul:first-child')
            this.tabscon = this.main.querySelector('.tabscon')
            this.iconguanbi = this.main.querySelectorAll('.icon-guanbi')
            this.span = this.main.querySelectorAll('.fisrstnav li span:first-child')
            this.init()
        }
        // 初始化 页面加载就绑定元素
    init() {
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i
                this.lis[i].onclick = this.toggleTab
                this.iconguanbi[i].onclick = this.removeTab
                this.span[i].ondblclick = this.editTab
                this.section[i].ondblclick = this.editTab
            }
            this.tabadd.onclick = this.addTab

        }
        // 动态获取绑定元素
    updateNode() {
            this.lis = this.main.querySelectorAll('li')
            this.section = this.main.querySelectorAll('section')
            this.iconguanbi = this.main.querySelectorAll('.icon-guanbi')
            this.span = this.main.querySelectorAll('.fisrstnav li span:first-child')
            this.init()
        }
        // 1.切换功能模块
    toggleTab() {
            // 先清除所有样式，再添加
            that.clearClass()
            this.className = 'liactive'
            that.section[this.index].className = 'conactive'
        }
        // 封装一个清空样式函数更简洁
    clearClass() {
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = ''
                this.section[i].className = ''
            }
        }
        // 2.添加功能模块
    addTab() {
            that.clearClass()
            that.ul.insertAdjacentHTML('beforeend', '<li class="liactive"><span>测试</span><span class="iconfont icon-guanbi"></span></li>')
            that.tabscon.insertAdjacentHTML('beforeend', '<section class="conactive">测试3</section>')
                // 每次添加后重新获取绑定功能
            that.updateNode()
        }
        // 3.删除功能模块
    removeTab(e) {
            // 阻止冒泡防止删除键后出触发li点击事件
            e.stopPropagation();
            that.updateNode()
            let index = this.parentNode.index
            that.lis[index].remove()
            that.section[index].remove()

            // 当删除一个li，前面li选中
            // 当删除的是选中li以外的li，不执行选中代码
            if (document.querySelector('.liactive')) return
            index--
            // 当index为-1不会选触发
            that.lis[index] && that.lis[index].click()


        }
        // 4.修改功能模块
    editTab() {
        // 先拿原值
        let str = this.innerHTML
            // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        // 拿到文本框
        let input = this.children[0]
        input.value = str //将原文字赋值给文本框内容
        input.select(); //文本框里面的文字全选
        // 失焦或者回车时文本框里的值给span
        input.onblur = function() {
            // this指向input，父亲为span
            this.parentNode.innerHTML = this.value
        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // 自动调取事件
                this.blur()
            }
        }
    }
}

new Tab('#tab')