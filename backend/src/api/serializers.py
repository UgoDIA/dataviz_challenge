from rest_framework import serializers

class vp_elec_serializers(serializers.Serializer):
    libelle_commune = serializers.CharField()
    year_2022 = serializers.IntegerField()
    year_2021 = serializers.IntegerField()
    year_2020 = serializers.IntegerField()
    year_2019 = serializers.IntegerField()
    year_2018 = serializers.IntegerField()
    year_2017 = serializers.IntegerField()
    year_2016 = serializers.IntegerField()
    year_2015 = serializers.IntegerField()
    year_2014 = serializers.IntegerField()
    year_2013 = serializers.IntegerField()
    year_2012 = serializers.IntegerField()
    year_2011 = serializers.IntegerField()
    year_2010 = serializers.IntegerField()
