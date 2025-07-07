# portfolio/views.py
from rest_framework.generics import RetrieveAPIView
from rest_framework import viewsets
from .models import Logo, About
from .serializers import LogoSerializer,AboutSerializer



class LogoViewSet(viewsets.ModelViewSet):
    queryset = Logo.objects.all()
    serializer_class = LogoSerializer

class AboutDetailView(RetrieveAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer

    def get_object(self):
        # Return first About instance (assuming only one)
        return self.queryset.first()


from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.pagination import PageNumberPagination

class ProjectPagination(PageNumberPagination):
    page_size = 3  # show 3 projects per page

class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination


from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

from rest_framework.generics import ListAPIView
from .models import Skill
from .serializers import SkillSerializer

class SkillListView(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ContactInfo
from .serializers import ContactInfoSerializer, ContactMessageSerializer

@api_view(['GET'])
def get_contact_info(request):
    try:
        info = ContactInfo.objects.first()
        serializer = ContactInfoSerializer(info)
        return Response(serializer.data)
    except ContactInfo.DoesNotExist:
        return Response({"error": "No contact info found"}, status=status.HTTP_404_NOT_FOUND)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from .serializers import ContactMessageSerializer

class SendMessageAPIView(APIView):  # ✅ No decorator here
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save to DB

            # Send email
            subject = serializer.validated_data['subject']
            name = serializer.validated_data['name']
            email = serializer.validated_data['email']
            message = serializer.validated_data['message']

            full_message = (
                f"New contact form message:\n\n"
                f"From: {name} <{email}>\n\n"
                f"Message:\n{message}"
            )

            send_mail(
                subject=f"[Portfolio Contact] {subject}",
                message=full_message,
                from_email='alouzious@gmail.com',  # Replace with your sender
                recipient_list=['alouzious@gmail.com'],  # Replace with your receiving address
                fail_silently=False,
            )

            return Response({"detail": "Message sent and saved."}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
