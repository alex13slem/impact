export function generateNews(count: number) {
   const news = [];
  const baseTime = new Date('2022-01-01');

  for (let i = 1; i <= count; i++) {
    news.push({
      id: i.toString(),
      title: `Встреча в детском центре с детьми прошла успешно`,
      time: new Date(baseTime.getTime() + i * 86400000) // Добавляем по одному дню

    });
  }
  return news;
}
