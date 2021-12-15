const url = '';
const chatArea = $('#chatArea')
const loginArea = $('#loginArea')
const message = $('#message')
const myChatList = $('#myChatList')
const userList = $('#userList')
const inputName = $('#inputName')
const iconList = $('#iconList')
const stampList = $('#stampList')
const userName = $('.userName')
const checkIcon = $('input[name=icon]:checked')
const FADE_TIME = 500
const STAMP_WIDTH = 150
const IMAGE_WIDTH = 500
let user = {}
let users = {}

$(() => {
    imagePath = (fileName) => { return 'images/' + fileName }

    addMessage = (value) => {
        if (!value) return
        let messageElement = $('<small>').addClass('text-muted pt-2 pb-2').text(value)
        myChatList.prepend(messageElement)
    }
    updateUserList = () => {
        if (!users) return
        userList.html('')
        $.each(users, (key, user) => {
            let img = $('<img>').attr({ src: imagePath(user.icon), class: 'icon' })
            let li = $('<li>').addClass('list-group-item').append(img).append(user.name)
            userList.append(li)
        })
    }
    createIcons = () => {
        const icons = [...Array(6).keys()].map(i => `${++i}.png`)
        icons.forEach((icon, index) => {
            index++

            let id = 'icon_' + index
            let label = $('<label>').attr({ for: id })
            let input = $('<input>').attr({ id: id, name: 'icon', type: 'radio', value: icon })
            if (index == 1) input.attr({ checked: 'checked' })
            let img = $('<img>').attr({ src: imagePath(icon), class: 'icon' })

            label.append([input, img])
            iconList.append(label)
        })
    }
    createStamps = () => {
        const stamps = [...Array(6).keys()].map(i => `stamp${++i}.png`)
        stamps.forEach((stamp, index) => {
            index++
            let imageId = 'stamp_' + index
            let a = $('<a>').attr({ stamp: imageId, class: 'uploadStamp' })
            let img = $('<img>').attr({ id: imageId, src: imagePath(stamp), class: 'stamp' })
            a.append(img)
            stampList.append(a)
        })
    }
    createHeaderElement = (data, isMyself) => {
        let dateStyle = (isMyself) ? 'p-3 text-primary' : 'p-1 text-dark'
        let userStyle = (isMyself) ? 'text-end' : 'text-start'
        let img = $('<img>').attr({ src: imagePath(data.user.icon), class: 'icon' })
        let userElement = $('<small>').addClass(dateStyle).append(img).append(data.user.name)
        let headerElement = $('<p>').addClass(userStyle).append([userElement])
        return headerElement
    }
    createFooterElement = (data, isMyself) => {
        const date_string = new Date(data.datetime).toLocaleString('ja-JP')
        let dateStyle = (isMyself) ? 'text-end' : 'text-start'
        let dateElement = $('<small>').addClass('text-muted').html(date_string)
        let footerElement = $('<div>').addClass(dateStyle).append(dateElement)
        return footerElement
    }
    createMessageElement = (data, isMyself) => {
        let chatStyle = (isMyself) ? 'p-3 balloon-right' : 'p-3 balloon-left'
        let message = data.message.replace(/\r?\n/g, '<br>')
        let messageElement = $('<div>').addClass(chatStyle).html(message)
        return messageElement
    }
    createChatMessage = (data) => {
        let isMyself = hasToken(data)
        let headerElement = createHeaderElement(data, isMyself)
        let messageElement = createMessageElement(data, isMyself)
        let footerElement = createFooterElement(data, isMyself)
        let chatElement = $('<div>').hide().append([headerElement, messageElement, footerElement])

        myChatList.prepend(chatElement)
        chatElement.fadeIn(FADE_TIME)
    }
    createChatImage = (data, params) => {
        let isMyself = hasToken(data)
        let headerElement = createHeaderElement(data, isMyself)
        let img = $('<img>').attr('src', data.image).attr('width', params.width)
        let messageElement = $('<div>').addClass('text-center').append(img)
        let footerElement = createFooterElement(data, isMyself)
        let chatElement = $('<div>').hide().append([headerElement, messageElement, footerElement])

        myChatList.prepend(chatElement)
        chatElement.fadeIn(FADE_TIME)
    }
    hasToken = (data) => {
        return (data.user.token == user.token)
    }


})