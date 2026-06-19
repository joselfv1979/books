---
name: books-java-api
description: >
  Use this skill for ANY task involving the Java/Spring Boot backend of the Books project
  (books-java-api). Triggers on: generating new controllers, services, repositories, models or DTOs;
  reviewing or improving existing Java code; fixing bugs; refactoring; writing Spring Boot tests;
  and working with security (JWT), exception handling, or file upload. Always use this skill when
  the user mentions @RestController, @Service, DTOs, ModelMapper, ResourceNotFoundException,
  GlobalExceptionHandler, ApiResponse, or any Java/Spring Boot concept in this project — even if
  they don't explicitly say "use the skill".
---

# Books Java API — Skill

## Project context

- **Stack**: Java, Spring Boot, Spring Security (JWT), Spring Data MongoDB, Lombok, ModelMapper
- **Root**: `books-java-api/src/main/java/com/jose/books/`
- **Tests**: `books-java-api/src/test/`
- **DB**: MongoDB

## Package structure

```
com.jose.books/
├── BooksApplication.java
├── controller/       # @RestController classes
├── dto/              # Data Transfer Objects (no persistence annotations)
├── exceptions/       # GlobalExceptionHandler, ResourceNotFoundException
├── model/            # @Document entities (MongoDB)
├── payload/
│   ├── request/      # LoginRequest, SignupRequest
│   └── response/     # ApiResponse<T>, UserInfoResponse
├── repository/       # @Repository interfaces extending MongoRepository
├── security/         # WebSecurityConfig, JWT utilities and filters
│   ├── jwt/
│   └── services/
├── service/          # Interfaces + Impl classes
└── util/             # FileUploadUtil, etc.
```

---

## Conventions

### Models (`model/`)

- Annotated with `@Document("collection_name")`, `@Data`, `@NoArgsConstructor` (Lombok).
- `@Id private String id;` — MongoDB uses String IDs.
- Validation annotations on fields: `@NotBlank`, `@NotEmpty`, `@Min`, etc.
- `createdAt` and `updatedAt` as `LocalDateTime`, initialized to `LocalDateTime.now()`.
- Relationships via embedded sets (`Set<User> users = new HashSet<>()`).

```java
@Document("things")
@Data
@NoArgsConstructor
public class Thing implements Serializable {

    @Id
    private String id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
```

### DTOs (`dto/`)

- Plain Java class with `@Data`, `@NoArgsConstructor` (Lombok).
- No persistence annotations.
- `@JsonIgnore` on audit fields (`createdAt`, `updatedAt`).
- Provide an all-args constructor for the fields used in creation (exclude `id` and audit fields).

```java
@Data
@NoArgsConstructor
public class ThingDto {
    private String id;
    private String name;

    @JsonIgnore
    private LocalDateTime createdAt = LocalDateTime.now();

    public ThingDto(String name) {
        this.name = name;
    }
}
```

### Repositories (`repository/`)

- Interface extending `MongoRepository<Entity, String>`.
- Add custom query methods by naming convention or `@Query`.

```java
public interface ThingRepository extends MongoRepository<Thing, String> {
    Optional<Thing> findByName(String name);
}
```

### Service layer (`service/`)

- **Interface** in `service/ThingService.java` — defines the contract.
- **Implementation** in `service/ThingServiceImpl.java` — annotated `@Service`.
- Use `@Autowired` for `ThingRepository` and `ModelMapper`.
- Not-found cases: throw `new ResourceNotFoundException("Thing not found")`.
- Constant for repeated string: `private static final String THING_NOT_FOUND = "Thing not found";`
- Mapping: `this.modelMapper.map(entity, EntityDto.class)` / `this.modelMapper.map(dto, Entity.class)`.

```java
// ThingService.java
public interface ThingService {
    List<ThingDto> getAllThings();
    ThingDto findById(String id);
    ThingDto save(ThingDto dto);
    void deleteThing(String id);
}

// ThingServiceImpl.java
@Service
public class ThingServiceImpl implements ThingService {

    @Autowired
    private ThingRepository thingRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final String THING_NOT_FOUND = "Thing not found";

    @Override
    public List<ThingDto> getAllThings() {
        return thingRepository.findAll().stream()
            .map(t -> modelMapper.map(t, ThingDto.class))
            .collect(Collectors.toList());
    }

    @Override
    public ThingDto findById(String id) {
        Thing thing = thingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(THING_NOT_FOUND));
        return modelMapper.map(thing, ThingDto.class);
    }

    @Override
    public ThingDto save(ThingDto dto) {
        Thing entity = modelMapper.map(dto, Thing.class);
        return modelMapper.map(thingRepository.save(entity), ThingDto.class);
    }

    @Override
    public void deleteThing(String id) {
        Thing thing = thingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(THING_NOT_FOUND));
        thingRepository.delete(thing);
    }
}
```

### Controllers (`controller/`)

- `@CrossOrigin(origins = "*")`, `@RestController`, `@RequestMapping("/api")`.
- `@Autowired` for the service interface (never the impl directly).
- Wrap response in `ApiResponse<T>`: set `success`, `message` (for mutations), `data`.
- Return `ResponseEntity<ApiResponse<T>>`.
- For file uploads: `consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }`, `@RequestParam MultipartFile image`.
- File naming: `UUID.randomUUID() + "-" + StringUtils.cleanPath(originalName)`.

```java
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ThingController {

    @Autowired
    private ThingService thingService;

    @GetMapping("/things")
    public ResponseEntity<ApiResponse<List<ThingDto>>> getAllThings() {
        ApiResponse<List<ThingDto>> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setData(thingService.getAllThings());
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/things")
    public ResponseEntity<ApiResponse<ThingDto>> addThing(@Valid ThingDto dto) {
        ThingDto saved = thingService.save(dto);
        ApiResponse<ThingDto> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Thing created with success");
        response.setData(saved);
        return ResponseEntity.ok().body(response);
    }
}
```

### Exception handling (`exceptions/`)

- `GlobalExceptionHandler` annotated with `@RestControllerAdvice`.
- Each `@ExceptionHandler` returns `ResponseEntity<ApiResponse<List<String>>>`.
- Validation errors (`MethodArgumentNotValidException`): extract `FieldError::getDefaultMessage`.
- `ResourceNotFoundException` (custom): extends `RuntimeException`.
- General fallback: `@ExceptionHandler(Exception.class)`.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    // follow the existing pattern in GlobalExceptionHandler.java
}
```

### ApiResponse shape

```java
// success response
{ "success": true, "message": "...", "data": T }

// error response
{ "success": false, "errors": ["error message"] }
```

---

## Checklist when generating new code

- [ ] Model: `@Document`, `@Data`, `@NoArgsConstructor`, `@Id String id`, validation annotations, audit fields
- [ ] DTO: `@Data`, `@NoArgsConstructor`, `@JsonIgnore` on audit fields, convenience constructor
- [ ] Repository: `MongoRepository<Entity, String>` interface
- [ ] Service interface + `ServiceImpl` with `ModelMapper`, `ENTITY_NOT_FOUND` constant, `ResourceNotFoundException`
- [ ] Controller: `@CrossOrigin`, `@RestController`, `@Autowired` service, `ApiResponse<T>` wrapper, `ResponseEntity`
- [ ] Register new routes in `WebSecurityConfig` if they require specific auth rules
- [ ] For file uploads: `MediaType.MULTIPART_FORM_DATA_VALUE`, UUID filename, `FileUploadUtil.saveFile`
