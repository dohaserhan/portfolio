export type Project = {
    id: number;
    title: string;
    category: string;
    description: string;
    contributions: string[];
    technologies: string[];
    challenge: string;
    image: string;
    featured?: boolean;
    codeSnippet?: string;
    codeLanguage?: string;
    codeFile?: string;
    role: string;
    duration: string;
    domain: string;
};

export const projects: Project[] = [
    {
        id: 1,
        title: "Speech Therapy Platform",
        category: "Healthcare Platform",
        role: "Full Stack Developer",
        duration: "2 Months",
        domain: "Healthcare",

        description:
            "A web platform that helps speech therapists manage patients, therapy sessions, appointments, reports, and daily clinical workflows through a secure backend system.",

        contributions: [
            "⚡ Designed secure **RESTful API endpoints**",
            "🔒 Implemented **JWT authentication** and authorization",
            "📅 Built **appointment scheduling** workflows",
            "🎮 Integrated **JavaScript-based therapy games**",
            "📄 Generated automated **PDF clinical reports**",
        ],

        technologies: [
            "Django",
            "Django REST Framework",
            "PostgreSQL",
            "JWT",
            "React",
            "JavaScript",
            "Docker",
        ],

        challenge:
            "Integrated interactive educational therapy games using vanilla JavaScript to support therapist clinical assignments. This removed the dependency on heavy third-party gaming packages while keeping browser execution extremely fast and secure.",
        image: "/projects/speech-therapy.png",
        featured: true,
        codeFile: "views.py",
        codeLanguage: "python",
        codeSnippet: `from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.db.models import Count, Q, F, Value
from django.db.models.functions import Coalesce

from .models import GameSession, Appointment
from .serializers import GameSessionSerializer, AppointmentCreateSerializer


class GameSessionViewSet(viewsets.ModelViewSet):
    """
    Handles Game Sessions and books seats with Pessimistic Locking
    to guarantee zero double-bookings in high-traffic matchmaker scenarios.
    """
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Solves the N+1 query issue by pre-calculating slots using DB annotations
        return GameSession.objects.select_related('host', 'game').annotate(
            players_count=Coalesce(
                Count('appointments', filter=Q(appointments__status=Appointment.Status.CONFIRMED)), 
                Value(0)
            ),
            spots_left=F('max_players') - F('players_count')
        )

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None) -> Response:
        """
        Locks the target session and books a slot atomically.
        Prevents race conditions if 2 players book the final slot simultaneously.
        """
        serializer = AppointmentCreateSerializer(data={'session': pk}, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        try:
            # Enforce database isolation
            with transaction.atomic():
                # SELECT ... FOR UPDATE locks the row until the transaction commits
                session = GameSession.objects.select_for_update().get(pk=pk)

                # Count current players while holding the row lock
                current_players_count = session.appointments.select_for_update().filter(
                    status=Appointment.Status.CONFIRMED
                ).count()

                # Re-validate capacity inside the database lock
                if current_players_count >= session.max_players:
                    return Response(
                        {"detail": "This game session is already fully booked."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Safely book or reactivate the seat
                appointment, created = Appointment.objects.get_or_create(
                    session=session,
                    player=request.user,
                    defaults={'status': Appointment.Status.CONFIRMED}
                )

                if not created:
                    if appointment.status == Appointment.Status.CONFIRMED:
                        return Response({"detail": "Already joined."}, status=status.HTTP_400_BAD_REQUEST)
                    appointment.status = Appointment.Status.CONFIRMED
                    appointment.save()

                return Response({"detail": "Joined successfully!"}, status=status.HTTP_201_CREATED)

        except GameSession.DoesNotExist:
            return Response({"detail": "Session not found."}, status=status.HTTP_404_NOT_FOUND)
`,
    },
    {
        id: 2,
        title: "Healthcare Management System",
        category: "Healthcare Management Platform",
        role: "Backend Developer",
        duration: "3 Months",
        domain: "Healthcare",

        description:
            "A healthcare management platform developed to support patient records, appointments, billing, inventory, prescriptions, reporting, and daily administrative workflows.",

        contributions: [
            "👥 Built **patient and doctor management** modules",
            "💳 Implemented **appointment and billing** workflows",
            "📦 Developed **inventory tracking** features",
            "📊 Generated automated **Excel and PDF reports**",
            "📈 Created **KPI dashboard** reporting endpoints",
        ],

        technologies: [
            "Django",
            "Django REST Framework",
            "PostgreSQL",
            "JWT",
            "JavaScript",
        ],

        challenge:
            "Coordinated complex relational schemas across patient files, billing logs, and inventory workflows. This maintained strict transactional data integrity and consistent clinical dashboard metrics across the entire application.",

        image: "/projects/healthcare-management.png",
        codeFile: "views.py",
        codeLanguage: "python",
        codeSnippet: `from datetime import datetime, timedelta

from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .utils import generate_otp, send_otp_email


@api_view(["POST"])
def login(request):
    """
    Authenticate users based on their assigned role.

    Internal users receive JWT tokens immediately, while external users
    complete an additional OTP verification step.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    authenticated_user = authenticate(
        request,
        username=username,
        password=password,
    )

    if not authenticated_user or not authenticated_user.is_active:
        return Response(
            {"error": "Invalid credentials."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    role = (
        authenticated_user.groups.values_list("name", flat=True).first()
        or "USER"
    )

    privileged_roles = ["ADMIN", "MANAGER", "STAFF", "SUPPORT"]

    # Privileged users receive JWT tokens immediately.
    if role in privileged_roles:
        refresh = RefreshToken.for_user(authenticated_user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": role,
            },
            status=status.HTTP_200_OK,
        )

    # Standard users must complete OTP verification.
    otp = generate_otp()

    request.session["authentication_otp"] = str(otp)
    request.session["authentication_user_id"] = authenticated_user.pk
    request.session["otp_created_at"] = timezone.now().isoformat()

    send_otp_email(authenticated_user, otp)

    return Response(
        {
            "status": "OTP_SENT",
            "message": "A verification code was sent to the registered email.",
            "expires_in": 300,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def verify_otp(request):
    """
    Validate a session-based OTP and issue JWT tokens after successful
    verification.
    """
    entered_otp = request.data.get("otp")
    stored_otp = request.session.get("authentication_otp")
    user_id = request.session.get("authentication_user_id")
    created_at_value = request.session.get("otp_created_at")

    if not entered_otp:
        return Response(
            {"error": "OTP is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not stored_otp or not user_id or not created_at_value:
        return Response(
            {"error": "Verification session is missing or expired."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        created_at = datetime.fromisoformat(created_at_value)
    except ValueError:
        request.session.flush()

        return Response(
            {"error": "Invalid verification session."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if timezone.is_naive(created_at):
        created_at = timezone.make_aware(created_at)

    if timezone.now() > created_at + timedelta(minutes=5):
        request.session.pop("authentication_otp", None)
        request.session.pop("authentication_user_id", None)
        request.session.pop("otp_created_at", None)

        return Response(
            {"error": "OTP has expired."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if str(stored_otp) != str(entered_otp):
        return Response(
            {"error": "Invalid OTP."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(pk=user_id, is_active=True)
    except User.DoesNotExist:
        return Response(
            {"error": "User account is unavailable."},
            status=status.HTTP_404_NOT_FOUND,
        )

    refresh = RefreshToken.for_user(user)
    role = user.groups.values_list("name", flat=True).first() or "USER"

    # Remove OTP data after successful verification.
    request.session.pop("authentication_otp", None)
    request.session.pop("authentication_user_id", None)
    request.session.pop("otp_created_at", None)

    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "role": role,
        },
        status=status.HTTP_200_OK,
    )`,
    },
    {
        id: 3,
        title: "Medical Center - Microservices Platform",
        category: "Backend Microservices",
        role: "Backend Developer",
        duration: "1 Month",
        domain: "Healthcare",
        description:
            "Contributed to the backend development of a production-grade, microservices-based medical center management platform. Built modular business logic services and secure RESTful APIs using Django REST Framework.",
        contributions: [
            "⚙️ Developed **Assets, Ordering, Patient and Inventory** modules",
            "⚡ Designed and documented **REST API endpoints**",
            "🛡️ Implemented **serializer business validation** checks",
            "🔍 Built **dynamic search and filtering** features",
            "🗄️ Managed **PostgreSQL schemas** and database migrations",
            "🚀 Tested and verified API endpoints using **Postman**",
        ],
        technologies: [
            "Python",
            "Django",
            "Django REST Framework",
            "PostgreSQL",
            "JWT",
            "Git",
            "Postman",
        ],
        challenge:
            "Contributed to the backend of a team-built microservices platform for a medical center by developing the Assets, Ordering, Patient and Inventory modules. The main challenge was ensuring clean integration between these separate modules, which I managed by writing structured Django REST Framework serializers for data validation and managing database migrations in PostgreSQL.",
        image: "/projects/medical-center.png",
        codeFile: "serializers.py",
        codeLanguage: "python",
        codeSnippet: `from django.db import transaction
from rest_framework import serializers

from basket.models import Basket
from .models import Purchase, PurchaseItem
from common.utils import generate_reference_code


class PurchaseConfirmationSerializer(serializers.ModelSerializer):
    basket_id = serializers.UUIDField(write_only=True)
    customer_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Purchase
        fields = [
            "basket_id",
            "customer_id",
            "reference_code",
            "status",
            "subtotal",
            "item_count",
        ]
        read_only_fields = [
            "reference_code",
            "status",
            "subtotal",
            "item_count",
        ]

    def validate(self, attrs):
        basket_id = attrs.get("basket_id")
        customer_id = attrs.get("customer_id")
        workspace_id = self.context.get("workspace_id")

        try:
            basket = Basket.objects.get(
                public_id=basket_id,
                workspace_id=workspace_id,
                is_deleted=False,
            )
        except Basket.DoesNotExist:
            raise serializers.ValidationError(
                {"basket_id": "Basket not found."}
            )

        if basket.customer.public_id != customer_id:
            raise serializers.ValidationError(
                {"customer_id": "This customer does not own the basket."}
            )

        active_items = basket.items.filter(is_deleted=False)

        if not active_items.exists():
            raise serializers.ValidationError(
                {"basket_id": "An empty basket cannot be confirmed."}
            )

        attrs["basket_instance"] = basket
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        basket = validated_data.pop("basket_instance")

        validated_data.pop("basket_id", None)
        validated_data.pop("customer_id", None)

        active_items = list(
            basket.items.filter(is_deleted=False)
        )

        purchase = Purchase.objects.create(
            customer=basket.customer,
            basket=basket,
            reference_code=generate_reference_code(),
            subtotal=basket.total_price,
            item_count=basket.total_items,
            status=Purchase.Status.PENDING,
        )

        purchase_items = [
            PurchaseItem(
                purchase=purchase,
                product=item.product,
                quantity=item.quantity,
                unit_price=item.unit_price,
                subtotal=item.subtotal,
            )
            for item in active_items
        ]

        PurchaseItem.objects.bulk_create(purchase_items)

        basket.items.filter(
            pk__in=[item.pk for item in active_items]
        ).update(is_deleted=True)

        basket.total_items = 0
        basket.total_price = 0
        basket.save(update_fields=["total_items", "total_price"])

        return purchase`,
    },
    {
        id: 4,
        title: "Academic Management Platform",
        category: "Full-Stack Web Development",
        role: "Full Stack Developer",
        duration: "1 Month (Ongoing)",
        domain: "Education",
        description:
            "Contributing to a comprehensive academic management platform built with Laravel, Blade, and MySQL. Implementing backend functionality and user-facing interfaces for academic workflows, role-based access, agenda management, and administrative operations.",
        contributions: [
            "🏫 Developing **Laravel backend workflows** for administrative operations",
            "💻 Building and integrating interactive **Blade interfaces**",
            "📚 Building **assignment and agenda management** workflows",
            "🔍 Implementing **dynamic filtering, search, and pagination**",
            "🔑 Enforcing **role-based access controls** and permissions",
            "🗄️ Managing relational data structures using **MySQL**",
        ],
        technologies: [
            "Laravel",
            "Blade",
            "MySQL",
            "JavaScript",
            "Bootstrap",
            "Git",
        ],
        challenge:
            "Supporting multiple user roles and interconnected academic workflows while keeping data access consistent across the platform. Contributing to reusable Laravel controller logic and dynamic Blade views that adapt to teacher and student responsibilities.",
        image: "/projects/academic-management.png",
        codeFile: "ActivityController.php",
        codeLanguage: "php",
        codeSnippet: `<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Group;
use App\Models\Topic;
use App\Repositories\ActivityRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Builds a flattened structure from a nested permission hierarchy.
     *
     * Related names are loaded in bulk to avoid N+1 database queries.
     */
    public function structure(int $organizationId): JsonResponse
    {
        $permittedStructure = session('permitted_structure');

        if (
            !is_array($permittedStructure) ||
            empty($permittedStructure['periods'])
        ) {
            return response()->json(['categories' => []]);
        }

        $categoryIds = [];
        $groupIds = [];
        $topicIds = [];

        /*
         * Collect all related IDs before querying the database.
         */
        foreach ($permittedStructure['periods'] as $period) {
            $organization = $period['organizations'][$organizationId] ?? null;

            if (!$organization) {
                continue;
            }

            foreach ($organization['categories'] ?? [] as $categoryId => $categoryData) {
                $categoryIds[] = $categoryId;

                foreach ($categoryData['levels'] ?? [] as $level) {
                    foreach ($level['groups'] ?? [] as $groupId => $groupData) {
                        $groupIds[] = $groupId;

                        foreach ($groupData['topics'] ?? [] as $topicId) {
                            $topicIds[] = $topicId;
                        }
                    }
                }
            }
        }

        /*
         * Load names in bulk to minimize database round trips.
         */
        $categories = Category::query()
            ->whereIn('id', array_unique($categoryIds))
            ->get(['id', 'name', 'name_en'])
            ->keyBy('id');

        $groups = Group::query()
            ->whereIn('id', array_unique($groupIds))
            ->get(['id', 'name', 'name_en'])
            ->keyBy('id');

        $topics = Topic::query()
            ->whereIn('id', array_unique($topicIds))
            ->get(['id', 'name', 'name_en'])
            ->keyBy('id');

        $locale = app()->getLocale();
        $result = [];

        /*
         * Build a localized, flattened response.
         */
        foreach ($permittedStructure['periods'] as $period) {
            $organization = $period['organizations'][$organizationId] ?? null;

            if (!$organization) {
                continue;
            }

            foreach ($organization['categories'] ?? [] as $categoryId => $categoryData) {
                $category = $categories->get($categoryId);

                $defaultCategoryName = $category?->name ?? "Category {$categoryId}";
                $englishCategoryName = $category?->name_en ?: $defaultCategoryName;

                $categoryItem = [
                    'id' => $categoryId,
                    'name' => $locale === 'en'
                        ? $englishCategoryName
                        : $defaultCategoryName,
                    'name_en' => $englishCategoryName,
                    'groups' => [],
                    'topics' => [],
                ];

                foreach ($categoryData['levels'] ?? [] as $level) {
                    foreach ($level['groups'] ?? [] as $groupId => $groupData) {
                        $group = $groups->get($groupId);

                        $defaultGroupName = $group?->name ?? "Group {$groupId}";
                        $englishGroupName = $group?->name_en ?: $defaultGroupName;

                        $categoryItem['groups'][$groupId] = [
                            'id' => $groupId,
                            'name' => $locale === 'en'
                                ? $englishGroupName
                                : $defaultGroupName,
                            'name_en' => $englishGroupName,
                        ];

                        foreach ($groupData['topics'] ?? [] as $topicId) {
                            $topic = $topics->get($topicId);

                            $defaultTopicName = $topic?->name ?? "Topic {$topicId}";
                            $englishTopicName = $topic?->name_en ?: $defaultTopicName;

                            $categoryItem['topics'][$topicId] = [
                                'id' => $topicId,
                                'name' => $locale === 'en'
                                    ? $englishTopicName
                                    : $defaultTopicName,
                                'name_en' => $englishTopicName,
                            ];
                        }
                    }
                }

                $categoryItem['groups'] = array_values(
                    $categoryItem['groups']
                );

                $categoryItem['topics'] = array_values(
                    $categoryItem['topics']
                );

                $result[] = $categoryItem;
            }
        }

        return response()->json([
            'categories' => $result,
        ]);
    }

    /**
     * Returns grouped activity metrics for dashboard visualizations.
     */
    public function statistics(Request $request): JsonResponse
    {
        $activities = ActivityRepository::query($request)
            ->where('activities.is_archived', false)
            ->get();

        return response()->json([
            'weekly' => $this->prepareWeeklyStatistics($activities),
            'group_distribution' => $this->prepareGroupStatistics(
                $activities,
                $request
            ),
            'type_distribution' => $this->prepareTypeStatistics($activities),
            'topic_distribution' => $this->prepareTopicStatistics(
                $activities,
                $request
            ),
        ]);
    }

    /**
     * Builds chart datasets grouped by topics and groups.
     */
    private function prepareTopicStatistics(
        $activities,
        Request $request
    ): array {
        if ($request->filled('category_id')) {
            $topics = collect(
                TopicRepository::getPermittedTopics(
                    categoryId: $request->integer('category_id'),
                    organizationId: $request->integer('organization_id'),
                )
            );
        } else {
            $topics = $activities
                ->pluck('topic_name', 'topic_id')
                ->unique()
                ->map(
                    fn ($name, $id) => (object) [
                        'id' => $id,
                        'name' => $name ?: 'Unspecified topic',
                    ]
                );
        }

        if ($topics->isEmpty()) {
            return [
                'labels' => [],
                'datasets' => [],
            ];
        }

        $groupIds = $activities
            ->pluck('group_id')
            ->filter()
            ->unique();

        $groupNames = Group::query()
            ->whereIn('id', $groupIds)
            ->pluck('name', 'id');

        $labels = $topics
            ->map(
                fn ($topic) => is_array($topic)
                    ? $topic['name']
                    : $topic->name
            )
            ->values();

        $chartColors = [
            '#836AF9',
            '#28DAC6',
            '#FFE800',
            '#2B9AFF',
            '#FF9F43',
            '#FB1E25',
            '#00CFD5',
        ];

        $datasets = [];

        foreach ($groupIds->values() as $index => $groupId) {
            $data = [];

            foreach ($topics as $topic) {
                $topicId = is_array($topic)
                    ? $topic['id']
                    : $topic->id;

                $data[] = $activities
                    ->where('topic_id', $topicId)
                    ->where('group_id', $groupId)
                    ->count();
            }

            $datasets[] = [
                'label' => $groupNames[$groupId] ?? "Group {$groupId}",
                'data' => $data,
                'backgroundColor' => $chartColors[
                    $index % count($chartColors)
                ],
                'borderRadius' => 5,
            ];
        }

        return [
            'labels' => $labels,
            'datasets' => $datasets,
        ];
    }
}`,
    },
];
