import './FilterCheckbox.css'

export default function FilterCheckbox({handleFilterCheckbox, filterStorageStatus}) {

    return (
        <label className='filter'>
            <input className='filter__switcher' type='checkbox' defaultChecked={filterStorageStatus} onChange={handleFilterCheckbox}/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}