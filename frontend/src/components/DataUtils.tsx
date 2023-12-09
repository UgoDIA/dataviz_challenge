export namespace DataUtils {
  //Consomation ajusté par année
  export function adjustedConso (
    realConso: number | null,
    year: number,
    parcs: {}[]
  ) {
    let conso = null
    if (year < 2022) {
      conso = 0
      for (const parc of parcs) {
        //@ts-ignore
        if (parc.year == year) {
          conso += consoParc(parc)
        }
      }
      conso += realConso != null ? realConso : 0
    }

    return conso
  }
}

//@ts-ignore
function consoParc (parc) {
  let conso = 0
  for (const epci of epci_dep_moyen_km) {
    if (parc.epci == epci.name) {
      conso =
        (epci.value * parc.value * consomation_ve__kW_100km * 365) / 100 / 1000
      break
    }
  }
  return conso
}

const consomation_ve__kW_100km = 15

const epci_dep_moyen_km = [
  {
    name: 'CASUD',
    value: 20
  },
  {
    name: 'TO',
    value: 15
  },
  {
    name: 'CIVIS',
    value: 18
  },
  {
    name: 'CINOR',
    value: 17
  },
  {
    name: 'CIREST',
    value: 18
  }
]
