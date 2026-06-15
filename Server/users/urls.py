from django.urls import path

from .views import (
    current_user,
    login_user,
    register_user
)

urlpatterns = [

    path(
        'login/',
        login_user
    ),

    path(
        'register/',
        register_user
    ),

    path(
        'me/',
        current_user
    ),

]
