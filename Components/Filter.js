import { useEffect } from "react";
import styles from '../styles/filter.module.scss';

function Filter({ inputed, prev, setActiveGenre, activeGenre, setFiltered, popular }) {

    const reset = () => {
        setFiltered(popular)
    }

    useEffect(() => {
        if (activeGenre === 0) {
            setFiltered(popular)
            return
        }

        if (inputed) {
            const filtered = prev.filter((movie) => movie.genre_ids.includes(activeGenre))
            setFiltered(filtered)
            return
        } else {
            const filtered = popular.filter((movie) => movie.genre_ids.includes(activeGenre))
            setFiltered(filtered)
            return
        }
    }, [activeGenre])

    return (
        <div className={styles['button-container']}>
            <button className={activeGenre === 0 ? "active" : ""} onClick={
                () => {
                    setActiveGenre(0)
                    reset()   // to change at start of page and reset search by name filter
                }}
            >All</button>
            <button className={activeGenre === 35 ? "active" : ""} onClick={() => setActiveGenre(35)}>Comedy</button>
            <button className={activeGenre === 28 ? "active" : ""} onClick={() => setActiveGenre(28)}>Action</button>
        </div>
    )
}

export default Filter;