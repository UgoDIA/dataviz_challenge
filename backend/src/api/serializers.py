from rest_framework import serializers

class vp_elec_serializers(serializers.Serializer):
    libelle_commune = serializers.CharField()
    year = serializers.IntegerField()
    value = serializers.IntegerField()
    code = serializers.IntegerField()
