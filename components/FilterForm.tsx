'use client'
import styles from '@styles/form.module.scss'
import { useRouter } from "next/navigation";
import { useState } from 'react';


type Props = {
  baseUrl:string,
}

type Values = {
  // start?: number,
  // stop?: number,
  start: string|number,
  stop: string|number,
  stopUnit:'m'|'h'|'d'|'m'|''|string,
  startUnit:'m'|'h'|'d'|'m'|''|string,
}

export function FilterForm({baseUrl = `/backups`}:Props) {

  const router = useRouter()

  const [values, setValues] = useState({
    // url: '',
    start: '',
    stop: '',
    startUnit: 'm',
    stopUnit: 'm',
  })

  function handleOnChange(event:any) {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    console.log(name, value);
    
  };

  function handleSubmit(e:any) {
    e.preventDefault()
    console.log(values);

    const {start, stop, stopUnit, startUnit}:Values = values

    const thisStart = (start  ? `start=-${start + startUnit}` : '')
    const thisStop =  (stop   ? `stop=-${stop + stopUnit}`    : '')

    router.push(baseUrl + `?${thisStart}&${thisStop}`)
  }


  return (
    <div>

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* <label htmlFor="url">
          <span> url </span> <br />
          <input type="text" name="url" onChange={handleOnChange}/>
        </label> */}

        <div>
          <label htmlFor="start">
            <span> start </span> <br />
            <input type="text" name="start" onChange={handleOnChange}/>
          </label>

          <select name="startUnit" id="" onChange={handleOnChange}>
            <option value=""> -- unit -- </option>
            <option value="m"> Minutes </option>
            <option value="h"> Hours </option>
            <option value="d"> Days </option>
            {/* <option value="m"> Months </option> */}
          </select>
        </div>

        <div>
          <label htmlFor="stop" >
            <span> stop </span> <br />
            <input name="stop" type="text"  onChange={handleOnChange}/>
          </label>

          <select name="stopUnit" id="" onChange={handleOnChange}>
            <option value=""> -- unit -- </option>
            <option value="m"> Minutes </option>
            <option value="h"> Hours </option>
            <option value="d"> Days </option>
            {/* <option value="m"> Months </option> */}
          </select>
        </div>

        <button type="submit"> filter </button>
      </form>
    </div>
  )
}
