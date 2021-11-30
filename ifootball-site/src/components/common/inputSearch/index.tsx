import { useContext } from 'react'
import styles from './styles.module.scss'

import { SearchContext } from '../../../providers/saerch'

function InputSearch() {
  const { setSearch } = useContext(SearchContext)
  
  return (
    <input
      id={styles.inputSearch}
      type='text'
      placeholder='Pesquisar produto'
      onChange={event => setSearch(event.target.value)}
    />
  )
}

export default InputSearch