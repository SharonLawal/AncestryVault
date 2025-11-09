from rest_framework import serializers
from .models import Person
import uuid
from .supabase_client import supabase
class PersonSerializer(serializers.ModelSerializer):
    parents = serializers.PrimaryKeyRelatedField(many=True, queryset=Person.objects.all(), required=False)
    spouse = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all(), required=False, allow_null=True)
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Person
        fields = [
            'id', 'fullname', 'date_of_birth', 'gender', 'profession',
            'profile_picture', 'video_description', 'parents', 'spouse', 'children'
        ]

    def create(self,validated_data):
        profile_picture = validated_data.pop('profile_picture', None)
        video_description = validated_data.pop('video_description', None)
        parents_data = validated_data.pop('parents', [])
        spouse_data = validated_data.pop('spouse', None)

        person = Person.objects.create(**validated_data)

        if profile_picture:
            filename = f'profile_picture/{uuid.uuid4()}_{profile_picture.name}'
            res= supabase.storage.from_('media').upload(filename, profile_picture.read())
            if res:
                public_url = supabase.storage.from_('media').get_public_url(filename)
                person.profile_picture = public_url
            
        if video_description:
                filename = f'video_description/{uuid.uuid4()}_{video_description.name}'
                res=supabase.storage.from_('media').upload(filename, video_description.read())
                if res:
                    public_url = supabase.storage.from_('media').get_public_url(filename)
                    person.video_description = public_url
        
            
        if parents_data:
            person.parents.set(parents_data)
        if spouse_data:
            person.spouse = spouse_data
        person.save()
        return person

    def update(self, instance, validated_data):
        parents = validated_data.pop('parents', None)
        for attr, value in validated_data.items():
            setattr(instance,attr,value)
        instance.save()
        if parents is not None:
            instance.parents.set(parents)
        return instance 