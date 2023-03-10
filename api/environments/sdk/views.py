from core.constants import FLAGSMITH_UPDATED_AT_HEADER
from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.views import APIView

from environments.authentication import EnvironmentKeyAuthentication
from environments.models import Environment
from environments.permissions.permissions import EnvironmentKeyPermissions


class SDKEnvironmentAPIView(APIView):
    permission_classes = (EnvironmentKeyPermissions,)

    def get_authenticators(self):
        return [EnvironmentKeyAuthentication(required_key_prefix="ser.")]

    def get(self, request: HttpRequest) -> Response:
        environment_document = Environment.get_environment_document(
            request.environment.api_key
        )
        updated_at = self.request.environment.updated_at
        return Response(
            environment_document,
            headers={FLAGSMITH_UPDATED_AT_HEADER: updated_at.timestamp()},
        )
