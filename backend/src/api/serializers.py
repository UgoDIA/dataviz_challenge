from rest_framework import serializers

class vp_elec_serializers(serializers.Serializer):
    libelle_commune = serializers.CharField()
    year = serializers.IntegerField()
    value = serializers.IntegerField(allow_null=True)
    code = serializers.IntegerField()

class prod_serializers(serializers.Serializer):
    year = serializers.IntegerField()
    value = serializers.IntegerField()