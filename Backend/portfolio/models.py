from django.db import models
from PIL import Image

class Logo(models.Model):
    image = models.ImageField(upload_to='logos/', blank=True, null=True)
    alt_text = models.CharField(max_length=255, default="Portfolio")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Resize image if it's too big
        if self.image:
            img = Image.open(self.image.path)
            max_size = (300, 300)
            if img.height > 300 or img.width > 300:
                img.thumbnail(max_size)
                img.save(self.image.path)

    def __str__(self):
        return self.alt_text or f"Logo {self.id}"


from django.db import models
from PIL import Image

class About(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    bio = models.TextField()
    image = models.ImageField(upload_to='about/')
    morebio = models.TextField(default="More About Me")
    LinkdIn = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    whatsapp = models.URLField(blank=True)
    x_twitter = models.URLField(blank=True, verbose_name="X (Twitter)")

    cta_button_text = models.CharField(max_length=100, default="More About Me")
    cta_button_link = models.URLField(blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)

        max_size = (500, 500)  # Resize to max 500x500px (adjust as needed)
        if img.height > 500 or img.width > 500:
            img.thumbnail(max_size)
            img.save(self.image.path)


from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.title

from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} - {self.percentage}%"


from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    github_link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title




from django.db import models

class ContactInfo(models.Model):
    description = models.TextField(blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    twitter = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.email

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"
