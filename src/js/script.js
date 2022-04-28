new WOW().init();

const DATA = {
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    time: [3, 5, 7]
}

let whichSite = document.querySelector('#select1'), 
    desktopTemplates = document.querySelector('#select2'), 
    adapt = document.querySelector('#select3'),
    formCalculate = document.querySelector('.form-calculate'),
    time = document.querySelector('.costs form p span.time'),
    cost = document.querySelector('.costs form p span.cost');

var modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})  

function priceCalculation(){
    let ws = whichSite.options[whichSite.selectedIndex].value,
        dt = desktopTemplates.options[desktopTemplates.selectedIndex].value,
        ad = adapt.options[adapt.selectedIndex].value;

    let result = DATA.price[ws];
    
    if(dt == 1) {
        result = result + ((DATA.desktopTemplates[ws] * result) / 100);
    }

    if(ad == 1) {
        result = result + ((result * DATA.adapt) /100) ;
    }

    cost.textContent = result;
    time.textContent = DATA.time[ws];
}

formCalculate.addEventListener('change', priceCalculation);

function number_to(id,from,to,duration) {
    var element = document.getElementById(id);
    var start = new Date().getTime();
    setTimeout(function() {
    var now = (new Date().getTime()) - start;
    var progress = now / duration;
    var result = Math.floor((to - from) * progress + from);
    element.innerHTML = progress < 1 ? result : to;
    if (progress < 1) setTimeout(arguments.callee);
    }, 10);
}

$(document).ready(() => {
    var $statistics = $('.statistics');
    var $footer = $('footer');
    let counter = 0;
    let counterFooter = 0;

    $(window).scroll(() => {
        let scrollDistance = $(window).scrollTop();
        var scroll = $(window).scrollTop() + $(window).height();
        var offset = $statistics.offset().top;
        var offsetFooter = $footer.offset().top + 60;
 
        if (scroll > offset && counter == 0) {
            number_to('count1', 0, 120, 2000);
            number_to('count2', 0, 4600, 2000);
            number_to('count3', 0, 340, 2000);
            number_to('count4', 0, 23, 2000);
            counter = 1;
        }

        if (scroll > offsetFooter && counterFooter == 0) {
            modal.show();
            counterFooter = 1;
        }

        $("section").each((i, el) => {
            if($(el).offset().top + $("nav").outerHeight() <= scrollDistance) {
                $("nav a").each((i, el) => {
                    if($(el).hasClass("activation")) {
                        $(el).removeClass("activation");
                    }
                });
                $('nav li:eq(' + i + ')').find('a').addClass('activation');
            }            
        })
    })

    $('.popup-link').magnificPopup({
        type: 'image'
    });

    $('form').submit((e) => {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "php/mail.php",
            data: $(this).serialize()
        }).done(() => {
            $(this).find("input").val("");
            alert("Успешно отправлено!");
            $("form").trigger("reset");
            modal.hide();
        });
        return false;
    });
})


