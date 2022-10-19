export default function formatColorTitle(color) {
  let rusColor = '';
  switch (color) {
    case 'Red':
      rusColor = 'Красный';
      break;
    case 'Blue':
      rusColor = 'Синий';
      break;
    case 'Green ':
      rusColor = 'Зеленый';
      break;
    case 'Yellow ':
      rusColor = 'Желтый';
      break;
    case 'Purple':
      rusColor = 'Фиолетовый';
      break;
    case 'Pink':
      rusColor = 'Розовый';
      break;
    case 'black':
      rusColor = 'Черный';
      break;
    default:
      rusColor = 'Белый';
  }
  return rusColor;
}
