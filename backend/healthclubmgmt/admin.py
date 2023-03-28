from django.contrib import admin
from .models import Training, User, User_log, Activity, ActivityLog, Location, Enrollments


class TrainingAdmin(admin.ModelAdmin):
    list_display = (
        'training_id', 'training_type', 'instructor_name', 'start_time', 'end_time', 'max_capacity', 'current_capacity')


class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'first_name', 'last_name', 'user_type', 'trial_expiry')


class User_logAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'checkin_time', 'checkout_time')


class LocationAdmin(admin.ModelAdmin):
    list_display = ('location_id','location_name', 'location_address')



class EnrollmentsAdmin(admin.ModelAdmin):
    list_display = ('training_id', 'user_id','training_type')



# Register your models here. 
admin.site.register(Training, TrainingAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(User_log, User_logAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Enrollments, EnrollmentsAdmin)
admin.site.register(Activity)
admin.site.register(ActivityLog)
