import './FilterCheckbox.css'
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export default function FilterCheckbox({handleFilterCheckbox, filterStorageStatus, handleSavedMoviesFilterCheckbox}) {

    const location = useLocation()
    const moviesOnLocation = location.pathname === '/movies'

    const filterStorageData = JSON.parse(filterStorageStatus)
    const [filter, setFilter] = useState((filterStorageData))

    useEffect(() => {
        (filterStorageData === null) ? setFilter(filterStorageData) : setFilter(false)
    }, [])

    return (
        <label className='filter'>
            <input className='filter__switcher' type='checkbox' defaultChecked={moviesOnLocation ? filter : undefined}
                   onChange={moviesOnLocation ? handleFilterCheckbox : handleSavedMoviesFilterCheckbox}/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}