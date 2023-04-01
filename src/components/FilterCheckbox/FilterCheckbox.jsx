import './FilterCheckbox.css'
import {useEffect, useState} from "react";

export default function FilterCheckbox( {handleFilterCheckbox, filterStorageStatus}) {

    const filterStorageData = JSON.parse(filterStorageStatus)
    const [filter, setFilter] = useState((filterStorageData))

    useEffect(()=>{
        (filterStorageData === null) ? setFilter(filterStorageData) : setFilter(false)
    },[])

        return (
        <label className='filter'>
            <input className='filter__switcher' type='checkbox' defaultChecked={filter} onChange={handleFilterCheckbox}/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}