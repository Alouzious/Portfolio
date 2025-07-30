from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LogoViewSet, AboutDetailView, ServiceViewSet,SkillListView  # import ServiceViewSet
from . import views
from .views import SendMessageAPIView,ProjectListAPIView

router = DefaultRouter()
router.register(r'logos', LogoViewSet)
router.register(r'services', ServiceViewSet)  # ✅ Register your services route

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/about/', AboutDetailView.as_view(), name='about-detail'),
    path('api/skills/', SkillListView.as_view(), name='skills-list'),
    path('api/contact-info/', views.get_contact_info, name='contact-info'),
    path('api/send-message/', SendMessageAPIView.as_view(), name='send-message'),
    path('api/projects/', ProjectListAPIView.as_view(), name='projects-list')
]
