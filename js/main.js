'use strict';

var PIN_SIZE_X = 40;
var PIN_SIZE_Y = 165;
var N_PINS = 7;
var MAX_ROOMS = 100;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElementFromArray(array) {
  var index = getRandomInt(0, array.length - 1);

  return array[index];
}

var roomType = ['palace', 'flat', 'house', 'bungalo'];
var roomNames = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var times = ['12:00', '13:00', '14:00'];
var roomFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function nearestClassifiedArray() {
  var array = [];

  for (var i = 0; i <= N_PINS; i++) {
    var roomTypeRandom = getRandomElementFromArray(roomType);
    var avatarNum = i + 1;
    var checkTimeIn = getRandomElementFromArray(times);
    var checkTimeOut = getRandomElementFromArray(times);
    var featuresLen = getRandomInt(1, 3);
    var newRoomFeatures = [];
    for (var j = 0; j <= featuresLen; j++) {
      newRoomFeatures.push(getRandomElementFromArray(roomFeatures));
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
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var arrayPins = nearestClassifiedArray();
var collection = document.createDocumentFragment();

for (var j = 0; j <= N_PINS; j++) {
  var pinElement = makeElement(arrayPins[j]);

  collection.appendChild(pinElement);
}

mapPins.appendChild(collection);

var hideElement = function (element) {
  element.hidden = true;
};

function fillInfo(pin) {
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
  var offer = pin.offer;
  var author = pin.author;

  if (offer.title) {
    popupTitle.textContent = offer.title;
  } else {
    hideElement(popupTitle);
  }

  if (offer.address) {
    popupAddress.textContent = offer.address;
  } else {
    hideElement(popupAddress);
  }

  if (offer.price) {
    popupPrice.textContent = offer.price + '₽/ночь';
  } else {
    hideElement(popupPrice);
  }

  if (offer.type) {
    popupType.textContent = roomNames[offer.type];
  } else {
    hideElement(popupType);
  }

  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  } else {
    hideElement(popupCapacity);
  }

  if (offer.checkout && offer.checkin) {
    popupTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  } else {
    hideElement(popupTime);
  }

  if (offer.features.length) {
    popupFeatures.textContent = offer.features;
  } else {
    hideElement(popupFeatures);
  }

  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    hideElement(popupDescription);
  }

  if (offer.photos.length) {
    for (var i = 0; i < offer.photos.length; i++) {
      popupPhotos.querySelector('img').src = offer.photos[i];
    }
  } else {
    hideElement(popupPhotos);
  }

  if (author.avatar) {
    popupAvatar.src = author.avatar;
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
    checkRooms(evt);
  }
};

function checkRooms(evt) {
  var guests = document.querySelector('#capacity');
  var rooms = document.querySelector('#room_number');
  var guestNum = parseInt(guests.value, 10);
  var roomNum = parseInt(rooms.value, 10);
  var checkedElement = evt.target;
  var messageTooMuch = 'Слишком много гостей!';

  rooms.setCustomValidity('');
  guests.setCustomValidity('');

  if (evt.target === rooms) {
    messageTooMuch = 'Слишком мало комнат!';
  } else if (evt.button === 0 || evt.key === 'Enter') {
    checkedElement = guests;
  }

  if (guestNum > roomNum) {
    checkedElement.setCustomValidity(messageTooMuch);
  } else if (guestNum && roomNum === MAX_ROOMS) {
    checkedElement.setCustomValidity('Допускается только вариант Не для гостей!');
  } else if (!guestNum && roomNum !== MAX_ROOMS) {
    checkedElement.setCustomValidity('Допускается только вариант 100 комнат!');
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
