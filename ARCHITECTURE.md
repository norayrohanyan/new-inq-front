# Template-Based Category Architecture

## Overview

This application uses a **template-based architecture** for category detail pages. Similar categories share the same UI and reservation flow, making the codebase more maintainable and scalable.

## Architecture Components

### 1. **Category Templates Configuration** (`/consts/categoryTemplates.ts`)

Defines which template each category uses and what features it supports.

```typescript
export type CategoryTemplate = 'rental' | 'service';

export const CATEGORY_TEMPLATES: Record<string, CategoryTemplateConfig> = {
  'car_rental': {
    template: 'rental',
    features: {
      hasReservationForm: true,
      hasBookingFlow: false,
    },
  },
  'beauty_salon': {
    template: 'service',
    features: {
      hasServices: true,
      hasEmployees: true,
      hasPortfolio: true,
      hasBookingFlow: true,
    },
  },
  // ... more categories
};
```

### 2. **Template Types**

#### **Rental Template** (`/components/templates/RentalDetailTemplate`)
Used for categories where users book items directly (cars, apartments, etc.)

**Features:**
- Image gallery
- Inline reservation form with date pickers
- Specifications grid
- Optional map (for apartments)
- Price display
- Share & favorite buttons

**Used by:**
- `car_rental`
- `apartments`
- `real-estate`

#### **Service Template** (`/components/templates/ServiceDetailTemplate`)
Used for service-based businesses (beauty salons, medical services, etc.)

**Features:**
- Company banner
- Tabbed content (Services, Employees, Portfolio)
- Company info sidebar
- Booking flow navigation (for separate reservation pages)
- Rating and contact information

**Used by:**
- `beauty_salon`
- `animal_care`
- `medical`
- `photo_studio`

### 3. **Unified Detail Page Router** (`/app/[locale]/detail/[category]/[id]/page.tsx`)

Single entry point for all category detail pages. Automatically:
1. Determines the correct template based on category
2. Fetches appropriate data from Redux
3. Transforms data to match template interface
4. Renders the correct template component

## Routing Structure

### Old Structure (Deprecated)
```
/company/{category}/{id}  → Service-based categories
/car/{id}                 → Car rentals
/apartment/{id}           → Apartment rentals
```

### New Unified Structure
```
/detail/{category}/{id}   → All categories
```

**Examples:**
- `/detail/beauty_salon/123` → ServiceDetailTemplate
- `/detail/car_rental/456` → RentalDetailTemplate
- `/detail/apartments/789` → RentalDetailTemplate

## Adding a New Category

### Step 1: Update Category Templates Configuration

Add your category to `/consts/categoryTemplates.ts`:

```typescript
export const CATEGORY_TEMPLATES: Record<string, CategoryTemplateConfig> = {
  // ... existing categories
  'your_new_category': {
    template: 'rental', // or 'service'
    features: {
      hasReservationForm: true,
      // ... other features
    },
  },
};
```

### Step 2: Add Translations

Update `/i18n/locales/en.json` (and other locales) with any category-specific translations.

### Step 3: Update Backend Integration (if needed)

If the category has unique data structures, update the Redux store types and API calls.

**That's it!** The unified router will automatically handle routing and template selection.

## Benefits of This Architecture

### ✅ **Maintainability**
- Single codebase for similar categories
- Changes propagate to all categories using the template

### ✅ **Scalability**
- Adding new categories is trivial
- No need to create individual page files

### ✅ **Consistency**
- Uniform UX across similar categories
- Standardized data flow

### ✅ **Type Safety**
- Strongly typed template interfaces
- Compile-time checking

### ✅ **Code Reusability**
- Templates can be shared across projects
- Easy to extract into a design system

## Template Data Interfaces

### RentalDetailData
```typescript
interface RentalDetailData {
  id: number;
  name: string;
  description: string;
  rating: string | number;
  price: number;
  currency: string;
  imageUrls: string[];
  intervals?: Record<string, any>;
  specifications?: Array<{
    icon?: React.ReactNode;
    label: string;
    value: string | number | boolean;
  }>;
  // ... more fields
}
```

### ServiceDetailData
```typescript
interface ServiceDetailData {
  id: number;
  name: string;
  rating: string | number;
  logo?: string;
  address?: string;
  services?: Array<Service>;
  employees?: Array<Employee>;
  portfolio?: string[];
  // ... more fields
}
```

## Booking Flow

### Separate Booking Pages ✅ IMPLEMENTED
For service categories with `hasBookingFlow: true`, users navigate to a dedicated multi-step booking wizard:

**Route:** `/booking/{category}/{companyId}`

**Flow Steps:**
1. **Choose Service** - Select one or multiple services
2. **Choose Employee** (optional) - Select employee if category supports it
3. **Choose Date/Time** - Calendar and time slot selection
4. **Booking Info** - Form with guest details and comments
5. **Success** - Confirmation screen

**Features:**
- Progress indicator showing current step
- Back/Continue navigation
- Selected services summary with total price
- Optional employee selection (based on category)
- Guest booking option (book for someone else)
- Form validation
- Success screen with navigation options

**Example URL:**
```
/en/booking/beauty_salon/123
```

### Additional Templates
As the platform grows, you can add more template types:

```typescript
export type CategoryTemplate = 'rental' | 'service' | 'marketplace' | 'events';
```

Each template type can have its own UI and business logic.

## Migration Notes

### Deprecated Routes
The following routes are deprecated but still exist in the codebase:
- `/app/[locale]/car/[id]/page.tsx`
- `/app/[locale]/apartment/[id]/page.tsx`
- `/app/[locale]/company/[category]/[id]/page.tsx`

These can be safely deleted once all navigation links are updated to use the new unified route.

### Navigation Updates
All navigation throughout the app now uses:
```typescript
router.push(`/${locale}/detail/${category}/${id}`);
```

Updated files:
- `components/CompanyServiceCard/index.tsx`
- `app/[locale]/profile/page.tsx`
- `app/[locale]/categories/components/CategoriesContent.tsx`

## Troubleshooting

### Template Not Rendering
1. Check if category is defined in `CATEGORY_TEMPLATES`
2. Verify Redux store has correct data selectors
3. Check browser console for type errors

### Data Not Loading
1. Verify API endpoint exists for the category
2. Check Redux thunk is dispatched in unified detail page
3. Ensure data transformations match template interface

## Questions?

For questions or issues with the template system, refer to:
- `/consts/categoryTemplates.ts` - Template configuration
- `/components/templates/` - Template implementations
- `/app/[locale]/detail/[category]/[id]/page.tsx` - Routing logic

