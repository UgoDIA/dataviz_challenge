from rest_framework import serializers

class vp_elec_serializers(serializers.Serializer):
    libelle_commune = serializers.CharField()
    year_2022 = serializers.IntegerField()
