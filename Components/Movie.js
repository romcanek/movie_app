import React from 'react'
import styles from '../styles/movie.module.scss'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Movie({ title, backdrop_path, overview, vote_average, release_date, genre_ids, mv_id }) {
    return (
        <Link passHref href={`/desc/${title}?img=${backdrop_path}&desc=${overview}&vote_avg=${vote_average}&release=${release_date}&genres=${genre_ids}&mvid=${mv_id} `}>
            <motion.div
                className={styles.card}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                layout
                transition={{ duration: 0.5 }}
            >
                <img src={"https://image.tmdb.org/t/p/w500" + backdrop_path} alt="" />
                <h2>{title}</h2>
            </motion.div>
        </Link>
    )
}
