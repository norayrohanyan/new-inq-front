# Modal Components

Reusable modal/popup components based on the v-editor-spa pattern with Framer Motion animations.

## Components

### Modal
Base modal component with backdrop, animations, and ESC key support.

### ModalDialog
Pre-styled dialog modal that accepts icon, title, description, and buttons as props.

## Usage Examples

### Warning/Confirmation Modal
```tsx
import ModalDialog from '@/components/Modal/ModalDialog';
import { WarningIcon } from '@/components/icons';
import Button from '@/components/Button';

<ModalDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  icon={<WarningIcon />}
  title="Are you sure you want to cancel?"
  buttons={
    <>
      <Button variant="primary" onClick={handleConfirm}>Yes</Button>
      <Button variant="secondary" onClick={handleCancel}>No</Button>
    </>
  }
/>
```

### Error Modal
```tsx
<ModalDialog
  isOpen={errorOpen}
  onClose={() => setErrorOpen(false)}
  icon={<ErrorIcon />}
  title="Failed Booking"
  buttons={
    <Button variant="primary" fullWidth onClick={handleGoBack}>
      Go back
    </Button>
  }
/>
```

### Success Modal
```tsx
<ModalDialog
  isOpen={successOpen}
  onClose={() => setSuccessOpen(false)}
  icon={<SuccessIcon />}
  title="Account recovery complete!"
  buttons={
    <Button variant="primary" fullWidth onClick={handleAction}>
      Make a booking
    </Button>
  }
/>
```

### Info Modal (No buttons)
```tsx
<ModalDialog
  isOpen={smsOpen}
  onClose={() => setSmsOpen(false)}
  icon={<SmsIcon />}
  title="Check your sms"
/>
```

## Available Icons

- `WarningIcon` - Orange gradient warning triangle
- `ErrorIcon` - Red circle with exclamation mark
- `SuccessIcon` - Orange checkmark in circle
- `SmsIcon` - Orange envelope/mail icon

## Features

- ✅ Portal-based rendering (renders at body level)
- ✅ Backdrop click to close
- ✅ ESC key to close
- ✅ Smooth animations (scale + fade)
- ✅ Body scroll lock when open
- ✅ Fully typed with TypeScript
- ✅ Responsive design
- ✅ Customizable icons, titles, descriptions, and buttons
- ✅ Dark theme matching your brand

## Props

### ModalProps
- `isOpen: boolean` - Controls modal visibility
- `onClose?: () => void` - Callback when modal closes
- `children: ReactNode` - Modal content
- `showCloseButton?: boolean` - Show close X button

### ModalDialogProps
- `isOpen: boolean` - Controls modal visibility
- `onClose?: () => void` - Callback when modal closes
- `icon?: ReactNode` - Icon component to display
- `title?: string` - Modal title
- `description?: string` - Modal description text
- `buttons?: ReactNode` - Button(s) to display
- `type?: 'info' | 'success' | 'error' | 'warning'` - Modal type (for future use)

## Demo Page

Visit `/en/modal-demo` to see all modal variations in action.


