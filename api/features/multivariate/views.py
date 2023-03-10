from core.permissions import HasMasterAPIKey
from drf_yasg2.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from features.models import Feature
from projects.permissions import (
    NestedProjectMasterAPIKeyPermissions,
    NestedProjectPermissions,
)

from .models import MultivariateFeatureOption
from .serializers import MultivariateFeatureOptionSerializer


class MultivariateFeatureOptionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        NestedProjectPermissions | NestedProjectMasterAPIKeyPermissions
    ]
    serializer_class = MultivariateFeatureOptionSerializer

    def get_permissions(self):
        action_permission_map = {
            "list": "VIEW_PROJECT",
            "detail": "VIEW_PROJECT",
            "create": "CREATE_FEATURE",
            "update": "CREATE_FEATURE",
            "partial_update": "CREATE_FEATURE",
            "destroy": "CREATE_FEATURE",
        }

        permission_kwargs = {
            "action_permission_map": action_permission_map,
            "get_project_from_object_callable": lambda o: o.feature.project,
        }
        return [
            permission(**permission_kwargs) for permission in self.permission_classes
        ]

    def get_queryset(self):
        feature = get_object_or_404(Feature, pk=self.kwargs["feature_pk"])
        return feature.multivariate_options.all()


@swagger_auto_schema(
    responses={200: MultivariateFeatureOptionSerializer()}, method="get"
)
@api_view(["GET"])
@permission_classes([IsAuthenticated | HasMasterAPIKey])
def get_mv_feature_option_by_uuid(request, uuid):
    if getattr(request, "master_api_key", None):
        accessible_projects = request.master_api_key.organisation.projects.all()
    else:
        accessible_projects = request.user.get_permitted_projects(["VIEW_PROJECT"])
    qs = MultivariateFeatureOption.objects.filter(
        feature__project__in=accessible_projects
    )
    mv_option = get_object_or_404(qs, uuid=uuid)
    serializer = MultivariateFeatureOptionSerializer(instance=mv_option)
    return Response(serializer.data)
