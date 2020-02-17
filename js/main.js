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
  for (var i = 0; i <= 7; i++) {
    var flat = roomType[getRandomInt(0, 3)];
    var avatarNum = i + 1;
    var checkTimeIn = times[getRandomInt(0, 2)];
    var checkTimeOut = times[getRandomInt(0, 2)];
    var featuresLen = getRandomInt(1, 3);
    var newRoomFeatures = [];
    for (var j = 0; j <= featuresLen; j++) {
      var featureNum = getRandomInt(0, 5);
      newRoomFeatures.push(roomFeatures[featureNum]);
    }
    array.push({'author': {'avatar': 'img/avatars/user0' + avatarNum + '.png'}, 'offer': {'title': '', 'address': '600, 350', 'price': 100, 'type': flat, 'rooms': getRandomInt(1, 4), 'guests': getRandomInt(1, 10), 'checkin': checkTimeIn, 'checkout': checkTimeOut, 'features': newRoomFeatures, 'description': '', 'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']}, 'location': {'x': getRandomInt(10, 840), 'y': getRandomInt(130, 630)}});
  }
  return array;
};

var makeElement = function (obj) {
  var mapLabel = document.querySelector('#pin');
  var pin = mapLabel.content.cloneNode(true);
  var locationX = obj.location.x - 40;
  var locationY = obj.location.y - 165;
  pin.querySelector('.map__pin').setAttribute('style', 'left: ' +  locationX + 'px; top: ' + locationY + 'px;');
  var image = pin.querySelector('img');
  image.src = obj.author.avatar;
  image.alt = obj.offer.title;
  return pin;
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
map.classList.remove('map--faded');

var arrayPins = nearectClassifiedArray();
var collection = document.createDocumentFragment();

for (var j = 0; j <= 7; j++) {
  var pinElement = makeElement(arrayPins[j]);
  collection.appendChild(pinElement);
}

mapPins.appendChild(collection);
