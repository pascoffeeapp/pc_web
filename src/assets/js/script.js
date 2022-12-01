document.querySelector('#toggle').onclick = () => {
    let el = document.querySelector('#wrapper').classList;
    if (el.contains('hide')) {
        el.remove('hide')
    }
    else {
        el.add('hide')
    }
}