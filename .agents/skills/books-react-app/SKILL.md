---
name: books-react-app
description: >
  Use this skill for ANY task involving the React/TypeScript frontend of the Books project
  (books-react-app). Triggers on: generating new components, pages, Redux slices, actions,
  services or hooks; reviewing or improving existing frontend code; fixing bugs; refactoring;
  writing Vitest + Testing Library tests; and working with Tailwind CSS styling. Always use
  this skill when the user mentions components, pages, Redux store, slices, AppThunk, services
  (axios), Cypress e2e tests, or any React/TypeScript concept in this project — even if they
  don't explicitly say "use the skill".
---

# Books React App — Skill

## Project context

- **Stack**: React 18, TypeScript, Redux Toolkit, React Router, Axios, Tailwind CSS, SCSS Modules
- **Build**: Vite
- **Tests**: Vitest + React Testing Library (unit/component), Cypress (e2e)
- **Root**: `books-react-app/src/`

## Folder structure

```
src/
├── assets/
│   ├── images/      # SVG, PNG assets
│   └── scss/        # CSS Modules (.module.scss) per component
├── components/      # Reusable UI components (PascalCase .tsx)
│   └── ui/          # Generic primitives: Button, Card
├── context/         # React Context + Provider pairs (one folder per context)
├── data/            # Static constants (ConstantUtils.ts)
├── hooks/           # Custom hooks (redux-hooks.ts)
├── pages/           # Route-level components (PascalCase .tsx)
├── services/        # Axios API calls (camelCase .ts, one file per entity)
├── store/           # Redux Toolkit store
│   ├── index.ts     # Store + AppThunk type + useAppDispatch hook
│   └── <entity>/
│       ├── slice.ts
│       ├── actions.ts
│       └── index.ts
├── tests/
│   ├── components/  # Component tests
│   ├── pages/       # Page tests
│   ├── mocks/       # fileMock, styleMock
│   └── utils/       # test-utils.tsx (customRender), data.ts
├── types/           # TypeScript interfaces (PascalCase .ts, one per entity)
└── utils/           # Pure utility functions (camelCase .ts)
```

---

## Conventions

### Types (`types/`)

One file per entity. Export the main interface and any state shape.

```ts
// types/Thing.ts
export interface Thing {
  id: string;
  name: string;
}

export interface ThingState {
  things: Thing[];
  thing: Thing | null;
}
```

### Services (`services/`)

- Use **axios** with the base URL from `import.meta.env.VITE_API_URL`.
- Return `Result<T, string>` (discriminated union from `types/Result.ts`).
- `success: true` → `{ success: true, value: data.data }`.
- `success: false` → `{ success: false, message: handleError(error) }`.
- Auth-required calls: pass `{ headers: getHeaders() }`.
- Multipart data: convert with `castBookToFormData` or equivalent util before sending.

```ts
// services/things.ts
import axios from 'axios';
import { Thing } from '@/types/Thing';
import { Result } from '@/types/Result';
import { getHeaders } from '@/utils/authHeader';
import { handleError } from '@/utils/handleError';

const url = `${import.meta.env.VITE_API_URL}/api/things`;

export const getAllThings = async (): Promise<Result<Thing[], string>> => {
  try {
    const { data } = await axios.get(url);
    return { success: true, value: data.data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const createThing = async (thing: Thing): Promise<Result<Thing, string>> => {
  try {
    const { data } = await axios.post(url, thing, { headers: getHeaders() });
    return { success: true, value: data.data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
```

### Redux store (`store/<entity>/`)

**slice.ts** — state shape + reducers only, no side effects.

```ts
// store/thing/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thing, ThingState } from '@/types/Thing';

const initialThingState: ThingState = { things: [], thing: null };

export const thingSlice = createSlice({
  name: 'thing',
  initialState: initialThingState,
  reducers: {
    setAllThings: (state, action: PayloadAction<Thing[]>) => {
      state.things = action.payload;
    },
    setSingleThing: (state, action: PayloadAction<Thing>) => {
      state.thing = action.payload;
    },
    createThing: (state, action: PayloadAction<Thing>) => {
      state.things = [...state.things, action.payload];
    },
    eliminateThing: (state, action: PayloadAction<string>) => {
      state.things = state.things.filter(t => t.id !== action.payload);
    },
    modifyThing: (state, action: PayloadAction<Thing>) => {
      state.things = state.things.map(t => t.id === action.payload.id ? action.payload : t);
      state.thing = action.payload;
    },
  },
});

export default thingSlice.reducer;
```

**actions.ts** — `AppThunk` async action creators. Always wrap with `setLoading(true/false)`. Use `showNotification` for feedback.

```ts
// store/thing/actions.ts
import { AppThunk } from '..';
import { getAllThings, createThing } from '@/services/things';
import { Thing } from '@/types/Thing';
import { showNotification } from '@/store/notification';
import { setLoading } from '@/store/ui';
import { thingSlice } from './slice';

const { actions } = thingSlice;

export const getThings = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await getAllThings();
  if (response.success) {
    dispatch(actions.setAllThings(response.value));
  } else {
    dispatch(showNotification({ type: 'error', message: `Failed to fetch things: ${response.message}` }));
  }
  dispatch(setLoading(false));
};

export const addThing = (thing: Thing): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await createThing(thing);
  if (response.success) {
    dispatch(actions.createThing(response.value));
    dispatch(showNotification({ type: 'success', message: 'Thing created successfully' }));
  } else {
    dispatch(showNotification({ type: 'error', message: `Failed to create thing: ${response.message}` }));
  }
  dispatch(setLoading(false));
};
```

**index.ts** — barrel export.
```ts
export { thingSlice } from './slice';
export { default } from './slice';
export * from './actions';
```

### Components (`components/`)

- Functional components with explicit `Props` type exported above the component.
- State: `useState<T>` with typed initial value.
- Event handlers: `handleChange`, `handleSubmit`, `handleFile`, `handleNavigateToX`.
- Form submissions: `event.preventDefault()`, then validate, then call the passed-in `saveX` prop.
- Error display: `{errors.field && <p className="text-[11px] text-danger-500">{errors.field}</p>}`.
- Navigation: `useNavigate()` + `ROUTES` constants from `@/utils/constants`.
- Early returns for null/loading states.
- No direct Redux dispatch in components — use the actions from `useAppDispatch` (the custom hook).

```tsx
// components/ThingForm.tsx
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thing } from '@/types/Thing';
import { ROUTES } from '@/utils/constants';
import Button from './ui/Button';

export type Props = {
  thing: Thing | null;
  saveThing: (data: Thing) => void;
  editing: boolean;
};

const ThingForm = ({ thing, saveThing, editing = false }: Props) => {
  if (!thing) return <h2 className="text-center text-2xl font-semibold">No thing found</h2>;

  const [values, setValues] = useState<Thing>(thing);
  const [errors, setErrors] = useState<Partial<Record<keyof Thing, string>>>({});
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveThing(values);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="thing-form" className="card max-w-2xl mx-auto space-y-6 p-8">
      <h3 className="text-center text-2xl font-semibold">{editing ? 'Edit Thing' : 'New Thing'}</h3>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium uppercase tracking-wide text-brand-700">Name *</label>
        <input id="name" name="name" type="text" value={values.name} onChange={handleChange} className="input" required />
        {errors.name && <p className="text-[11px] text-danger-500">{errors.name}</p>}
      </div>
      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="primary" className="flex-1">Submit</Button>
        <Button type="button" variant="outline" onClick={() => navigate(ROUTES.ALL_THINGS)} className="flex-1">Cancel</Button>
      </div>
    </form>
  );
};

export default ThingForm;
```

### Pages (`pages/`)

- `React.FC` type annotation.
- Read from Redux state with `useAppSelector`.
- Dispatch with the custom `useAppDispatch` hook (which returns the bound action creators).
- `useEffect` for data fetching triggered by route params or auth state.

```tsx
const ThingPage: React.FC = () => {
  const { id } = useParams();
  const loading = useAppSelector(state => state.ui.loading);
  const thing = useAppSelector(state => state.thing.thing);
  const { fetchThing } = useAppDispatch();

  useEffect(() => { if (id) fetchThing(id); }, [id]);

  return <div className="space-y-6"><ThingDetail thing={thing} loading={loading} /></div>;
};
```

### Styling

- **Tailwind CSS** utility classes as the primary styling approach.
- **CSS Modules** (`.module.scss`) for component-specific styles that need more control.
- Tailwind design tokens: `text-brand-700`, `text-danger-500`, `card`, `input` (custom classes).
- Responsive grid: `grid grid-cols-1 md:grid-cols-2 gap-4`.

---

## Tests (Vitest + React Testing Library)

- Location: `tests/components/<ComponentName>.test.tsx` or `tests/pages/<PageName>.test.tsx`.
- Use `customRender` from `@/tests/utils/test-utils` (wraps with Redux Provider + Router).
- Import `screen` from `@/tests/utils/test-utils` as well.
- Mock with `vi.fn()`, `vi.mock()`, `vi.spyOn()`.
- Mock `react-router-dom` for `useNavigate` and `useLocation`.
- Use `userEvent.setup()` for user interactions.
- Group with `describe` + `beforeEach` for setup.

```tsx
// tests/components/ThingForm.test.tsx
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ThingForm from '@/components/ThingForm';
import { customRender, screen } from '@/tests/utils/test-utils';
import { initialThing } from '@/data/ConstantUtils';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

const saveThing = vi.fn();
const user = userEvent.setup();

describe('ThingForm', () => {
  beforeEach(() => customRender(<ThingForm thing={initialThing} saveThing={saveThing} editing={false} />));

  it('renders thing form', () => {
    expect(screen.getByTestId('thing-form')).toBeInTheDocument();
  });

  it('calls saveThing when submitted with valid data', async () => {
    await user.type(screen.getByPlaceholderText(/name/i), 'My Thing');
    await user.click(screen.getByText(/submit/i));
    expect(saveThing).toHaveBeenCalled();
  });

  it('navigates to list on cancel', async () => {
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/things');
  });
});
```

---

## Checklist when generating new code

- [ ] Type: `types/Entity.ts` with interface + state shape
- [ ] Service: `services/things.ts` — axios, `Result<T, string>`, `handleError`, `getHeaders` for auth
- [ ] Slice: `store/thing/slice.ts` — `initialState`, all CRUD reducers
- [ ] Actions: `store/thing/actions.ts` — `AppThunk`, `setLoading`, `showNotification`, `success/failure` branches
- [ ] Store index: add reducer to `store/index.ts`, add dispatch method to `useAppDispatch` hook
- [ ] Component: exported `Props` type, `useState`, event handlers, `data-testid` on form, early return on null
- [ ] Page: `React.FC`, `useAppSelector`, `useAppDispatch`, `useEffect` for fetching
- [ ] Tests: `customRender`, `vi.mock` for router, `userEvent.setup()`, happy path + edge cases
- [ ] Route: register in `AppRoutes.tsx` using `ROUTES` constants
