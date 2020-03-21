from django.http import JsonResponse


def is_authenticated(request):
    return JsonResponse({"is_authenticated": request.user.is_authenticated})
