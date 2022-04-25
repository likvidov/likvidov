const DATA = {
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20
}

let whichSite, desktopTemplates, adapt;

while (whichSite = prompt(`Какой сайт вам нужен? Введите цифру! 
0 - Одностраничный (лендинг)
1 - Многостраничный (корпоративный)
2 - Интернет-магазин    
`)) {
    if (Number(whichSite) === 0 || Number(whichSite) === 1 || Number(whichSite) === 2) {
        break;
    } else {
        alert('Было введено не число, попробуйте еще раз');
        continue;
    }
}

desktopTemplates = confirm('Нужно ли разрабатывать дизайн сайта?'); 
adapt = confirm('Адаптировать сайт под смартфоны и планшеты?');

function priceCalculation(elem, elem1, elem2){
    let result = DATA.price[elem];
    if(elem1) {
        result = result + ((DATA.desktopTemplates[elem] * result) / 100);
    }

    if(elem2) {
        result = result + ((result * adapt) /100) ;
    }

    return console.log(result);
}

priceCalculation(whichSite, desktopTemplates, adapt);