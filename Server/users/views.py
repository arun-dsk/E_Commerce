import jwt
import datetime

from django.conf import settings
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User


def user_response(user):
    return {
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
    }


def create_token(user):
    now = datetime.datetime.utcnow()

    payload = {
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "exp": now + datetime.timedelta(days=1),
        "iat": now,
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm="HS256"
    )


def get_bearer_token(request):
    auth_header = request.headers.get(
        "Authorization",
        ""
    )

    if not auth_header.startswith("Bearer "):
        return None

    return auth_header.split(" ", 1)[1].strip()


def verify_token(request):
    token = get_bearer_token(request)

    if not token:
        return None, Response({
            "error": "Authentication token is required"
        }, status=401)

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )

    except jwt.ExpiredSignatureError:
        return None, Response({
            "error": "Session expired. Please login again."
        }, status=401)

    except jwt.InvalidTokenError:
        return None, Response({
            "error": "Invalid authentication token"
        }, status=401)

    return payload, None


# LOGIN USER
@api_view(['POST'])
def login_user(request):

    data = request.data
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return Response({
            "error": "Email and password are required"
        }, status=400)

    user = User.objects(email=email).first()

    if not user:
        return Response({
            "error": "Invalid email or password"
        }, status=401)

    password_is_valid = check_password(
        password,
        user.password
    )

    if not password_is_valid and user.password == password:
        user.password = make_password(password)
        user.save()
        password_is_valid = True

    if not password_is_valid:
        return Response({
            "error": "Invalid email or password"
        }, status=401)

    return Response({
        "token": create_token(user),
        "user": user_response(user)
    })


# REGISTER USER
@api_view(['POST'])
def register_user(request):

    data = request.data
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return Response({
            "error": "Name, email and password are required"
        }, status=400)

    if len(password) < 6:
        return Response({
            "error": "Password must be at least 6 characters"
        }, status=400)

    # Check Existing User
    user = User.objects(
        email=email
    ).first()

    if user:

        return Response({
            "error": "User already exists"
        }, status=400)

    # Create User
    new_user = User(

        name=name,

        email=email,

        password=make_password(password)

    )

    new_user.save()

    return Response({
        "message": "User Registered Successfully",
        "token": create_token(new_user),
        "user": user_response(new_user)
    })


# CURRENT USER
@api_view(['GET'])
def current_user(request):
    payload, error_response = verify_token(request)

    if error_response is not None:
        return error_response

    user = User.objects(id=payload["id"]).first()

    if not user:
        return Response({
            "error": "User not found"
        }, status=404)

    return Response({
        "user": user_response(user)
    })
