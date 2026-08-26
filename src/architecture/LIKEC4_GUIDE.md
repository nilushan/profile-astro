# LikeC4 Architecture Diagramming - Learning Guide

`portfolio.likec4` in this folder models the **portfolio site** itself. The smart-home IoT C4 model lives in the sibling repo `nilushan-projects-c4` and is published as [Diagramming a Smart-Home IoT Platform with C4](/projects/iot-platform-architecture).

A comprehensive guide to understanding and using LikeC4 DSL for architecture modeling.

## Table of Contents

1. [What is LikeC4?](#what-is-likec4)
2. [Core Concepts](#core-concepts)
3. [Language Structure](#language-structure)
4. [Specification Block](#specification-block)
5. [Model Block](#model-block)
6. [Views Block](#views-block)
7. [Styling](#styling)
8. [Best Practices](#best-practices)
9. [Common Mistakes](#common-mistakes)
10. [Real Example](#real-example)

---

## What is LikeC4?

LikeC4 is a **Domain-Specific Language (DSL) for creating architecture diagrams and models**. It enables teams to:

- Define system architectures using code (not visual editors)
- Generate multiple visualizations from a single model definition
- Maintain architecture documentation as version-controlled files
- Create different views for different stakeholders
- Use a "single source of truth" approach to architecture

**Key Philosophy**: Model-based architecture where views are projections of the model defined by predicates (what to include/exclude).

**File Extensions**: `.likec4` or `.c4`

### Why LikeC4?

- **Code-based**: Architecture lives in git, reviewable and auditable
- **Multiple views**: One model, many diagrams for different perspectives
- **Type-safe**: Prevents invalid relationships and undefined references
- **Collaborative**: Team can document architecture decisions
- **C4 Model**: Based on proven C4 modeling approach (Context, Container, Component, Code)

---

## Core Concepts

### 1. **The Model**
The complete architecture definition - all elements, relationships, and metadata.

### 2. **Views**
Projections/slices of the model showing specific perspectives. Multiple views from one model prevent duplication.

```
Model (single source of truth)
  ├── View 1: System Landscape
  ├── View 2: Development Workflow
  ├── View 3: Deployment Pipeline
  └── View 4: Component Architecture
```

### 3. **Element Kinds**
Categories of elements defined in the specification. Examples:
- `person` - developers, users, actors
- `repository` - source control, databases
- `website` - frontends, UIs
- `framework` - frameworks, platforms
- `component` - modules, services
- `build_system` - tools, processes

### 4. **Relationships**
Connections between elements showing how they interact or depend on each other.

### 5. **Tags**
Labels/markers applied to elements for:
- Semantic meaning (#deprecated, #external, #production)
- Filtering in views
- Categorization

### 6. **Predicates**
Rules that define what appears in a view:
- `include element` - add specific elements
- `exclude element` - hide elements
- `include *` - include all top-level elements

---

## Language Structure

A LikeC4 file has three main blocks:

```likec4
specification {
  // Define element kinds, relationship types, and tags
}

model {
  // Create actual elements and relationships
}

views {
  // Define diagrams/visualizations
}
```

Each block is optional but typically all three are used.

---

## Specification Block

The specification defines the "types" or vocabulary of your architecture.

### Element Kinds

Define what kinds of elements can exist in your model:

```likec4
specification {
  element person
  element system
  element component
  element database
  element service
}
```

**Common Element Kinds:**
- `person` - Users, developers, actors
- `repository` - Source control, storage
- `local_environment` - Local machines, environments
- `build_system` - Build tools, CI/CD
- `ci_pipeline` - Automated pipelines
- `deployment_platform` - Hosting, cloud platforms
- `website` - Web UIs, frontend apps
- `framework` - Frameworks, runtimes
- `component` - Modules, packages
- `styling_system` - CSS, design systems
- `content_management` - CMS, content storage

### Tags

Define semantic markers for categorization:

```likec4
specification {
  tag #development
  tag #production
  tag #external
  tag #deprecated
}
```

Tags are just identifiers - no colors or styling in specification. You assign tags to elements in the model.

### Relationship Types (Optional)

Define semantic relationship categories:

```likec4
specification {
  relationship async
  relationship sync
  relationship subscribes
}
```

Then use them in model:
```likec4
model {
  service1 -[async]-> service2
  service1 .sync service2
}
```

---

## Model Block

The model defines the actual architecture - elements and their relationships.

### Defining Elements

**Basic Syntax:**
```likec4
model {
  elementId = kind 'Display Name' {
    description 'Optional description'
    technology 'Stack/tools used'
    link https://example.com
  }
}
```

**Example:**
```likec4
model {
  developer = person 'Developer' {
    description 'Software engineer'
  }

  github = repository 'GitHub' {
    technology 'Git hosting'
    description 'Stores the codebase'
  }

  firebase = deployment_platform 'Firebase Hosting' {
    technology 'Google Cloud'
    description 'Hosts the live site'
  }
}
```

### Element Properties

Each element can have:
- **title** (implicit from 'Display Name') - The label shown in diagrams
- **description** - Detailed explanation (supports markdown)
- **technology** - Stack/tools used
- **tags** - Categorization markers
- **link** - External URL or reference

### Tags on Elements

```likec4
model {
  prod_db = database 'Production DB' {
    #production
    #external
    technology 'PostgreSQL'
  }
}
```

### Relationships

Connect elements with the `->` operator:

```likec4
model {
  developer -> github 'pushes code' {
    technology 'git push'
  }

  github -> ci_pipeline 'triggers'

  ci_pipeline -> firebase 'deploys'
}
```

**Relationship Properties:**
```likec4
element1 -> element2 'Label' {
  description 'Detailed explanation'
  technology 'How it works (HTTP, async, etc.)'
  #tag1 #tag2
  link https://example.com
}
```

**Shorthand for no properties:**
```likec4
element1 -> element2
```

### Naming Rules

Element IDs must:
- Contain only letters, digits, hyphens, underscores
- Cannot start with a digit
- Cannot contain periods or spaces
- Be unique at the same hierarchy level

```likec4
my_element      // Valid
myElement       // Valid (but use snake_case)
element-1       // Valid
1element        // Invalid - starts with digit
element.name    // Invalid - contains period
```

### Nesting/Hierarchy (Use Sparingly)

Elements can nest to show internal structure, but this was problematic in my diagram. **Best Practice: Keep nesting shallow or avoid it.**

```likec4
model {
  system = framework 'My System' {
    component backend {
      api = component 'API'
    }
  }
}
```

This creates:
- `system` (parent)
- `system.component` (nested)
- `system.component.api` (deeply nested)

**Problem**: Deeply nested relationships can become invalid. Keep elements at the same level when possible.

---

## Views Block

Views define different visualizations of the model. Each view is a projection showing selected elements and relationships.

### Basic View Syntax

```likec4
views {
  view view_name {
    title 'Display Title'
    description 'Explanation of what this view shows'

    include element1, element2, element3
    include element1 -> element2
  }
}
```

### The Index View

Special view that renders by default:

```likec4
views {
  view index {
    title 'System Landscape'
    description 'High-level overview'

    include system, database, frontend, backend
  }
}
```

### Include Predicates

**Include specific elements:**
```likec4
view overview {
  include developer, github, firebase
}
```

**Include relationships explicitly:**
```likec4
view workflow {
  include developer -> github
  include github -> ci_pipeline
}
```

**Include with wildcards:**
```likec4
view system_overview {
  include system.*        // All children of 'system'
  include *              // All top-level elements
}
```

### Exclude Predicates

Hide elements from a view:

```likec4
view simple_view {
  include *
  exclude deprecated_service
}
```

### Scoped Views

View focused on a specific element's internals:

```likec4
view of system {
  include *              // Show all children of 'system'
  title 'System Internal Structure'
}
```

### View Inheritance

Views can extend other views:

```likec4
view base_view {
  include developer, github, firebase
  title 'Base Architecture'
}

view detailed_view extends base_view {
  include ci_pipeline
  title 'Architecture with CI/CD'
}
```

Extended view inherits all included elements and can add more.

---

## Styling

LikeC4 provides styling through the `style` block in specification (for all instances) or in views (overrides).

### Element Shapes

Built-in shapes for elements:
- `rectangle` (default)
- `person`
- `browser`
- `mobile`
- `cylinder`
- `storage`
- `queue`

```likec4
specification {
  element person {
    style {
      shape person
    }
  }
}
```

### Colors

Available colors (plus hex codes):
- `primary`, `secondary`, `muted`
- `slate`, `blue`, `indigo`, `sky`
- `red`, `gray`, `green`, `amber`
- Custom hex: `#FF5733`, `#000000`

```likec4
specification {
  element service {
    style {
      color green
    }
  }
}
```

### Sizes

Size affects shape, padding, and text size:
- `xsmall`, `small`, `medium` (default), `large`, `xlarge`

```likec4
style {
  size large
}
```

### Relationship Styling

```likec4
model {
  service1 -> service2 'async message' {
    style {
      line dashed
      head diamond
      tail normal
    }
  }
}
```

Line styles: `solid`, `dashed` (default), `dotted`
Arrow heads: `normal`, `diamond`, `crow`, `vee`, `open`, `none`

### Important: Styling Limitations

In views, you **cannot** add custom styling with style blocks. Styling must come from:
1. Element kind in specification
2. View definition itself (limited)

**This is a common mistake** - trying to style elements in views when styling should be in specification.

---

## Best Practices

### 1. Keep Elements at Same Level
Avoid deep nesting. Instead, use flat element structure with clear relationships.

**Bad:**
```likec4
model {
  system {
    module {
      component {
        service
      }
    }
  }
}
```

**Good:**
```likec4
model {
  system = framework 'System'
  module = component 'Module'
  service = component 'Service'

  system -> module
  module -> service
}
```

### 2. Use Meaningful Element IDs
IDs should reflect the element's role:

**Bad:**
```likec4
element1 = person 'Developer'
element2 = repository 'GitHub'
```

**Good:**
```likec4
developer = person 'Developer'
github = repository 'GitHub'
```

### 3. One Model, Multiple Views
Don't duplicate elements across files. Define once in model, show in multiple views.

```likec4
// Define once
model {
  developer = person 'Developer'
  github = repository 'GitHub'
  // ... all elements
}

// Show in different views
views {
  view landscape {
    include developer, github, frontend, backend
  }

  view workflow {
    include developer, github
    include developer -> github
  }
}
```

### 4. Use Tags for Categorization
Tag elements by environment or concern:

```likec4
model {
  prod_db = database 'Prod DB' {
    #production #external
  }

  dev_db = database 'Dev DB' {
    #development
  }
}
```

### 5. Add Descriptions and Technology
Provide context for viewers:

```likec4
element = kind 'Display Name' {
  description 'What this is and why it exists'
  technology 'The specific tech: Node.js 18, PostgreSQL 14'
}
```

### 6. Relationship Labels are Important
Use descriptive labels to show interaction type:

**Bad:**
```likec4
frontend -> backend
```

**Good:**
```likec4
frontend -> backend 'HTTP requests' {
  technology 'REST API'
}
```

### 7. Organize Views by Perspective
Create views for different audiences:

- **System Landscape**: High-level overview for executives
- **Development Workflow**: How developers work locally
- **CI/CD Pipeline**: Build and deployment process
- **Component Architecture**: Internal structure
- **Deployment**: Environments and infrastructure

### 8. Use Consistent Naming
Choose one style and stick with it:

```likec4
// Consistent snake_case
developer = person 'Developer'
github = repository 'GitHub'
firebase_hosting = deployment_platform 'Firebase Hosting'
```

---

## Common Mistakes

### Mistake 1: Styling in Views

**Wrong:**
```likec4
views {
  view my_view {
    include developer

    style {                    // This doesn't work!
      developer {
        shape person
        color blue
      }
    }
  }
}
```

**Correct:**
```likec4
specification {
  element person {
    style {
      shape person
      color blue
    }
  }
}

views {
  view my_view {
    include developer
  }
}
```

### Mistake 2: Deeply Nested Elements with Invalid Relationships

**Problem:**
```likec4
model {
  system {
    module {
      service
    }
  }

  // This fails - service is nested inside system.module
  // relationship to top-level element may be invalid
  service -> external_api
}
```

**Solution:**
Keep elements at same level:
```likec4
model {
  system = framework 'System'
  module = component 'Module'
  service = component 'Service'
  external_api = system 'External API'

  system -> module
  module -> service
  service -> external_api
}
```

### Mistake 3: Invalid Tag References

**Wrong:**
```likec4
specification {
  tag #production {
    color green
  }
}
```

Tags don't have properties. Color is not valid syntax.

**Correct:**
```likec4
specification {
  tag #production
  tag #development
  tag #external
}

model {
  prod_db = database 'Prod DB' {
    #production
  }
}
```

### Mistake 4: Trying to Define Relationship Types Without Using Them

**Unnecessary:**
```likec4
specification {
  relationship async
  relationship sync
}

model {
  // These relationship types are never used
  service1 -> service2
}
```

Only define relationship types if you'll use them:
```likec4
specification {
  relationship async
}

model {
  service1 -[async]-> service2
}
```

### Mistake 5: Empty or Overly Complex Specifications

**Overthinking:**
```likec4
specification {
  element actor
  element system
  element service
  element component
  element database
  element queue
  // ... 20 more kinds
}
```

**Better:**
Define only the kinds you actually use:
```likec4
specification {
  element person
  element repository
  element framework
  element component
  element deployment_platform

  tag #development
  tag #production
  tag #external
}
```

### Mistake 6: Views with No Description

**Bad:**
```likec4
view view1 {
  include developer, github, firebase
}
```

**Good:**
```likec4
view development_workflow {
  title 'Local Development Workflow'
  description 'How developers work locally, commit code, and trigger CI/CD'
  include developer, github, firebase
}
```

---

## Real Example

Here's a real example from the portfolio architecture:

```likec4
specification {
  element person
  element repository
  element build_system
  element ci_pipeline
  element deployment_platform
  element website
  element framework

  tag #development
  tag #production
  tag #external
}

model {
  // Actors
  developer = person 'Developer' {
    description 'Engineer developing the portfolio'
  }

  // Source Control
  github = repository 'GitHub' {
    #external
    technology 'Git'
    description 'Profile-astro repository'
  }

  // Local Development
  local_checkout = local_environment 'Local Checkout' {
    #development
    description 'Git clone on developer machine'
  }

  dev_server = build_system 'Dev Server' {
    #development
    technology 'Astro dev + HMR'
  }

  // Framework
  astro_framework = framework 'Astro 5' {
    description 'Static site generator'
  }

  // Build Output
  build_output = website 'Build Output (dist/)' {
    description 'Static HTML, CSS, JS'
  }

  // CI/CD
  github_actions = ci_pipeline 'GitHub Actions' {
    #external
    technology 'GitHub workflows'
  }

  // Deployment
  firebase = deployment_platform 'Firebase Hosting' {
    #external
    technology 'Google Cloud'
  }

  production = website 'Production Site' {
    #production
    technology 'Firebase live'
  }

  // Relationships
  developer -> github 'pushes code' {
    technology 'git push'
  }

  github -> github_actions 'triggers build'

  github_actions -> build_output 'compiles'

  github_actions -> firebase 'deploys to'

  firebase -> production 'serves'
}

views {
  // High-level overview
  view index {
    title 'System Landscape'
    description 'Development, CI/CD, and deployment ecosystem'

    include developer, github, github_actions, firebase, production
  }

  // Development detail
  view development {
    title 'Local Development'
    description 'How code is developed and tested locally'

    include developer, local_checkout, dev_server, astro_framework
    include developer -> local_checkout
    include developer -> dev_server
    include dev_server -> astro_framework
  }

  // Build pipeline
  view cicd {
    title 'CI/CD Pipeline'
    description 'Automated build and deployment on code push'

    include github, github_actions, build_output, firebase, production
    include github -> github_actions
    include github_actions -> build_output
    include github_actions -> firebase
    include firebase -> production
  }
}
```

---

## Resources

- **Official Docs**: https://likec4.dev/
- **Playground**: https://playground.likec4.dev/ - Try DSL interactively
- **C4 Model**: https://c4model.com/ - Learn the C4 approach
- **GitHub**: https://github.com/likec4/likec4 - Source code and issues

---

## Summary

**Key Takeaways:**

1. **Three Blocks**: Specification (types), Model (elements), Views (diagrams)
2. **One Model, Many Views**: DRY principle - define once, visualize multiple ways
3. **Relationships Connect Elements**: Show how parts interact
4. **Tags Organize**: Use for categorization and filtering
5. **Keep It Simple**: Flat structures are easier to manage than deep nesting
6. **Description Matters**: Always explain what each element is
7. **Multiple Perspectives**: Different views for different stakeholders
8. **Version Control**: Architecture as code, reviewable and auditable

**Start simple, add complexity only when needed.**
