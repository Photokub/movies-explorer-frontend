import './FilterCheckbox.css'

export default function FilterCheckbox( {handleFilterCheckbox, filterStorageStatus}) {

    const filterStatus = JSON.parse(filterStorageStatus)

        return (
        <label className='filter'>
            <input className='filter__switcher' type='checkbox'  defaultChecked={filterStatus} onChange={handleFilterCheckbox}/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}