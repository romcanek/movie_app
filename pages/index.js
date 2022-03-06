import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import Filter from '../Components/Filter'
import { useState } from 'react'
import Movie from '../Components/Movie'
import { AnimatePresence } from 'framer-motion'
import Footer from '../Components/Footer'

export default function Home({ movies, page }) {

  const [prev, setPrev] = useState(movies)    // to know when swapping between multiple filters
  const [inputed, setInputed] = useState(false) // to know if filter needs to filter searched movies
  const [input, setInput] = useState('')  // filter with search ignores genre filters

  const [stay, setStay] = useState(movies)    // Original set
  const [filter, setFilter] = useState(movies)
  const [activeGenre, setActiveGenre] = useState(0)

  const search_filter = () => {
    if (input != "") {
      setInputed(true)
    } else {
      setInputed(false)
    }

    const filtered = stay.filter((movie) => movie.title.toUpperCase().includes(input.toUpperCase()))
    setPrev(filtered)
    setFilter(filtered)
    setInput("")
  }

  // for pagination
  let substract = 0;
  let df = 1
  if (page > 3) {
    substract = 2;
    df = parseInt(page)
  }
  if (page > 498) {
    substract = 3;
  }
  if (page > 499) {
    substract = 4;
  }

  return (
    <div className={styles['page-container']}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navbar}>
        <h2>Nejfilmy</h2>
        <div className={styles.search_link_container}>
          <div className={styles.search_bar}>
            <input value={input} onInput={e => setInput(e.target.value)} type="text"></input>
            <button onClick={search_filter}>Search</button>
          </div>

          <ul className={styles.links}>
            <li>
              <Link href={"/profile"} passHref>
                <a>Profile</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className={styles.container}>
        <Filter inputed={inputed} prev={prev} setActiveGenre={setActiveGenre} activeGenre={activeGenre} popular={stay} setFiltered={setFilter}></Filter>
        <AnimatePresence>
          <div className={styles.movie_list}>
            {filter.map(res => {
              if (res.backdrop_path != null)
                return <Movie key={res.id} mv_id={res.id} genre_ids={res.genre_ids} release_date={res.release_date} vote_average={res.vote_average} overview={res.overview} title={res.title} backdrop_path={res.backdrop_path}></Movie>
            })}
          </div>
        </AnimatePresence>
        <span className={styles.error} style={{ display: filter.length > 0 ? 'none' : 'block' }}>There was nothing found<br /> :(</span>

        <div className={styles.pager} passHref>
          <Link href={`/pg/1`}>
            <button style={{ backgroundColor: page == 1 ? 'rgb(96, 12, 231)' : 'rgb(50, 4, 122)' }}>1</button>
          </Link>
          <Link href={`/pg/${df + 1 - substract}`} passHref>
            <button style={{ backgroundColor: page == df + 1 - substract ? 'rgb(96, 12, 231)' : 'rgb(50, 4, 122)' }}>{df + 1 - substract}</button>
          </Link>
          <Link href={`/pg/${df + 2 - substract}`} passHref>
            <button style={{ backgroundColor: page == df + 2 - substract ? 'rgb(96, 12, 231)' : 'rgb(50, 4, 122)' }}>{df + 2 - substract}</button>
          </Link>
          <Link href={`/pg/${df + 3 - substract}`} passHref>
            <button style={{ backgroundColor: page == df + 3 - substract ? 'rgb(96, 12, 231)' : 'rgb(50, 4, 122)' }}>{df + 3 - substract}</button>
          </Link>
          <Link href={`/pg/500`} passHref>
            <button style={{ backgroundColor: page == 500 ? 'rgb(96, 12, 231)' : 'rgb(50, 4, 122)' }}>500</button>
          </Link>
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}


export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=21554939a4e98e7871eb65fef98fb774&language=en-US&page=1`)
  const data = await res.json()

  return {
    props: {
      movies: data.results,
      page: 1,
      key: 1
    }
  }
}