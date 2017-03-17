"use strict";

var svg = document.getElementById("wrapper"),
	widthOfSvg = 300, //ширина svg, 
	heightOfSvg = 300, //высота svg
	xmlnsOfSvg = 'http://www.w3.org/2000/svg', //для объявления пространства имен
	svgCenterX,
	svgCenterY,
	// для большого круга часов
	bigCircleForWatch, //большой круг для часов;
	bigCircleCX = 150, //сх большого круга
	bigCircleCY = 150, //су большого круга
	bigCircleRadius = 150, //r большого круга
	bigCircleColor = "#FCCA66", //цвет большого круга
	// для электронных часов
	svgChildElemForDigitalWatch, //создали переменную для электронных часов
	svgChildElemForDigitalWatchText,
	radiusForDigitalWatch = 70, // радиус (растояние) для электронных часов;

	radius = 120, // радиус (растояние)
	angleValue = 0, // угол
	distanceOfDigits = 30, // расстояние(в градусах) между цифрами на часах
	time = new Date(), //текущее время
	// для стрелок часов(час, минут, секунд)
	elemForArrowHours, // создаем переменную для стрелки часов
	elemForArrowHoursHeight = 50,
	elemForArrowHoursWidth = 9,
	elemForArrowMinutes, // создаем переменную для стрелки минут
	elemForArrowMinutesHeight = 110,
	elemForArrowMinutesWidth = 5,
	elemForArrowSeconds, // создаем переменную для стрелки секунд
	elemForArrowSecondsHeight = 135,
	elemForArrowSecondsWidth = 2,
	hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes()), //определяем по времени где должна быть стрелка часов
	minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds()), //определяем по времени где должна быть стрелка минут
	secondsDeg = 6 * time.getSeconds() - 6, //определяем по времени где должна быть стрелка секунд
	hourDigits = 12; //цифры часов (например 1,2,3,4,5,6,7,8,9,10,11,12)



svg.style.width = widthOfSvg;
svg.style.height = heightOfSvg;
svg.style.xmlns = xmlnsOfSvg;

// для большого круга часов 
bigCircleForWatch = document.createElementNS(xmlnsOfSvg, "circle");
bigCircleForWatch.setAttribute("cx", bigCircleCX);
bigCircleForWatch.setAttribute("cy", bigCircleCY);
bigCircleForWatch.setAttribute("r", bigCircleRadius);
bigCircleForWatch.setAttribute("fill", bigCircleColor);
svg.appendChild(bigCircleForWatch); //созданный большой круг для часов делаем дочерным элементом svg
// размер svg и его позиция относительно окна
svgCenterX = svg.getBoundingClientRect().left + svg.getBoundingClientRect().width / 2; //узнаем центр svg по X
svgCenterY = svg.getBoundingClientRect().top + svg.getBoundingClientRect().height / 2; //узнаем центр svg по Y

for (var i = 1; i <= hourDigits; i++) {
	var svgChildElem = document.createElementNS(xmlnsOfSvg, "circle"),// создаем кружочик для номеров часов
		svgChildElemText = document.createElementNS(xmlnsOfSvg, "text"),// создаем текст(т.е. цифры) для кружочков
		angle,
		smallCircleCX,
		smallCircleCY,
		smallCircleRadius = 20,
		smallCircleColor = "#48B382";

	angleValue += distanceOfDigits;
	angle = angleValue / 180 * Math.PI;

	smallCircleCX = Math.round(svgCenterX + radius * Math.sin(angle) - svg.getBoundingClientRect().left);
	smallCircleCY = Math.round(svgCenterY - radius * Math.cos(angle) - svg.getBoundingClientRect().top);

	// работа над кружочками
	svgChildElem.setAttribute("cx", smallCircleCX);
	svgChildElem.setAttribute("cy", smallCircleCY);
	svgChildElem.setAttribute("r", smallCircleRadius);
	svgChildElem.setAttribute("fill", smallCircleColor);
	svgChildElem = svg.appendChild(svgChildElem);

	// работа над тексток(т.е цифры)
	svgChildElemText.innerHTML = i;
	svgChildElemText.setAttribute("x", smallCircleCX);
	svgChildElemText.setAttribute("y", smallCircleCY);
	svgChildElemText.setAttribute("text-anchor", "middle");
	svgChildElemText.setAttribute("dominant-baseline", "central");
	svgChildElemText.style.fontSize = 20;
	svgChildElemText = svg.appendChild(svgChildElemText);
}


// для электронных часов
svgChildElemForDigitalWatch = document.createElementNS(xmlnsOfSvg, "rect");
svg.appendChild(svgChildElemForDigitalWatch);
svgChildElemForDigitalWatch.setAttribute("x", (svgCenterX - svgChildElemForDigitalWatch.getBoundingClientRect().width / 2) - svg.getBoundingClientRect().left);
svgChildElemForDigitalWatch.setAttribute("y", (svgCenterY - radiusForDigitalWatch) - svg.getBoundingClientRect().left);
svgChildElemForDigitalWatch.setAttribute("fill", "none");
svgChildElemForDigitalWatchText = document.createElementNS(xmlnsOfSvg, "text");
svgChildElemForDigitalWatchText.setAttribute("x", (svgCenterX - svgChildElemForDigitalWatch.getBoundingClientRect().width / 2) - svg.getBoundingClientRect().left);
svgChildElemForDigitalWatchText.setAttribute("y", (svgCenterY - radiusForDigitalWatch) - svg.getBoundingClientRect().top);
svgChildElemForDigitalWatchText.setAttribute("text-anchor", "middle");
svgChildElemForDigitalWatchText.setAttribute("dominant-baseline", "central");
svgChildElemForDigitalWatchText.style.fontSize = 25;
svgChildElemForDigitalWatchText = svg.appendChild(svgChildElemForDigitalWatchText);


// для стрелок часов
elemForArrowHours = document.createElementNS(xmlnsOfSvg, "line");
elemForArrowHours.setAttribute("x1", svgCenterX - svg.getBoundingClientRect().left);
elemForArrowHours.setAttribute("y1", svgCenterY - elemForArrowHoursHeight - svg.getBoundingClientRect().top);
elemForArrowHours.setAttribute("x2", svgCenterX - svg.getBoundingClientRect().left);
elemForArrowHours.setAttribute("y2", svgCenterY);
elemForArrowHours.setAttribute("stroke", "black");
elemForArrowHours.setAttribute("stroke-width", elemForArrowHoursWidth);
elemForArrowHours.setAttribute("stroke-linecap", "round");
svg.appendChild(elemForArrowHours);

// для стрелок минут
elemForArrowMinutes = document.createElementNS(xmlnsOfSvg, "line");
elemForArrowMinutes.setAttribute("x1", svgCenterX - svg.getBoundingClientRect().left);
elemForArrowMinutes.setAttribute("y1", svgCenterY - elemForArrowMinutesHeight - svg.getBoundingClientRect().top);
elemForArrowMinutes.setAttribute("x2", svgCenterX - svg.getBoundingClientRect().left);
elemForArrowMinutes.setAttribute("y2", svgCenterY);
elemForArrowMinutes.setAttribute("stroke", "black");
elemForArrowMinutes.setAttribute("stroke-width", elemForArrowMinutesWidth);
elemForArrowMinutes.setAttribute("stroke-linecap", "round");
svg.appendChild(elemForArrowMinutes);

// для стрелок секунд
elemForArrowSeconds = document.createElementNS(xmlnsOfSvg, "line");
elemForArrowSeconds.setAttribute("x1", svgCenterX - svg.getBoundingClientRect().left);
elemForArrowSeconds.setAttribute("y1", svgCenterY - elemForArrowSecondsHeight - svg.getBoundingClientRect().top);
elemForArrowSeconds.setAttribute("x2", svgCenterX - svg.getBoundingClientRect().left);
elemForArrowSeconds.setAttribute("y2", svgCenterY);
elemForArrowSeconds.setAttribute("stroke", "red");
elemForArrowSeconds.setAttribute("stroke-width", elemForArrowSecondsWidth);
elemForArrowSeconds.setAttribute("stroke-linecap", "round");
svg.appendChild(elemForArrowSeconds);


// определяем точку трансформации стрелок часов, минут, секунд по оси X и Y
elemForArrowHours.style.transformOrigin = "center 150px";
elemForArrowMinutes.style.transformOrigin = "center 150px";
elemForArrowSeconds.style.transformOrigin = "center 150px";

// функция для определения положение электронных часов и стрелок для часов, минут, секунд
function arrows() {
		// электронные часы
		var time = new Date(); //текущее время
	    svgChildElemForDigitalWatchText.innerHTML = time.toLocaleTimeString();
		// секундные стрелки
		secondsDeg += 6; //каждую секунду стрелка секунда будет двигать на 6 градусов
	    elemForArrowSeconds.style.transform = "rotate(" + secondsDeg + "deg)";
	    // минутныеные стрелки
	    minutesDeg += 6 * (1/60); //каждую секунду стрелка минута будет двигать на 6*(1/60) градусов
	    elemForArrowMinutes.style.transform = "rotate(" + minutesDeg + "deg)";
	    // часовые стрелки
	    hoursDeg += 6 * (1/360); //каждую секунду стрелка часа будет двигать на 6*(1/360) градусов
	    elemForArrowHours.style.transform = "rotate(" + hoursDeg + "deg)";
	}

window.onload = arrows(); // вызываем функцию arrows на момент загрузки страницы
window.setInterval (arrows, 1000); // устанавливаем setInterval на 1 секунду и выполняем код каждую секунду чтоб стрелки часов, минут и секунд обновляли положени каждую секунду