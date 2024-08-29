export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  time: Date;
  image: string;
  description: string;
  body: string;
  categoryId: number;
}

function generateNews(): NewsArticle[] {
  const news: NewsArticle[] = [];
  const categories = [1, 2, 3];
  const baseTime = new Date('2022-01-01');
  let idCounter = 1;
  let imageCounter = 1;

  categories.forEach((categoryId, index) => {
    for (let i = 1; i <= 3; i++) {
      news.push({
        id: idCounter++,
        slug: `news-${idCounter++}`,
        title: `Новость такая и такая ${idCounter++}`,
        time: new Date(
          baseTime.getTime() + i * 86400000 + index * 3 * 86400000,
        ),
        image: `/images/news-${imageCounter++}.png`,
        description: `
          Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и тёплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду «Луч Добра». Благодаря их труду ежегодно сотни питомцев находят свой новый дом.
        `,
        body: `
          <p>Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и тёплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду «Луч Добра». Благодаря их труду ежегодно сотни питомцев находят свой новый дом.</p>
          <p>Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и тёплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду «Луч Добра». Благодаря их труду ежегодно сотни питомцев находят свой новый дом.</p>
          <p>Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и тёплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду «Луч Добра». Благодаря их труду ежегодно сотни питомцев находят свой новый дом.</p>
        `,
        categoryId,
      });
    }
  });

  return news;
}

export const news = generateNews();

export const landingNews = [...news]
  .sort((a, b) => b.time.getTime() - a.time.getTime())
  .slice(0, 5);
