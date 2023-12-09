import csv
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import *
import json
from django.http import JsonResponse

@api_view(['GET'])
def vp_elec(request):
    libelle_commune = request.query_params.get('name', None)
    year = request.query_params.get('year', None)

    data = []
    with open('data/vp_elec.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            for year_field in ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010']:
                value = row[year_field]
                value = int(value) if value else None  # Convert empty string to None
                data.append({
                    'libelle_commune': row['libellé commune'],
                    'year': int(year_field),
                    'value': value,
                    'code': int(row['code commune']),
                })

    filtered_data = data

    if libelle_commune:
        filtered_data = [item for item in filtered_data if item['libelle_commune'] == libelle_commune]

    if year:
        filtered_data = [item for item in filtered_data if item.get('year') == int(year)]

    if not filtered_data:
        return Response({"error": "No data found for the provided parameters"}, status=404)

    serializer = vp_elec_serializers(filtered_data, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def geo_json(request):
    
    json_file_path = 'data/geo.json'

    try:
        with open(json_file_path, 'r') as file:
            json_data = json.load(file)
            return JsonResponse(json_data)
    except FileNotFoundError:
        return JsonResponse({"error": "JSON file not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@api_view(['GET'])
def prod(request):
    data = []
    with open('data/linear_prod.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            data.append({
                'year': int(row['Year']),
                'value': float(row['Total Production (MWh)'])
            })

    serializer = prod_serializers(data, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def conso(request):
    data = []
    with open('data/linear_conso.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            data.append({
                'year': int(row['Année']),
                'value': float(row['Consommation (MWh)']),
                'commune' : str(row['Commune'])
            })

    serializer = conso_serializers(data, many=True)

    return Response(serializer.data)