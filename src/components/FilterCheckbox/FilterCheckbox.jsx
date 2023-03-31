import './FilterCheckbox.css'
import {useEffect, useState} from "react";

export default function FilterCheckbox( {handleFilterCheckbox, filterStorageStatus}) {

    const filterStorageData = JSON.parse(filterStorageStatus)
    const [filter, setFilter] = useState((filterStorageData))

    //todo// const nonData = <input className='filter__switcher' type='checkbox'  defaultChecked={false} onChange={handleFilterCheckbox}/>
    // const Data = <input className='filter__switcher' type='checkbox'  defaultChecked={filterStorageData} onChange={handleFilterCheckbox}/>
    //
    // const input =  (filterStorageData === null) ? nonData : Data
    // debugger

    useEffect(()=>{
        (filterStorageData === null) ? setFilter(filterStorageData) : setFilter(false)
    },[])

        return (
        <label className='filter'>
            {/*{input}*/}
            <input className='filter__switcher' type='checkbox' defaultChecked={filter} onChange={handleFilterCheckbox}/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}