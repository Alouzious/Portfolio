from django.contrib import admin


from django.contrib import admin
from .models import Logo

@admin.register(Logo)
class LogoAdmin(admin.ModelAdmin):
    list_display = ['id', 'alt_text', 'uploaded_at']
    readonly_fields = ['uploaded_at']


from django.contrib import admin
from .models import About

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'short_bio','morebio', 'image_preview', 'LinkdIn', 'instagram', 'whatsapp', 'x_twitter')
    search_fields = ('name', 'title')
    list_filter = ('title',)

    def short_bio(self, obj):
        return (obj.bio[:75] + '...') if len(obj.bio) > 75 else obj.bio
    short_bio.short_description = 'Bio'

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" style="border-radius: 50%;" />'
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = 'Image'


from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']
from django.contrib import admin
from .models import Skill

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'percentage']



from django.contrib import admin
from .models import Project
from django.utils.html import format_html

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'github_link', 'admin_image_preview')

    def admin_image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 50px;"/>', obj.image.url)
        return '-'
    admin_image_preview.short_description = 'Image Preview'


from django.contrib import admin
from .models import ContactInfo, ContactMessage

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('description','email', 'phone', 'twitter', 'github', 'facebook', 'linkedin')
    search_fields = ('email', 'phone')
    list_per_page = 10


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'subject', 'message')
    date_hierarchy = 'created_at'
    list_per_page = 20
