import { createSignal, onMount } from 'solid-js'
import * as Highcharts from 'highcharts/highmaps'
import Exporting from 'highcharts/modules/exporting'
import { request } from '../utils/request'
Exporting(Highcharts)

export const [topographie, setTopographie] = createSignal()
export const [map, setMap] = createSignal()
export const [onLabel, setOnLabel] = createSignal('evolution')
export const [onRegion, setOnRegion] = createSignal()

export const [regions, setRegions] = createSignal([])
export const [regionFilter, setRegionFilter] = createSignal()
export const [dateFilter, setDateFilter] = createSignal()
export const [getRegionPostcode, setRegionPostcode] = createSignal()

export function Map () {
  onMount(async () => {
    const topo = await (
      await fetch(
        'https://dataviz-challenge-api.azurewebsites.net/api/geo_json/'
      )
    ).json()

    // TODO define the url
    const mapData = await (await request('vp_elec', 'GET')).json()

    console.log(mapData)

    // Défini les var global Topographie & onRegion
    // setTopographie(topo)
    // setOnRegion(findinTopoByID(mapData[0][0]))

    // // Récupère une liste des noms des régions
    // getFullNameListOfRegions(topo.objects.default.geometries)

    // // Définir une valeur par région pour le filtre région
    // setRegionFilter(onRegion())

    // // Définie un volume des ventes
    // setSellVolume(mapData[0][1])

    //@ts-ignore
    const chart = Highcharts.mapChart('container', {
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
        maxColor: '#3060cf' //#4a4a4a  #3060cf
      },
      legend: {
        backgroundColor: '#ffffff'
      },

      //TODO en erreur
          series: [{
              data: mapData,
              name: 'Région',
              states: { hover: { color: '#a3a3a3' } },

              dataLabels: {
                  enabled: true,
                  format: '{point.libelle_commune}'
              },
          }],

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

    // const chart = Highcharts.mapChart('container', {
    //     exporting: {
    //         buttons: {
    //             contextButton: {
    //                 enabled: false
    //             }
    //         }
    //     },
    //     chart: {
    //         map: topo,
    //         backgroundColor: 'transparent',
    //         height: 600
    //     },
    //     title: {
    //         text: 'Brésil - Chiffres d\'affaire par région',
    //         style: {
    //             color: 'white',
    //             fontWeight: 'bold',
    //             fontSize:'24px',
    //         }
    //     },
    //     series: [{
    //         data: mapData,
    //         name: 'Région',
    //         states: { hover: { color: '#a3a3a3' } },

    //         dataLabels: {
    //             enabled: true,
    //             format: '{point.name}'
    //         },
    //     }],
    //     colorAxis: {
    //         type: 'logarithmic',
    //         minColor: '#ffffff',
    //         maxColor:'#3060cf',   //#4a4a4a  #3060cf
    //     },
    //     legend: {
    //         backgroundColor: '#ffffff',
    //     },

    //     plotOptions: {
    //         series: {
    //              cursor: 'pointer',
    //              point: {
    //                  events: {
    //                     click: function(e) {
    //                         // console.log(e.point.name);
    //                         // setOnRegion(MapUtils.findinTopoByName(e.point.name))

    //                         // setRegionFilter(e.point.name)
    //                         // setSellVolume(e.point.options.value)
    //                         // let selectedRegion = e.point.options['hc-key']
    //                         // selectedRegion = selectedRegion.slice(3,).toUpperCase()
    //                         // setRegionPostcode(selectedRegion)
    //                     }
    //                 }
    //             }
    //         }
    //     },

    // });

    setMap(chart)
    // Pour mettre à jour une données de la map
    // chart.update({ series: { data: mapData } })
  })

  return (
    <>
      <div id='container'></div>
    </>
  )
}
