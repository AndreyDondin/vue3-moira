export default function numbeFormat(value) {
  return new Intl.NumberFormat().format(value);
}
