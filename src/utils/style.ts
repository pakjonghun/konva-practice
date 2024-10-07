export function hexToRgba(hex: string, opacity = 1) {
  console.log(hex);
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // RGBA 형식으로 반환
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
