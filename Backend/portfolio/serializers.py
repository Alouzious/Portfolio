# portfolio/serializers.py

from rest_framework import serializers
from .models import Logo

class LogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logo
        fields = ['id', 'image', 'alt_text', 'uploaded_at']


from rest_framework import serializers
from .models import About

class AboutSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # So frontend gets full URL

    class Meta:
        model = About
        fields = [
            'id',
            'name',
            'title',
            'bio',
            'morebio',
            'image',
            'LinkdIn',
            'instagram',
            'whatsapp',
            'x_twitter',
            'cta_button_text',
            'cta_button_link',
        ]


from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

from rest_framework import serializers
from .models import Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'github_link']


from rest_framework import serializers
from .models import ContactInfo, ContactMessage

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

    def validate_message(self, value):
        if len(value) > 1000:
            raise serializers.ValidationError("Message is too long.")
        return value
