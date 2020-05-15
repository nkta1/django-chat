from django.db import models


class Room(models.Model):
    name = models.CharField(max_length=1000, verbose_name="Room name")
    description = models.TextField(verbose_name="Chat room description")

    class Meta:
        verbose_name = 'Room'
        verbose_name_plural = 'Rooms'

    def __str__(self):
        return "{}".format(self.name)
