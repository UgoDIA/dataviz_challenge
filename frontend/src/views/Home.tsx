import { Map } from '../components/Map'
import InputYear from '../components/InputYear'
import Charts from '../components/Charts'

export default function Home () {
  return (
    <>
      <div class='flex justify-center my-10'>
        <InputYear></InputYear>
      </div>

      <div class='grid lg:grid-cols-2 gap-y-10 w-full h-fit grid-cols-1'>
        <Map />
        <div>
          <Charts />
        </div>
      </div>
    </>
  )
}
