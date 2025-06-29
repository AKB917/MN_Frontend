import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import Image from 'next/image';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import hiddenArticle from '../reducers/hiddenArticles'
import {addhiddenArticles} from '../reducers/hiddenArticles'

function Article(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);  
	const hiddenArticles = useSelector((state) => state.hiddenArticles.value);
	const URLBACKEND = process.env.NEXT_PUBLIC_URLBACKEND ;


	const handleBookmarkClick = () => {
		if (!user.token) {
			return;
		}

		fetch(`${URLBACKEND}/users/canBookmark/${user.token}`)
			.then(response => response.json())
			.then(data => {
				if (data.result && data.canBookmark) {
					if (props.isBookmarked) {
						dispatch(removeBookmark(props));
					} else {
						dispatch(addBookmark(props));
					}
				}
			});
	}

	let iconStyle = {};
	if (props.isBookmarked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	const handleishidde = () =>{
		// if (user.token){
		dispatch(addhiddenArticles(props))
	// }
}

 
	return (
		
			  <div className={styles.articles}>
	  
				  <div className={styles.articleHeader}>
					  <h3>{props.title}</h3>
					  <FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
					  <FontAwesomeIcon onClick={() => handleishidde()} icon={faEyeSlash}  className={styles.hiddenkIcon} />
				  </div>
				  <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
				  <div className={styles.divider}></div>
				  <Image src={props.urlToImage} alt={props.title} width={600} height={314} />
				  <p>{props.description}</p>
			  </div>

			
		  
	);
}

export default Article;
