---
name: books-node-api
description: >
  Use this skill for ANY task involving the Node.js/Express/TypeScript backend of the Books project
  (books-node-api). Triggers on: generating new controllers, services, models, routes or middlewares;
  reviewing or improving existing backend code; fixing bugs; refactoring; and writing Jest integration
  tests with supertest. Always use this skill when the user mentions controllers, services, routes,
  middlewares, models, CustomError, or tests in the context of the Node/Express backend — even if
  they don't explicitly say "use the skill".
---

# Books Node API — Skill

## Project context

- **Stack**: Node.js, Express, TypeScript, Mongoose (MongoDB)
- **Root**: `books-node-api/src/`
- **Tests**: `books-node-api/tests/` — Jest + Supertest
- **Environments**: `env/.env.development`, `.env.production`, `.env.test`

## Folder structure

```
src/
├── config/         # DB connection and app config
├── controllers/    # Route handlers (authController, bookController, loanController, userController)
├── middlewares/    # authHandler, booksPagination, errorHandler, imageHandler, morganHandler
├── models/         # Mongoose models + interfaces (Book, Copy, Loan, User, CustomError, Pagination, Response)
├── routes/         # Express routers (authRoutes, bookRoutes, loanRoutes, userRoutes)
├── services/       # Business logic (bookService, loanService, userService)
├── types/          # Ambient type declarations
└── utils/          # Helpers (jwt.utils, logger, removeImage, testSeed, ...)
tests/
├── helpers.ts
├── server.test.ts
└── controllers/    # Integration tests per controller
```

---

## Conventions

### Models

- Define a **plain data interface** (`IBook`), a **Mongoose document interface** (`BookDocument extends IBook, Document`) and, when needed, a **derived type** (`BookWithCopies`).
- Schema uses `timestamps: true`.
- `toJSON` transform: expose `id` (string), delete `_id` and `__v`.

```ts
// models/Thing.ts
import { Document, model, Schema } from "mongoose";

export interface IThing { name: string; }
export interface ThingDocument extends IThing, Document { id: string; }

const thingSchema = new Schema<ThingDocument>(
  { name: { type: String, required: true } },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => { ret.id = ret._id.toString(); delete ret._id; }
    }
  }
);

export default model<ThingDocument>("Thing", thingSchema);
```

### CustomError

Always propagate errors via `next(new CustomError(status, message))`. Never throw plain errors in controllers.

```ts
// models/CustomError.ts
export class CustomError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
```

### Response shape

Success: `{ success: true, data: T }`
Error (from errorHandler middleware): `{ success: false, data: null, errors: string[] }`

Use the typed `ResBody<T>` generic on `Response`:
```ts
res: Response<ResBody<IBook>>
```

### Services

- Pure async functions, no Express types.
- Return the Mongoose result directly (or `null` when not found).
- Enrich documents with extra data (e.g. copy counts) inside the service, not the controller.
- File naming: `thingService.ts`; function naming: `getThingService`, `createThingService`, etc.

```ts
export const getThingService = async (id: string): Promise<ThingDocument | null> => {
  return await Thing.findById(id);
};
```

### Controllers

- Always `async (req, res, next)` — use typed generics for `req` and `res`.
- Validate required params first; call `next(new CustomError(400, "Bad request"))` if invalid.
- Call the corresponding service; if result is null/falsy, call `next(new CustomError(404, "... not found"))`.
- Wrap everything in `try/catch`; in `catch` call `Logger.debug(error)` then `next(new CustomError(500, "... try it later"))`.
- Use descriptive error messages matching the pattern: `"Couldn't <verb> <entity>, try it later"`.

```ts
export const getThingController = async (
  req: Request,
  res: Response<ResBody<ThingDocument>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const thing = await getThingService(id);
    if (!thing) return next(new CustomError(404, "Thing not found"));

    res.status(200).json({ success: true, data: thing });
  } catch (error) {
    Logger.debug(error);
    next(new CustomError(500, "Couldn't fetch thing, try it later"));
  }
};
```

### Routes

One file per resource in `routes/`. Use the Express `Router`.

```ts
// routes/thingRoutes.ts
import { Router } from "express";
import { getThingController, createThingController } from "../controllers/thingController";
import { authHandler } from "../middlewares/authHandler";

const router = Router();

router.get("/things", getThingController);
router.post("/things", authHandler, createThingController);

export default router;
```

### Middlewares

- Custom middlewares extend Express types when they augment `req`/`res` (see `PaginationRequest`, `PaginationResponse`).
- Error middleware signature: `(err, req, res, next)`.

---

## Tests (Jest + Supertest)

- Location: `tests/controllers/<entity>Controller.test.ts`
- Use `supertest(app)` — import `{ app, server }` from `src/server`.
- Use `seed()` from `src/utils/testSeed` in `beforeAll`.
- Get a JWT with `getToken()` from `tests/helpers`.
- `afterAll`: call `disconnect()` and `server.close()`.
- Group tests in `describe` blocks: one for happy paths, one for `Error status code 500`.

**Happy path structure:**
```ts
it("should <verb> a <entity>", async () => {
  const res = await api.get(ROUTE).set("authorization", token);
  expect(res.status).toEqual(200);
  expect(res.body.success).toBe(true);
  expect(res.body).toHaveProperty('data');
});
```

**500 error structure (spy pattern):**
```ts
it("should fail with status code 500 if a server error occurs while <verb>ing", async () => {
  const spy = jest.spyOn(thingService, 'getThingService');
  spy.mockImplementationOnce(getServerError); // from tests/helpers

  const res = await api.get(ROUTE);

  expect(res.status).toEqual(500);
  expect(res.body).toHaveProperty('data', null);
  expect(res.body).toHaveProperty('success', false);
  expect(res.body).toHaveProperty('errors', ["Couldn't fetch thing, try it later"]);
});
```

**400 error structure:**
```ts
it("should fail with code 400 when <condition>", async () => {
  const res = await api.post(ROUTE).set("authorization", token).send(faultyBody);
  expect(res.status).toEqual(400);
  expect(res.body.success).toBe(false);
  expect(res.body).toHaveProperty('errors', ["Bad request"]);
});
```

---

## Checklist when generating new code

- [ ] Model: `IEntity`, `EntityDocument`, optional derived type, `toJSON` transform
- [ ] Service: typed return, pure async, no Express dependencies
- [ ] Controller: validate → call service → handle null → try/catch with Logger + CustomError
- [ ] Route: register in `routes/entityRoutes.ts`, add to server router
- [ ] Tests: happy paths + 500 spy tests + 400 validation test
- [ ] No `console.log` in production code (use `Logger.debug`)
