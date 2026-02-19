from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField( max_digits=10, decimal_places=2)
    teacher_name = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    subject = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
    


class Testimonials(models.Model):
    student_name = models.CharField(max_length=100)
    course_taken = models.CharField(max_length=100)
    review_text = models.TextField()
    rating = models.IntegerField(default=5)
    date_posted = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.student_name}"
