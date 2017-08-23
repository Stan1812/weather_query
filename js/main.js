const head = document.head,
    today = document.querySelector('#today_wea'),
    future = document.querySelector('#future_weather'),
    container = document.querySelector('#container'),
    script = document.createElement('script');

today_index = {
    date_y: today.querySelector('.date_y'),
    week: today.querySelector('.week'),
    temperature: today.querySelector('.temperature'),
    allDayTemp: today.querySelector('.AllDayTemp'),
    weather: today.querySelector('.weather'),
    wind_dire: today.querySelector('.wind_direction'),
    wind_stre: today.querySelector('.wind_strength'),
    icon: today.querySelector('i')
}

container_tips = {
    tips: container.querySelector('#tip')
}

future_index = {
    dates: future.querySelectorAll('#date'),
    icons: future.querySelectorAll('i'),
    temperatures: future.querySelectorAll('#fu_temp'),
    weathers: future.querySelectorAll('#future_weather')
}
length = future_index.dates.length

head.appendChild(script)

function getJSON(url) {
    script.src = url
}

function dataUpdating(json) {
    //test
    console.log(json)
    console.log(json.resultcode, json.reason)

    var result = json.result
        // 今日信息更新
    todayDataUpdating(result)
        //tips更新
    tipsUpDating(result)
        // 未来三日
    futureDataUpdating(result)
}

function todayDataUpdating(result) {
    today_index.date_y.innerHTML = result.today.date_y
    today_index.week.innerHTML = result.today.week
    today_index.temperature.innerHTML = result.sk.temp + '℃'
    today_index.allDayTemp.innerHTML = result.today.temperature
    today_index.weather.innerHTML = result.today.weather
    today_index.wind_dire.innerHTML = result.sk.wind_direction
    today_index.wind_stre.innerHTML = result.sk.wind_strength
    setTodayIcon(result.today.weather_id.fa)
}


function tipsUpDating(result) {
    container_tips.tips.innerHTML = result.today.dressing_advice
}

function futureDataUpdating(result) {
    for (var i = 0; i < length; i++) {
        var _date = result
            .future[i + 1]
            .date
            .split('')
            .splice(4, 2)
            .join('') + '月' + result
            .future[i + 1]
            .date
            .split('')
            .splice(6, 2)
            .join('') + '日'
        future_index.dates[i].innerHTML = _date
        future_index.weathers[i].innerHTML = result.future[i + 1].weather
        future_index.temperatures[i].innerHTML = result.future[i + 1].temperature
        setFutureIcon(result.future[i + 1].weather_id.fa, i)
    }
}

function weatherType(id) {
    var wid = Number(id) || 0
    switch (wid) {
        case 2:
            wid = wid - 1
            break
        case 5:
            wid = wid - 1
            break
        case 21:
            wid = wid - 14
            break
        case 22:
            wid = wid - 14
            break
        case 23:
            wid = wid - 14
            break
        case 24:
            wid = wid - 14
            break
        case 25:
            wid = wid - 14
            break
        case 26:
            wid = wid - 12
            break
        case 27:
            wid = wid - 12
            break
        case 28:
            wid = wid - 12
            break
        case 20:
            wid = 20
            break
        case 31:
            wid = 20
            break
        default:
            wid = wid
    }
    return wid
}


function setTodayIcon(id) {
    var wid = weatherType(id)
    today_index.icon.className = 'weather_pic-' + wid
}

function setFutureIcon(id, i) {
    var wid = weatherType(id)
    future_index.icons[i].className = 'weather_pic-' + wid
}

var queryBtn = document.querySelector('#queryBtn');
var query_info = document.querySelector('#query_in');

queryBtn.onclick = function() {
    console.log('1')
    console.log(query_info.value)
    var city = query_info.value;
    console.log(city)
    var url = 'http://v.juhe.cn/weather/index?format=2&cityname=' + city + '&key=849d0def77dc141aa14db254924bca39&callback=dataUpdating'
    getJSON(url)
}

/*

 *根据GPS坐标获取天气
window.onload=function(){
  navigator.geolocation.getCurrentPosition(function(position) {
   var lon=position.coords.latitude
   var lat=position.coords.longitude)
   var url = 'http://v.juhe.cn/weather/index?format=2&key=849d0def77dc141aa14db254924bca39&callback=dataUpdating'&lon='+lon+'&lat='+lat+' 
    getJSON(url);
  });
}
 */