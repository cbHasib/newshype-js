const loadData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.data.news_category[0].category_name);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async() => {
    
  const categoryData = await loadData("https://openapi.programming-hero.com/api/news/categories");

  const categories = categoryData.data.news_category;


  for(const category of categories){
    console.log(category.category_name)
  }
};

getCategory();
