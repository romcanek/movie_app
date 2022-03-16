import Head from 'next/head'
import styles from '../../styles/desc.module.scss'
import { css, cx } from '@emotion/css'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'

export default function Desc({ query, genre_data }) {

    const router = useRouter()

    const path_to_img = "https://image.tmdb.org/t/p/w500" + query.img

    const [anim, setAnim] = useState(false)

    const classes = `styles.add`

    let bg;
    if (query.vote_avg > 7) {
        bg = 'rgb(17, 153, 17)'
    } else if (query.vote_avg > 5) {
        bg = 'rgb(114, 126, 13)'
    } else {
        bg = 'rgb(129, 12, 12)'
    }

    const genres = query.genres.split(',')
    const genres_as_text = []
    genres.forEach(e => {
        for (let f of genre_data.genres) {
            if (f.id == e) {
                genres_as_text.push(f.name)
                return
            }
        }
    });


    const handleClick = () => {
        let now = {
            title: query.id,
            backdrop_path: query.img,
            key: query.mvid,
            genres: query.genres,
            vote_avg: query.vote_avg,
            desc: query.desc,
            release: query.release
        }
        let prev = []
        const movies = JSON.parse(localStorage.getItem("movies"))
        if (movies != null) {
            movies.forEach(m => {
                if (now.key == m.key) {
                    alert("You already have this movie as favourite")
                    return
                }
                prev.push(m)
            })
        }
        prev.push(now)
        setAnim(true)
        localStorage.setItem("movies", JSON.stringify(prev))
    }

    return (
        <div>
            <Head>
                <title>{query.id}</title>
                <meta name="description" content="Home page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                className={css`
                    position: relative;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    text-align: center;

                    &::after{
                        content: "";
                        background: url(${path_to_img});
                        filter: brightness(20%);
                        top: 0;
                        height: 100%;
                        left: 0;
                        right: 0;
                        position: absolute;
                        z-index: -1;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                    *{
                        color: white;
                    }
                }
            `}
            >
                <div className={styles.movie_data}>
                    <div className={styles.title}>
                        <h1>{query.id} </h1>
                        <span className={css`
                                font-size: 1.3rem;
                                background-color: ${bg};
                                padding: 15px;
                                border-radius: 8px;
                                margin-left: 1em;
                            }
                        `}>{parseFloat(query.vote_avg) * 10 + "%"}</span>
                    </div>
                    <p className={styles.release}>{query.release}</p>
                    <div className={styles.genres}><h4>Genres: </h4>{genres_as_text.map(x => {
                        return <span key={x}>{x}</span>
                    })}
                    </div>
                    <div onClick={() => router.back()} className={styles.exit}>
                        X
                    </div>
                    <p className={styles.desc}>{query.desc}</p>
                    <button onClick={handleClick} className={`${styles.add} ${anim ? styles.anim : null}`}>Add to favourites</button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ query }) {

    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=21554939a4e98e7871eb65fef98fb774&language=en-US")
    const data = await res.json()

    return {
        props: {
            query: query,
            genre_data: data,
            key: query.id
        }
    }
}