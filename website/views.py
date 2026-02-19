from django.shortcuts import render,redirect
from .models import Course, Testimonials
from .forms import ContactForm
import requests
from django.http import HttpResponse
from django.contrib.auth.models import User

def home(request):
    testimonials = Testimonials.objects.all().order_by('-date_posted')[:3]
    return render(request, 'website/home.html', {'testimonials' : testimonials})

def about(request):
    return render(request, 'website/about.html')

def contact(request):
    selected_course = request.GET.get('course')
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_instance = form.save()

            bot_token ='8485056319:AAGfZm25ZwsQFG3Wb4ieHLkVI2YuApLjSdU'
            chat_id = '1636866465'
            message = (
                f"🔔 *New student Inquiry!*\n\n"
                f"*Name:* {contact_instance.name}\n"
                f"*Phone:* {contact_instance.phone}\n"
                f"*Email:* {contact_instance.email}\n"
                f"*Subject:* {contact_instance.subject}\n"
                f"*Message:* {contact_instance.message}"
            )

            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            payload = {
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'Markdown'
            }

            try:
                requests.post(url, data=payload)
            except Exception as e :
                print(f"Error sending Telegram message: {e}")


            return render(request, 'website/contact.html', {'success': True})
    else:
        initial = {}
        if selected_course:
            initial["subject"] = f"Inquiry for {selected_course}"
        form = ContactForm(initial=initial)

    return render(request, 'website/contact.html', {'form' : form, 'selected_course': selected_course})
        

def courses(request):

    all_courses = Course.objects.all()

    return render(request, 'website/courses.html', {'courses' : all_courses})



# def create_emergency_admin(request):
#     try:
#         if not User.objects.filter(username='render_admin').exists():
#             User.objects.create_superuser('render_admin', 'admin@example.com', 'TemporaryPass123!')
#             return HttpResponse("Success: User 'render_admin' created.")
#         else:
#             return HttpResponse("User already exist!.")
#     except Exception as e:
#         return HttpResponse(f"Error: {str(e)}")