# BPN NGO Mobile PWA Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from iOS native apps and professional networking platforms like LinkedIn, with WhatsApp's messaging patterns for communication features.

## Core Design Principles
- **iOS-Inspired Interface**: Clean, minimal design with native iOS patterns
- **Professional Yet Approachable**: Sophisticated enough for business professionals but accessible for all beneficiaries
- **React Native Feel**: Smooth animations and native-like interactions

## Color Palette

### Primary Colors
- **Brand Blue**: 214 89% 52% (professional, trustworthy)
- **Supporting Navy**: 214 45% 25% (depth, authority)

### Neutral System
- **Text Primary**: 220 9% 15% (dark charcoal)
- **Text Secondary**: 220 9% 46% (medium gray)
- **Background**: 0 0% 98% (warm white)
- **Surface**: 0 0% 100% (pure white)
- **Border**: 220 13% 91% (light gray)

### Accent Colors
- **Success Green**: 142 71% 45% (approvals, connections)
- **Warning Orange**: 25 95% 53% (notifications, pending states)
- **Error Red**: 0 84% 60% (alerts, rejections)

## Typography
- **Primary Font**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Hierarchy**: 
  - Headers: 600 weight, 24-32px
  - Body: 400 weight, 16px
  - Captions: 400 weight, 14px
  - Labels: 500 weight, 14px

## Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, and 12
- **Container Padding**: p-4 (16px) for main content
- **Section Spacing**: mb-8 (32px) between major sections
- **Element Spacing**: gap-4 (16px) for related elements
- **Tight Spacing**: gap-2 (8px) for form inputs and small components

## Component Library

### Navigation
- **Bottom Tab Bar**: iOS-style with 5 primary sections (Home, Events, Notes, Network, Profile)
- **Top Navigation**: Clean header with back buttons and action icons
- **Floating Action Button**: For primary actions (new post, new message)

### Cards & Content
- **Feed Cards**: Rounded corners (rounded-lg), subtle shadows, white background
- **Profile Cards**: Circular avatars, minimal info display
- **Event Cards**: Date prominence, RSVP status indicators
- **Note Cards**: Category tags, read status indicators

### Forms & Inputs
- **iOS-Style Inputs**: Rounded borders, focused blue outline
- **Buttons**: Primary (filled blue), Secondary (outline), Text buttons
- **Toggles**: iOS-style switches for settings

### Messaging
- **Chat Bubbles**: iOS messaging style with different colors for sent/received
- **Connection Requests**: Card-based with accept/decline actions
- **Notifications**: Banner-style with appropriate icons

### Data Displays
- **Lists**: Clean separation with subtle dividers
- **Tags**: Pill-shaped with category colors
- **Status Indicators**: Subtle badges for read/unread, online/offline

## Images
- **Profile Avatars**: Circular, 40px standard size, 80px for profile pages
- **Event Images**: 16:9 aspect ratio, rounded corners
- **Note Attachments**: In-app PDF viewer, image gallery for photos
- **No Large Hero Images**: Focus on clean, functional interface

## Mobile Optimizations
- **Touch Targets**: Minimum 44px tap areas
- **Swipe Gestures**: Left swipe for quick actions on list items
- **Pull-to-Refresh**: Standard iOS pattern
- **Loading States**: Skeleton screens matching content structure
- **Offline Indicators**: Subtle status messaging

## Notification Design
- **In-App Banners**: Slide down from top with appropriate icons
- **Badge Counts**: Red circles on tab bar icons
- **Push Notification Style**: iOS native appearance when PWA installed

## Accessibility
- **Dark Mode**: Full support with adjusted color palette
- **Text Scaling**: Responsive typography
- **High Contrast**: Enhanced border visibility
- **Screen Reader**: Proper labeling and navigation order