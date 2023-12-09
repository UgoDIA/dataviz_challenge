import { Map } from "../components/Map";
import {MyChart} from "../components/Chart";

export default function Home(){


    return (<>
    <div class="flex flex-wrap w-full h-fit">
       <Map/>
       <MyChart/>
    </div>
    </>)
}