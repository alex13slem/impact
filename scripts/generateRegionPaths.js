import { load } from 'cheerio';
import fs from 'fs';

// Читаем содержимое SVG-файла
const svgFilePath = 'src/assets/img/newMap.svg'; // Замените на путь к вашему SVG-файлу
const svgData = fs.readFileSync(svgFilePath, 'utf8');

// Загружаем SVG в cheerio
const $ = load(svgData, {
  xmlMode: true, // Обязательно для правильной работы с XML
});

// Извлекаем все теги path и их атрибуты d
const paths = [];
$('path').each((i, elem) => {
  const name = $(elem).attr('id') || `path-${i}`; // Используем id в качестве имени, если он есть, иначе генерируем имя по индексу
  const d = $(elem).attr('d');
  if (d) {
    paths.push({ name, d });
  }
});

// Формируем текст для записи в файл
const output = `export const regionsPaths: { name: string; d: string }[] = ${JSON.stringify(paths, null, 2)};\n`;

// Записываем результат в файл
const outputFilePath = 'src/lib/data/regionsPaths.ts'; // Замените на путь к вашему выходному файлу
fs.writeFileSync(outputFilePath, output, 'utf8');

console.log('Файл успешно записан в', outputFilePath);
