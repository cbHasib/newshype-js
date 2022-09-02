const loadData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.data.news_category[0].category_name);
    return data;
  } catch (error) {
    const errorElement = document.getElementById('error-element');
    errorElement.classList.remove('hidden');
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
  }
};



const showCategoryContent = async(categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const newsData = await loadData(url);
  const newsAll = newsData.data;

  const newsContainer = document.getElementById('news-container');

  newsAll.forEach(news => {
    const {title, total_view, rating: {number, badge}, author: {name, published_date, img}, thumbnail_url, image_url, details, others_info: {is_todays_pick, is_trending}} = news;

    





  });
}



const getCategory = async () => {
  const categoryContainer = document.getElementById("category-container");
  const categoryData = await loadData(
    "https://openapi.programming-hero.com/api/news/categories"
  );

  const categories = categoryData.data.news_category;

  for (const category of categories) {
    const {category_id, category_name} = category;
    const li = document.createElement('li');
    li.innerText = category_name;
    li.setAttribute('onclick', `showCategoryContent('${category_id}')`)
    categoryContainer.appendChild(li);
  }
};

getCategory();



