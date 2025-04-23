# Ideal Casting - Professional Talent Management Platform

## Project Overview
Develop a sophisticated, enterprise-grade web platform for Ideal Casting, a premier talent management company. The platform will serve as a comprehensive solution for talent showcase, management, and client engagement.

## Core Functionalities

### 1. Talent Management System
#### Directory & Search
* Advanced talent discovery system with multi-parameter filtering
* Search criteria including:
  - Talent categories (Acting, Music, Modeling, Dance, Acrobatics, Stunts, Vocals, Voice Acting, Magic)
  - Demographics (age range, gender)
  - Professional attributes (skills, experience level)
  - Unique identifiers (Talent ID)
* Comprehensive talent profiles featuring:
  - Professional media portfolio (photographs, showreels)
  - Performance history and credentials
  - Technical specifications and capabilities
  - Professional documentation

#### Administration Interface
* Secure, role-based administrative dashboard
* Talent portfolio management tools
* Administrative user management system
* Content moderation capabilities
* Performance analytics and reporting

### 2. User Authentication & Security
#### Multi-tier Access Control
* Role-specific authentication pathways
* Secure credential management
* Protected route architecture
* Session handling and persistence
* Two-factor authentication readiness

#### Administrative Security
* Dedicated admin authentication protocol
* Granular permission management
* Activity logging and audit trails
* Security policy enforcement

### 3. Client Engagement Features
#### Landing Experience
* Professional hero section with dynamic messaging:
  - "Connecting Exceptional Talent with Extraordinary Opportunities"
  - "Your Vision, Our Talent: Bringing Stories to Life"
  - "Discover the Art of Perfect Casting"
* High-impact visual storytelling
* Strategic call-to-action placement

#### Appointment System
* Streamlined consultation scheduling
* Automated booking management
* Client preference recording
* Integration capability with calendar systems

### 4. Information Architecture
#### Primary Navigation
* Home - Brand introduction and highlights
* About - Corporate identity and values
* Services - Professional offerings
* Talent Showcase - Curated portfolio presentations
* Talent Directory - Comprehensive talent database
* Team - Professional staff profiles
* Careers - Employment opportunities
* Contact - Communication channels

#### Administrative Navigation
* Dashboard - Performance overview
* Talent Management - Portfolio administration
* User Management - Access control
* Analytics - Performance metrics
* System Settings - Platform configuration

## Technical Architecture

### 1. Frontend Development
* Framework: React with Vite
* Routing: React Router DOM
* UI Components: Custom components with @iconify/react
* State Management: Context API/Redux
* Data Persistence: Local storage with API readiness

### 2. Responsive Design
* Mobile-first development approach
* Progressive enhancement strategy
* Cross-device compatibility
* Performance optimization
* Accessibility compliance

### 3. User Interface
* Contemporary professional aesthetic
* Brand-aligned design system
* Intuitive interaction patterns
* Performance-optimized media handling
* Consistent visual language

## Development Priorities

### 1. Core Functionality Implementation
* Talent directory search and filter system
* Administrative dashboard and tools
* Authentication and authorization system
* Appointment booking functionality

### 2. User Experience Enhancement
* Responsive navigation system
* Form validation and feedback
* Loading state management
* Error handling and recovery
* Performance optimization

### 3. Security Implementation
* Authentication protocols
* Data validation
* Session management
* Access control
* Security headers

### 4. Quality Assurance
* Cross-browser testing
* Responsive design verification
* Performance benchmarking
* Security assessment
* Accessibility compliance

## SEO & Performance
* Semantic HTML structure
* Meta information optimization
* Performance metrics monitoring
* Search engine guidelines compliance
* Analytics integration capability

## Future Considerations
* Backend API integration
* Database implementation
* Cloud storage for media
* Advanced analytics
* Enhanced security features

---

This platform will serve as a cornerstone for Ideal Casting's digital presence, facilitating efficient talent management and client engagement while maintaining the highest standards of security and user experience.

**Key Features:**

* **Talent Directory:**
    * Implement a robust and user-friendly talent directory with advanced filtering and search capabilities.
    * Filters should include talent type (Actors, Instrumentalist, Models, Dancers, Acrobats, Stunt Performers, Singers, Voice Actors, Magicians), age range, gender, skills, experience, and Talent ID.
    * Enable detailed talent profiles with high-quality photos, videos, resumes, and contact information.

* **Admin System:**
    * Secure admin dashboard for managing the website content
    * Role-based access control with admin-specific routes and protections
    * Admin user management system with the ability to create new admin accounts
    * Talent management features (add, edit, delete talents)
    * Admin authentication system with email and password
    * Mobile-responsive admin interface

* **Hero Section:**
    * Create a captivating hero section that immediately grabs the user's attention.
    * Instead of "We are specialists in art and talent," use a more dynamic and impactful tagline like:
        * "Connecting Exceptional Talent with Extraordinary Opportunities."
        * "Your Vision, Our Talent: Bringing Stories to Life."
        * "Discover the Art of Perfect Casting."
    * Include a visually appealing background image or video showcasing the diversity and professionalism of Ideal Casting's talent.
    * Include a call to action button, such as "Explore Our Talent" or "Book an Appointment."

* **Appointment Booking:**
    * Integrate a seamless online appointment booking system for clients to schedule consultations or casting sessions.

* **Navigation:**
    * Design a clean and intuitive navigation menu with the following sections:
        * Home
        * About Us (Company history, mission, values)
        * Services (Detailed descriptions of casting services)
        * Talent Showcase (Replaces Billboard Campaigns and Commercial Portfolio, and displays a more general and inclusive showcase)
        * Talent Directory
        * Our Team (Profiles of Ideal Casting's team members)
        * Careers (Job openings)
        * Contact Us
    * Admin-specific navigation items for authenticated admin users
    * Responsive mobile menu with dropdown support

* **Authentication System:**
    * Separate login paths for regular users and administrators
    * Secure storage of user credentials
    * Protected routes based on user roles
    * Session management and persistence
    * User-friendly login/signup forms with validation

* **Technology:**
    * Utilize React with Vite for a fast and efficient front-end development experience.
    * Implement React Router DOM for seamless navigation between pages.
    * Incorporate @iconify/react for a wide range of visually appealing icons.
    * Ensure the website is fully responsive and optimized for all devices.
    * Local storage for data persistence (to be replaced with backend database)
    * State management for user authentication and admin features

* **Design:**
    * Create a modern and professional design that reflects Ideal Casting's brand identity.
    * Use high-quality images and videos to showcase the talent and services.
    * Implement a clean and consistent color palette.
    * Refer to the general layout and information provided in [https://idealcasting.net/] but improve the overall design, user experience and functionality.
    * Pay close attention to user experience (UX) and ensure the website is easy to navigate and use.
    * Responsive design for all screen sizes with mobile-first approach

**Specific requests for Cursor:**

* Generate code snippets for the Talent Directory's filtering and search functionality.
* Suggest design ideas for the hero section and appointment booking system.
* Create a reusable react component for the talent cards in the talent directory.
* Generate a sample JSON data structure for the talent profiles.
* Optimize the website for SEO.
* Implement secure admin authentication system.
* Create protected admin routes and management interfaces.
```
