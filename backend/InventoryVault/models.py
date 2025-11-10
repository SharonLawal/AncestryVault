from django.db import models

# Create your models here.
class Person(models.Model):
    GENDER_CHOICE = [
        ("M", "male"),
        ("F", "female"),
        ("O", "other"),
    ]
    fullname = models.CharField(max_length=500)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICE)
    profession = models.CharField(max_length=500, blank= True, null=True)
    description= models.TextField(blank=True, null=True)
    profile_picture=models.ImageField( max_length=500, upload_to="profile_picture/", blank=True,null=True )
    video_description= models.FileField(max_length=500, upload_to="video_description/", blank=True, null=True)

    parents = models.ManyToManyField('self', symmetrical=False, related_name="children", blank=True)
    spouse = models.OneToOneField("self", on_delete=models.SET_NULL, null=True, blank=True, related_name="partner")

def __str__(self):
    return self.fullname
