import { createSignal } from "solid-js"


export  const [selectedYear, setSelectedYear] = createSignal<number>(2022)

export default function InputYear(){


    const changeYear = () => {
        const year: number = parseInt(
          //@ts-ignore
          document.querySelector('#range-slider')?.value
        )
        setSelectedYear(year)
      }

    return (
        <>
          <input
            id='range-slider'
            type='range'
            value={selectedYear()}
            name='volume'
            min='2010'
            max='2038'
            onChange={() => changeYear()}
          ></input>
          <div>Année : {selectedYear()}</div>
        </>
      )
}