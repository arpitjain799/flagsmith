from django.urls import reverse
from rest_framework import status

from audit.models import AuditLog
from environments.models import Environment
from projects.models import Project


def test_audit_log_can_be_filtered_by_environments(admin_client, project, environment):
    # Given
    audit_env = Environment.objects.create(name="env_n", project=project)

    AuditLog.objects.create(project=project)
    AuditLog.objects.create(project=project, environment=environment)
    AuditLog.objects.create(project=project, environment=audit_env)

    url = reverse("api-v1:audit-list")
    # When
    response = admin_client.get(
        url, {"project": project.id, "environments": [audit_env.id]}
    )
    # Then
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["count"] == 1
    assert response.json()["results"][0]["environment"]["id"] == audit_env.id


def test_audit_log_can_be_filtered_by_log_text(admin_client, project, environment):
    # Given
    flag_state_updated_log = "Flag state updated"
    flag_state_deleted_log = "flag state deleted"

    AuditLog.objects.create(project=project, log="New flag created")
    AuditLog.objects.create(project=project, log=flag_state_updated_log)
    AuditLog.objects.create(project=project, log=flag_state_deleted_log)
    AuditLog.objects.create(project=project, log="New Environment Created")

    url = reverse("api-v1:audit-list")

    # When
    response = admin_client.get(url, {"project": project.id, "search": "flag state"})

    # Then
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["results"][0]["log"] == flag_state_deleted_log
    assert response.json()["results"][1]["log"] == flag_state_updated_log


def test_audit_log_can_be_filtered_by_project(
    admin_client, project, environment, organisation
):
    # Given
    another_project = Project.objects.create(
        name="another_project", organisation=organisation
    )
    AuditLog.objects.create(project=project)
    AuditLog.objects.create(project=project, environment=environment)
    AuditLog.objects.create(project=another_project)

    url = reverse("api-v1:audit-list")

    # When
    response = admin_client.get(url, {"project": project.id})

    # Then
    assert response.json()["count"] == 2
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["results"][0]["project"]["id"] == project.id
    assert response.json()["results"][1]["project"]["id"] == project.id


def test_audit_log_can_be_filtered_by_is_system_event(
    admin_client, project, environment, organisation
):
    # Given
    AuditLog.objects.create(project=project, is_system_event=True)
    AuditLog.objects.create(
        project=project, environment=environment, is_system_event=False
    )

    url = reverse("api-v1:audit-list")

    # When
    response = admin_client.get(url, {"is_system_event": True})

    # Then
    assert response.json()["count"] == 1
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["results"][0]["is_system_event"] is True
