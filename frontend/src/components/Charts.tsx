import * as Highcharts from 'highcharts/highmaps'
import Exporting from 'highcharts/modules/exporting'
import { onMount } from 'solid-js'
import { request } from '../utils/request'
import { DataUtils } from './DataUtils'
Exporting(Highcharts)

export default function Charts () {
  let dataProd
  let dataConso
  let dataParc
  let years: number[] = []
  let prod: number[] = []
  let conso: number[] = []
  let adjustedConso: number[] = []

  onMount(async () => {
    dataProd = await (await request('prod', 'GET')).json()
    dataConso = await (await request('conso', 'GET')).json()
    dataParc = await (await request('parc', 'GET')).json()

    for (let i = 2010; i <= 2038; i++) {
      years.push(i)
      let proValue = null
      for (const _prod of dataProd) {
        if (_prod.year == i) {
          proValue = _prod.value
          break
        }
      }

      let consoValue = null
      for (const _conso of dataConso) {
        if (_conso.year == i) {
          if (consoValue == null) {
            consoValue = 0
          }
          consoValue += _conso.value
        }
      }

      //@ts-ignore
      adjustedConso.push(DataUtils.adjustedConso(year, consoValue, dataParc))

      prod.push(proValue)
      //@ts-ignore
      conso.push(consoValue)
    }

    await chartDraw()
  })

  const chartDraw = async () => {
    //@ts-ignore
    Highcharts.chart('chart-prod-container', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Impact sur la distribution électrique'
      },
      xAxis: {
        categories: years
      },
      yAxis: {
        title: {
          text: 'MWh'
        },
        min: 2000000
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true
        }
      },
      series: [
        {
          name: 'Production',
          data: prod
        },
        {
          name: 'Consomation',
          data: conso
        }
        // {
        //   name: 'Tallinn',
        //   data: [
        //     -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5, 2.0, -0.9
        //   ]
        // }
      ]
    })
  }

  return (
    <>
      <div id='chart-prod-container'></div>
    </>
  )
}
