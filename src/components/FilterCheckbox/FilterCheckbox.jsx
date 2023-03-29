import React, {useState} from "react";
import './FilterCheckbox.css'

export default function FilterCheckbox({handleFilterCheckbox}) {

    const [isActive, setFilterStatus] = useState(false)

    return (
        <label className='filter'>
            <input className='filter__switcher' type='checkbox' onChange={handleFilterCheckbox}/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}