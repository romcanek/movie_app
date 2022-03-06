import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import Footer from '../Components/Footer'
import Movie from '../Components/Movie'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Profile() {

    const checkout = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('movies')) : null

    const [movies, setMovies] = useState(checkout);
    console.log(checkout)

    useEffect(() => {

    }, [movies])

    const deleteFavourites = () => {
        localStorage.clear()
        setMovies(null)
    }

    return (
        <div className={styles['page-container']}>
            <Head>
                <title>Profile</title>
                <meta name="description" content="Home page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className={styles.navbar}>
                <h2>Nejfilmy</h2>
                <div className={styles.search_link_container}>
                    <ul className={styles.links}>
                        <li>
                            <Link passHref href={"/"}>
                                <a>Home</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className={styles.profile_title_div}>
                <h1 className={styles.profile_title}>Favourites</h1>
                <button onClick={deleteFavourites} className={styles.profile_btn}>Clear favourites</button>
            </div>
            <main className={styles.profile_container}>
                {movies != null ? movies.map(res => {
                    return <Movie key={res.key} mv_id={res.key} genre_ids={res.genres} release_date={res.release} vote_average={res.vote_avg} overview={res.desc} title={res.title} backdrop_path={res.backdrop_path}></Movie>
                }) : <span>You don&apos;t have any favourites yet</span>}
            </main>

            <Footer></Footer>
        </div>
    )
}