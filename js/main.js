'use strict';

var PIN_SIZE_X = 40;
var PIN_SIZE_Y = 165;
var N_PINS = 7;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var roomType = ['palace', 'flat', 'house', 'bungalo'];
var roomNames = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var times = ['12:00', '13:00', '14:00'];
var roomFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var nearectClassifiedArray = function () {
  var array = [];
  for (var i = 0; i <= N_PINS; i++) {
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
  var locationX = obj.location.x - PIN_SIZE_X;
  var locationY = obj.location.y - PIN_SIZE_Y;
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

for (var j = 0; j <= N_PINS; j++) {
  var pinElement = makeElement(arrayPins[j]);
  collection.appendChild(pinElement);
}

mapPins.appendChild(collection);
var hideElement = function (element) {
  element.hidden = true;
};

function fillInfo(obj) {
  var pinCard = document.querySelector('#card');
  var card = pinCard.content.cloneNode(true);
  var popupTitle = card.querySelector('.popup__title');
  var popupAddress = card.querySelector('.popup__text--address');
  var popupPrice = card.querySelector('.popup__text--price');
  var popupType = card.querySelector('.popup__type');
  var popupCapacity = card.querySelector('.popup__text--capacity');
  var popupTime = card.querySelector('.popup__text--time');
  var popupFeatures = card.querySelector('.popup__features');
  var popupDescription = card.querySelector('.popup__description');
  var popupPhotos = card.querySelector('.popup__photos');
  var popupAvatar = card.querySelector('.popup__avatar');
  if (obj.offer.title !== '') {
    popupTitle.textContent = obj.offer.title;
  } else {
    hideElement(popupTitle);
  }
  if (obj.offer.address !== '') {
    popupAddress.textContent = obj.offer.address;
  } else {
    hideElement(popupAddress);
  }
  if (obj.offer.price !== '') {
    popupPrice.textContent = obj.offer.price + '₽/ночь';
  } else {
    hideElement(popupPrice);
  }
  if (obj.offer.type !== '') {
    popupType.textContent = roomNames[obj.offer.type];
  } else {
    hideElement(popupType);
  }
  if (obj.offer.rooms !== '' && obj.offer.guests !== '') {
    popupCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  } else {
    hideElement(popupCapacity);
  }
  if (obj.offer.checkout !== '' && obj.offer.checkin !== '') {
    popupTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  } else {
    hideElement(popupTime);
  }
  if (obj.offer.features !== '') {
    popupFeatures.textContent = obj.offer.features;
  } else {
    hideElement(popupFeatures);
  }
  if (obj.offer.description !== '') {
    popupDescription.textContent = obj.offer.description;
  } else {
    hideElement(popupDescription);
  }
  if (obj.offer.photos.length > 0) {
    for (var i = 0; i < obj.offer.photos.length; i++) {
      popupPhotos.querySelector('img').src = obj.offer.photos[i];
    }
  } else {
    hideElement(popupPhotos);
  }
  if (obj.author.avatar !== '') {
    popupAvatar.src = obj.author.avatar;
  } else {
    hideElement(popupAvatar);
  }
  return card;
}

var card = fillInfo(arrayPins[0]);

adForm.querySelector('#address').value = arrayPins[0].offer.address;
var mapCard = document.querySelector('.map__filters-container');
map.insertBefore(card, mapCard);

var allSelectFields = document.querySelectorAll('select');
for (var i = 0; i < allSelectFields.length; i++) {
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
    var coordX = evt.clientX + PIN_SIZE_X;
    var coordY = evt.clientY + PIN_SIZE_Y;
    adForm.querySelector('#address').value = coordX + ', ' + coordY;
  }
};

function checkRooms(evt) {
  var guests = document.querySelector('#capacity');
  var rooms = document.querySelector('#room_number');
  var guestNum = parseInt(guests.value, 10);
  var roomNum = parseInt(rooms.value, 10);
  if (evt.target === guests) {
    if (guestNum > roomNum) {
      guests.setCustomValidity('Слишком много гостей!');
      rooms.setCustomValidity('');
    } else if (guestNum !== 0 && roomNum === 100) {
      guests.setCustomValidity('Допускается только вариант Не для гостей!');
      rooms.setCustomValidity('');
    } else if (guestNum === 0 && roomNum !== 100) {
      guests.setCustomValidity('Допускается только вариант 100 комнат!');
      rooms.setCustomValidity('');
    } else {
      guests.setCustomValidity('');
    }
  }
  if (evt.target === rooms) {
    if (guestNum > roomNum) {
      rooms.setCustomValidity('Слишком мало комнат!');
      guests.setCustomValidity('');
    } else if (guestNum === 0 && roomNum !== 100) {
      rooms.setCustomValidity('Допускается только вариант 100 комнат!');
      guests.setCustomValidity('');
    } else if (guestNum !== 0 && roomNum === 100) {
      rooms.setCustomValidity('Допускается только вариант Не для гостей!');
      guests.setCustomValidity('');
    } else {
      rooms.setCustomValidity('');
    }
  }
}

var roomField = adForm.querySelector('#room_number');
var guestField = adForm.querySelector('#capacity');
roomField.addEventListener('change', checkRooms);
guestField.addEventListener('change', checkRooms);
window.addEventListener('load', checkRooms);

var mapPin = document.querySelector('.map__pin--main');
mapPin.addEventListener('mousedown', activateElements);
mapPin.addEventListener('keydown', activateElements);
