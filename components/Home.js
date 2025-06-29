import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';


function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);
  const URLBACKEND = process.env.NEXT_PUBLIC_URLBACKEND ;


  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch(`${URLBACKEND}/articles`)
      .then(response => response.json())
      .then(data => { console.log("data.articles[0] =", data.articles[0]);

        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

    const articles = articlesData.filter((data) => !hiddenArticles.some(article => article.title ===data.title)).map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
      return <Article key={i} {...data} isBookmarked={isBookmarked}  />;
    
  });

  let topArticles;
  if (bookmarks.some(bookmark => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
