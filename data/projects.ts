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
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Speech Therapy Platform",
    category: "Healthcare Platform",

    description:
      "A web platform that helps speech therapists manage patients, therapy sessions, appointments, reports, and daily clinical workflows through a secure backend system.",

    contributions: [
      "Designed secure RESTful API endpoints",
      "Implemented JWT authentication and authorization",
      "Built appointment scheduling workflows",
      "Integrated JavaScript-based therapy games",
      "Generated automated PDF clinical reports",
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
    codeSnippet: `class UserLoginView(APIView):
    authentication_classes = ()

    @csrf_exempt
    def post(self, request):
        # 1. Basic Serializer Validation (checks inputs exist)
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username = request.data['username']
        password = request.data['password']

        # 2. Authenticate (Checks DB, Password, and is_active=True automatically!)
        user = authenticate(request, username=username, password=password)

        if user is not None:
            user.last_login = timezone.now()
            user.save()

            refresh = RefreshToken.for_user(user)

            # Optional: Return user role/group so frontend knows if it's Doctor or Patient
            group_name = user.groups.first().name if user.groups.exists() else None

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                # 'username': user.username,
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': group_name,  # Duplicate here if useful for the UI
                },
                'role': group_name,
            }, status=status.HTTP_200_OK)

        try:
            existing_user = User.objects.get(username=username)
            if not existing_user.is_active:
                return Response({
                    'message': 'User not active.',  # Frontend checks this specific string
                    'error': 'User not active.'  # Fallback
                }, status=status.HTTP_403_FORBIDDEN)
        except User.DoesNotExist:
            pass  # Continue to generic error

        return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)`,
  },
  {
    id: 2,
    title: "Clinic Management System",
    category: "Healthcare Management Platform",

    description:
      "A clinic management platform developed to support patient records, appointments, billing, inventory, prescriptions, reporting, and daily administrative workflows.",

    contributions: [
      "Built patient and doctor management modules",
      "Implemented appointment and billing workflows",
      "Developed inventory tracking features",
      "Generated automated Excel and PDF reports",
      "Created KPI dashboard reporting endpoints",
    ],

    technologies: ["Django", "PostgreSQL", "JavaScript", "Bootstrap"],

    challenge:
      "Coordinated complex relational schemas across patient files, billing logs, and inventory workflows. This maintained strict transactional data integrity and consistent clinical dashboard metrics across the entire application.",

    image: "/projects/clinic-management.png",
    codeFile: "report_generator.py",
    codeLanguage: "python",
    codeSnippet: `if export_format == "xlsx":
    output = BytesIO()

    workbook = Workbook()
    worksheet = workbook.active
    worksheet.title = "Report"

    worksheet.append(headers)

    for row in rows:
        worksheet.append(row)

    workbook.save(output)

elif export_format == "pdf":
    html_content = render_to_string(
        "reports/generic_report.html",
        {"headers": headers, "rows": rows},
    )

else:
    writer = csv.writer(output)
    writer.writerow(headers)
    writer.writerows(rows)`,
  },
  {
    id: 3,
    title: "Zrariyeh Management System",
    category: "Backend Microservices",
    description:
      "Contributed to a production-grade microservices management platform by implementing the backend modules for Assets, Patients, and Services. Built modular business logic services and secure RESTful APIs using Django REST Framework.",
    contributions: [
      "Developed Assets, Patients, and Services modules",
      "Designed and documented REST API endpoints",
      "Implemented serializer business validation checks",
      "Built dynamic search and filtering features",
      "Managed PostgreSQL schemas and database migrations",
      "Tested and verified API endpoints using Postman",
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
      "Designed decoupled service-layer boundaries and PostgreSQL database separation between the Assets, Patients, and Services modules. Handled this by using strict cross-module validation wrappers and unified internal API client interfaces to keep components isolated.",
    image: "/projects/zrariyeh-management.png",
    codeFile: "views.py",
    codeLanguage: "python",
    codeSnippet: `class ResourceListView(TenantContextMixin, APIView):
    serializer_class = ResourceFilterSerializer

    def get(self, request):
        tenant_id = self.get_tenant_id(request)

        filter_serializer = self.serializer_class(
            data=request.query_params,
            partial=True,
            context={"tenant_id": tenant_id},
        )
        filter_serializer.is_valid(raise_exception=True)

        validated_data = filter_serializer.validated_data

        category = validated_data.get("category")
        status_filter = request.query_params.get("status")
        code_filter = request.query_params.get("code")

        base_query = Q(
            tenant_id=tenant_id,
            is_deleted=False,
        )

        filters = Q()

        if category:
            filters &= Q(category=category)

        if status_filter:
            filters &= Q(status__iexact=status_filter)

        if code_filter:
            filters &= Q(code__icontains=code_filter)

        response_data = build_paginated_response(
            request=request,
            model=Resource,
            serializer_class=ResourceSerializer,
            base_query=base_query,
            filters=filters if filters else None,
        )

        return Response(response_data)`,
  },
  {
    id: 4,
    title: "School Management System",
    category: "Full-Stack Web Development",
    description:
      "Contributed to a comprehensive school management platform built with Laravel, Blade, and MySQL. Implemented backend functionality and user-facing interfaces for academic workflows, role-based access, agenda management, and school operations.",
    contributions: [
      "Developed Laravel backend workflows for school operations",
      "Built and integrated interactive Blade interfaces",
      "Built assignment and agenda management workflows",
      "Implemented dynamic filtering, search, and pagination",
      "Enforced role-based access controls and permissions",
      "Managed relational data structures using MySQL",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "Blade",
      "MySQL",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Git",
    ],
    challenge:
      "Supporting multiple user roles and interconnected academic workflows while keeping data access consistent across the platform. Contributed to reusable Laravel controller logic and dynamic Blade views that adapted to teacher and student responsibilities.",
    image: "/projects/school-management.png",
    codeFile: "Record.php",
    codeLanguage: "php",
    codeSnippet: `class Record extends Model
{
    /**
     * Retrieve localized school records with category, group and owner joins.
     */
    public static function getRecords(Request $request)
    {
        $locale = app()->getLocale();

        $query = Record::query()
            ->where('records.is_deleted', false)
            ->leftJoin('categories', 'records.category_id', '=', 'categories.id')
            ->leftJoin('groups', 'records.group_id', '=', 'groups.id')
            ->leftJoin('owners', 'records.owner_id', '=', 'owners.id')
            ->select(
                'records.id',
                'records.title',
                'records.status',
                'records.start_date',
                'records.end_date',

                $locale === 'en'
                    ? DB::raw('COALESCE(categories.name_en, categories.name) AS category')
                    : 'categories.name AS category'
            );

        return $query;
    }`,
  },
];
