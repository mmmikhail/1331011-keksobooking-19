'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var roomType = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var roomFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//  var photos = [];

var nearectClassifiedArray = function () {
  var array = [];
  for (var i = 0; i <= 1; i++) {
    // var arrayElement = new Object();
    // arrayElement.author = new Object();
    var flat = roomType[getRandomInt(0, 3)];
    var checkTimeIn = times[getRandomInt(0, 2)];
    var checkTimeOut = times[getRandomInt(0, 2)];
    var featuresLen = getRandomInt(1, 3);
    var newRoomFeatures = [];
    for (var j = 0; j <= featuresLen; j++) {
      var featureNum = getRandomInt(0, 5);
      newRoomFeatures.push(roomFeatures[featureNum]);
    }
    array.push({'author': {'avatar': 'img/avatars/user0' + i + 1 + '.png'}, 'offer': {'title': '', 'address': '600, 350', 'price': 100, 'type': flat, 'rooms': getRandomInt(1, 4), 'guests': getRandomInt(1, 10), 'checkin': checkTimeIn, 'checkout': checkTimeOut, 'features': newRoomFeatures, 'description': '', 'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']}, 'location': {'x': 111, 'y': getRandomInt(130, 630)}});
  }
  return array;
};

var makeElement = function (obj) {
  var mapLabel = document.querySelector('#pin');
  var pin = mapLabel.content.cloneNode(true);
  pin.classList.add('map__pin');
  pin.setAttribute('style', 'left: ' + obj.location.x + 40 + 'px; top: ' + obj.location.y + 44 + 'px;');
  var image = pin.querySelector('img');
  image.src = obj.avatar;
  image.alt = obj.title;
  return pin;
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
map.classList.remove('map--faded');

var arrayPins = nearectClassifiedArray();
var collection = document.createDocumentFragment();

for (var j = 0; j <= 2; j++) {
  var pinElement = makeElement(arrayPins[j]);
  collection.appendChild(pinElement);
}

mapPins.appendChild(collection);
