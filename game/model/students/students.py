from django.db import models

class Person(models.Model):
    id_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    image_url = models.URLField()
    gender = models.CharField(max_length=10)
    shirt_size = models.CharField(max_length=10)
    pants_size = models.CharField(max_length=10)

    def __str__(self):
        return self.name

