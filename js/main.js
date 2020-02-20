'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var roomType = ['palace', 'flat', 'house', 'bungalo'];
var roomNames = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
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
    array.push({
      'author': {
        'avatar': 'img/avatars/user0' + avatarNum + '.png'
      },
      'offer': {
        'title': '',
        'address': '600, 350',
        'price': 100,
        'type': flat,
        'rooms': getRandomInt(1, 4),
        'guests': getRandomInt(1, 10),
        'checkin': checkTimeIn,
        'checkout': checkTimeOut,
        'features': newRoomFeatures,
        'description': '',
        'photos': [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
        ]
      },
      'location': {
        'x': getRandomInt(10, 840),
        'y': getRandomInt(130, 630)
      }
    });
  }
  return array;
};

var makeElement = function (obj) {
  var mapLabel = document.querySelector('#pin');
  var pin = mapLabel.content.cloneNode(true);
  var locationX = obj.location.x - 40;
  var locationY = obj.location.y - 165;
  pin.querySelector('.map__pin').setAttribute('style', 'left: ' + locationX + 'px; top: ' + locationY + 'px;');
  var image = pin.querySelector('img');
  image.src = obj.author.avatar;
  image.alt = obj.offer.title;
  return pin;
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
// map.classList.remove('map--faded');

var arrayPins = nearectClassifiedArray();
var collection = document.createDocumentFragment();

for (var j = 0; j <= 7; j++) {
  var pinElement = makeElement(arrayPins[j]);
  collection.appendChild(pinElement);
}

mapPins.appendChild(collection);

var pinCard = document.querySelector('#card');
var card = pinCard.content.cloneNode(true);

var hideElement = function (element) {
  element.hidden = true;
};

if (arrayPins[0].offer.title !== '') {
  card.querySelector('.popup__title').textContent = arrayPins[0].offer.title;
} else {
  hideElement(card.querySelector('.popup__title'));
}
if (arrayPins[0].offer.address !== '') {
  card.querySelector('.popup__text--address').textContent = arrayPins[0].offer.address;
} else {
  hideElement(card.querySelector('.popup__text--address'));
}
if (arrayPins[0].offer.price !== '') {
  card.querySelector('.popup__text--price').textContent = arrayPins[0].offer.price + '₽/ночь';
} else {
  hideElement(card.querySelector('.popup__text--price'));
}

var type = arrayPins[0].offer.type;
if (type !== '') {
  card.querySelector('.popup__type').textContent = roomNames[type];
} else {
  hideElement(card.querySelector('.popup__type'));
}
if (arrayPins[0].offer.rooms !== '' && arrayPins[0].offer.guests !== '') {
  card.querySelector('.popup__text--capacity').textContent = arrayPins[0].offer.rooms + ' комнаты для ' + arrayPins[0].offer.guests + ' гостей';
} else {
  hideElement(card.querySelector('.popup__text--capacity'));
}
if (arrayPins[0].offer.checkout !== '' && arrayPins[0].offer.checkin !== '') {
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayPins[0].offer.checkin + ', выезд до ' + arrayPins[0].offer.checkout;
} else {
  hideElement(card.querySelector('.popup__text--time'));
}
if (arrayPins[0].offer.features !== '') {
  card.querySelector('.popup__features').textContent = arrayPins[0].offer.features;
} else {
  hideElement(card.querySelector('.popup__features'));
}
if (arrayPins[0].offer.description !== '') {
  card.querySelector('.popup__description').textContent = arrayPins[0].offer.description;
} else {
  hideElement(card.querySelector('.popup__description'));
}
if (arrayPins[0].offer.photos.length > 0) {
  var photos = card.querySelector('.popup__photos');
  for (var i = 0; i < arrayPins[0].offer.photos.length; i++) {
    photos.querySelector('img').src = arrayPins[0].offer.photos[i];
  }
} else {
  hideElement(photos);
}
if (arrayPins[0].author.avatar !== '') {
  card.querySelector('.popup__avatar').src = arrayPins[0].author.avatar;
} else {
  hideElement(card.querySelector('.popup__avatar'));
}


var mapCard = document.querySelector('.map__filters-container');
map.insertBefore(card, mapCard);

var allSelectFields = document.querySelectorAll('select');
for (i = 0; i < allSelectFields.length; i++) {
  allSelectFields[i].setAttribute('disabled', 'disabled');
}
var allInputFields = document.querySelectorAll('input');
for (i = 0; i < allInputFields.length; i++) {
  allInputFields[i].setAttribute('disabled', 'disabled');
}

var activateElements = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form-disabled');
    for (i = 0; i < allSelectFields.length; i++) {
      allSelectFields[i].removeAttribute('disabled');
    }
    for (i = 0; i < allInputFields.length; i++) {
      allInputFields[i].removeAttribute('disabled');
    }
  }
};

var mapPin = document.querySelector('.map__pin--main');
mapPin.addEventListener('mousedown', activateElements);
mapPin.addEventListener('keydown', activateElements);
