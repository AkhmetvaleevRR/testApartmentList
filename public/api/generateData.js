function generateApartmentData(count = 10) {
  const apartments = [];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const rooms = [1, 1, 1, 2, 2, 3][Math.floor(Math.random() * 6)];
    const area = getAreaByRooms(rooms);
    const price = calculatePrice(area, rooms);

    apartments.push({
      id: id,
      image: `https://placebear.com/1280/720`,
      title: `Квартира ${id}`,
      description: getRandomDescription(rooms),
      area: area,
      floor: Math.floor(Math.random() * 20) + 1,
      price: price,
      rooms: rooms,
    });
  }

  return apartments;
}

function getAreaByRooms(rooms) {
  const base = { 1: 35, 2: 55, 3: 75 };
  return base[rooms] + Math.floor(Math.random() * 15);
}

function calculatePrice(area, rooms) {
  const multiplier = { 1: 160000, 2: 170000, 3: 180000 };
  return Math.round((area * multiplier[rooms]) / 50000) * 50000;
}

function getRandomDescription(rooms) {
  const descriptions = [
    "Светлая квартира с панорамными окнами",
    "Просторная квартира с современной планировкой",
    "Уютная квартира с чистовой отделкой",
    "Квартира с ремонтом в отличном состоянии",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

const data = generateApartmentData(42);
console.log(JSON.stringify(data, null, 2));
