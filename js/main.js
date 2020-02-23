'use strict';

var PIN_SIZE_X = 40;
var PIN_SIZE_Y = 165;
var N_PINS = 7;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomELementArray(array) {
  var index = getRandomInt(0, array.length - 1);

  return array[index];
}

var roomType = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var roomFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function nearestClassifiedArray() {
  var array = [];

  for (var i = 0; i <= N_PINS; i++) {
    var roomTypeRandom = getRandomELementArray(roomType);
    var avatarNum = i + 1;
    var checkTimeIn = getRandomELementArray(times);
    var checkTimeOut = getRandomELementArray(times);
    var featuresLen = getRandomInt(1, 3);
    var newRoomFeatures = [];
    for (var j = 0; j <= featuresLen; j++) {
      newRoomFeatures.push(getRandomELementArray(roomFeatures));
    }
    array.push({
      author: {
        avatar: 'img/avatars/user0' + avatarNum + '.png'
      },
      offer: {
        title: '',
        address: '600, 350',
        price: getRandomInt(100, 10000),
        type: roomTypeRandom,
        rooms: getRandomInt(1, 4),
        guests: getRandomInt(1, 10),
        checkin: checkTimeIn,
        checkout: checkTimeOut,
        features: newRoomFeatures,
        description: '',
        photos: [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
        ]
      },
      location: {
        x: getRandomInt(10, 840),
        y: getRandomInt(130, 630)
      }
    });
  }

  return array;
}

function makeElement(obj) {
  var mapLabel = document.querySelector('#pin');
  var pin = mapLabel.content.cloneNode(true);
  var locationX = obj.location.x - PIN_SIZE_X;
  var locationY = obj.location.y - PIN_SIZE_Y;
  var image = pin.querySelector('img');

  pin.querySelector('.map__pin').setAttribute('style', 'left: ' + locationX + 'px; top: ' + locationY + 'px;');
  image.src = obj.author.avatar;
  image.alt = obj.offer.title;

  return pin;
}

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
map.classList.remove('map--faded');

var arrayPins = nearestClassifiedArray();
var collection = document.createDocumentFragment();

for (var j = 0; j <= N_PINS; j++) {
  var pinElement = makeElement(arrayPins[j]);
  collection.appendChild(pinElement);
}

mapPins.appendChild(collection);
