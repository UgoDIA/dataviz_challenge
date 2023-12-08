import csv
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import vp_elec_serializers

@api_view(['GET'])
def vp_elec(request):
    libelle_commune = request.query_params.get('libelle_commune', None)

    data = []
    with open('data/vp_elec.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            data.append({
                'libelle_commune': row['libellé commune'],
                'year_2022': int(row['2022']),
            })

    if libelle_commune:
        filtered_data = [item for item in data if item['libelle_commune'] == libelle_commune]
        if not filtered_data:
            return Response({"error": "No data found for the provided libelle_commune"}, status=404)
        serializer = vp_elec_serializers(filtered_data, many=True)
    else:
        serializer = vp_elec_serializers(data, many=True)

    return Response(serializer.data)
