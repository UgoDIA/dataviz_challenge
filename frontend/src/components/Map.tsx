import { createEffect, createSignal, onMount } from 'solid-js'
import * as Highcharts from 'highcharts/highmaps'
import Exporting from 'highcharts/modules/exporting'
import { request } from '../utils/request'
Exporting(Highcharts)


export function Map () {
  const [selectedYear, setSelectedYear] = createSignal<number>(2022)

  onMount(async () => {
    await setReunionMapChart(selectedYear())
  })

  const changeYear = () => {
    const year: number = parseInt(
      document.querySelector('#range-slider')?.value
    )
    setSelectedYear(year)
  }

  createEffect(async () => {
    await setReunionMapChart(selectedYear())
  })

  return (
    <>
      <div id='map-container'></div>
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

async function setReunionMapChart (year: number) {
  const topo = await (
    await fetch('https://dataviz-challenge-api.azurewebsites.net/api/geo_json/')
  ).json()

  const mapData = await (await request('vp_elec?year=' + year, 'GET')).json()

  //@ts-ignore
  const chart = Highcharts.mapChart('map-container', {
    chart: {
      map: topo,
      backgroundColor: 'transparent',
      height: 600
    },
    title: {
      text: 'Répartition des véhicules électriques à La Réunion',
      style: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '24px'
      }
    },
    colorAxis: {
      type: 'logarithmic',
      minColor: '#ffffff',
      maxColor: '#3060cf', //#4a4a4a  #3060cf
    },
    legend: {
      backgroundColor: '#ffffff'
    },

    //TODO en erreur
    series: [
      {
        data: mapData,
        joinBy: ['code', 'code'],
        name: 'Nombre véhicules électriques',
        tooltip: {
          pointFormat: '{point.libelle_commune}: {point.value}\n'
        },
        states: { hover: { color: '#a3a3a3' } },

        dataLabels: {
          enabled: true,
          format: '{point.libelle_commune} : {point.value}'
        }
      }
    ],

    //TODO pas utile pour le moment
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {
              // console.log(e.point.name);
              // setOnRegion(MapUtils.findinTopoByName(e.point.name))
              // setRegionFilter(e.point.name)
              // setSellVolume(e.point.options.value)
              // let selectedRegion = e.point.options['hc-key']
              // selectedRegion = selectedRegion.slice(3,).toUpperCase()
              // setRegionPostcode(selectedRegion)
            }
          }
        }
      }
    }
  })

  //@ts-ignore
  setMap(chart)
}
