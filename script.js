document.addEventListener('DOMContentLoaded', function() {
    let app = document.querySelector('.app');
    let appStyle = getComputedStyle(app);
    if (app.innerHTML) return;
    printMetrical();
    //app.addEventListener('click', () => printMetrical())

    function printMetrical() {
        let string = null;
        for(let i=0; i<47; i++) {
            for (let j=0; j<57; j++) string += Math.random().toString(36).substr(2, 1);
            string += '<br>';
        }
        //app.innerHTML = string;
        setTimeout(()=>{
            let clientHeight = `height ${appStyle.height} + padding ${appStyle.padding} = clientHeight ${app.clientHeight}px - внутреняя высота`;
            let clientWidth = `width ${appStyle.width} + padding ${appStyle.padding} = clientWidth ${app.clientWidth}px - внутреняя ширина`;
            let offsetHeight = `height ${appStyle.height} + padding ${appStyle.padding} + border ${appStyle.border.slice(0,4)} = offsetHeight ${app.offsetHeight}px - внешняя высота, если добавляется скрол то +17px`;
            let offsetWidth = `width ${appStyle.width} + padding ${appStyle.padding} + border ${appStyle.border.slice(0,4)} = offsetWidth ${app.offsetWidth}px - внешняя ширина, если добавляется скрол то +17px`;
            let scrollTop = `scrollTop ${app.scrollTop}px`;
            let scrollLeft = `scrollLeft ${app.scrollLeft}px`;
            let clientTop = `borderTop ${appStyle.borderTop.slice(0,4)} = clientTop ${app.clientTop}px`;
            let clientLeft = `borderLeft ${appStyle.borderLeft.slice(0,4)} = clientLeft ${app.clientLeft}px`;
            let offsetTop = `[All content top] + marginTop ${appStyle.marginTop.slice(0,4)} = offsetTop ${app.offsetTop}px - в приделах родителя`;
            let offsetLeft = `[All content top] + marginLeft ${appStyle.marginTop.slice(0,4)} = offsetLeft ${app.offsetLeft}px - в приделах родителя`;
            let scrollWidth = `[content] + padding ${appStyle.padding.slice(0,4)} = scrollWidth ${app.scrollWidth}px`;
            let scrollHeight = `[content] + padding ${appStyle.padding.slice(0,4)} = scrollHeight ${app.scrollHeight}px`;
            let win = window.screenLeft;

            //app.scrollBy(0, 100); //прокрутить вниз на 100px
            //window.scrollBy(0, 100);
            //window.scrollTo(0, 100); //прокручивает внутри элемента от его верха на 100px
            let scrollTopWindow = document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset; //достаем текущую прокрутку страницы Top
            let scrollLeftWindow = document.documentElement.scrollLeft||document.body.scrollLeft||window.pageXOffset; //достаем текущую прокрутку страницы Left
            //                                    mozila                          chrome                edge
            alert (scrollTopWindow + " "+scrollLeftWindow); //текущая прокрутка окна

            let print = '<br>'+clientHeight+'<br>'+clientWidth+'<br>'+offsetHeight+'<br>'+offsetWidth+'<br>'+scrollTop+
                '<br>'+scrollLeft+'<br>'+clientTop+'<br>'+clientLeft+'<br>'+offsetTop+'<br>'+offsetLeft+'<br>'+scrollWidth+'<br>'+scrollHeight+
                '<br>'+win+'<br>'+scrollTopWindow+' текущая прокрутка она по Y'+'<br>'+scrollLeftWindow+' текущая прокрутка она по X';
            app.innerHTML += print;

            window.scrollBy(12, 12); //прокрутка на чило пикселей
            window.scrollTo(12, 12); //прокрутка к определенной точке
        }, 360);
    }
    window.addEventListener('click', ()=> {
        getBounding();
        scrollTo('.app2');
    });
    function getBounding() {
        let rect = app.getBoundingClientRect(); // показывает положение элемента в окне
        console.log('getBoundingClientRect.Top = ' + rect.top);
        console.log('getBoundingClientRect.Left = ' + rect.left);
        console.log('getBoundingClientRect.Width = ' + rect.width);
        console.log('getBoundingClientRect.Height = ' + rect.height);
    }

    function scrollTo(selector) {
        let elem = document.querySelector(selector);
        const SCROLL_STEP = 64;
        let direction = elem.getBoundingClientRect().top>0? 1 : -1;
        let interval = setInterval(()=>{
            window.scrollBy(0, SCROLL_STEP * direction);
            let sh = document.body.scrollHeight||document.documentElement.scrollHeight;
            let st = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
            if ((window.innerHeight+st >= sh && direction>0) || (st === 0 && direction<0)) {
                clearInterval(interval);
            }
            let top = elem.getBoundingClientRect().top;
            if(Math.abs(top)<SCROLL_STEP) {
                alert('stop1');
                clearInterval(interval);
                window.scrollBy(0, elem.getBoundingClientRect().top);
            }
        }, 16);
    }
})