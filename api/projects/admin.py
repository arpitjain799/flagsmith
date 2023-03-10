# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from environments.models import Environment
from features.models import Feature
from projects.models import Project
from projects.tags.models import Tag
from segments.models import Segment


class EnvironmentInline(admin.StackedInline):
    model = Environment
    extra = 0
    show_change_link = True
    fields = ("name", "api_key", "minimum_change_request_approvals")


class FeatureInline(admin.StackedInline):
    model = Feature
    extra = 0
    show_change_link = True
    fields = (
        "name",
        "description",
        "initial_value",
        "default_enabled",
        "type",
        "is_archived",
    )


class SegmentInline(admin.StackedInline):
    model = Segment
    extra = 0
    show_change_link = True
    fields = ("name", "description")


class TagInline(admin.StackedInline):
    model = Tag
    extra = 0
    show_change_link = True
    fields = ("label", "description", "color")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    date_hierarchy = "created_date"
    inlines = [EnvironmentInline, FeatureInline, SegmentInline, TagInline]
    list_display = (
        "name",
        "organisation",
        "created_date",
    )
    list_filter = ("created_date", "enable_dynamo_db")
    list_select_related = ("organisation",)
    search_fields = ("organisation__name",)
    fields = (
        "name",
        "organisation",
        "hide_disabled_flags",
        "enable_dynamo_db",
        "enable_realtime_updates",
    )
