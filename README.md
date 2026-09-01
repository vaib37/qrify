# QRify

<p align="center">
  <strong>A lightweight, customizable QR code generator built with vanilla JavaScript.</strong>
</p>

<p align="center">
  Generate QR codes directly in your browser, customize them, download them, and use QRify even when you're offline.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-square" alt="PWA">
</p>

---

## About

QRify is a client-side QR code generator built with HTML, CSS, and JavaScript.

It started as a simple QR generator and evolved into an offline-capable Progressive Web App (PWA).

The project focuses on keeping things lightweight while exploring real browser technologies such as DOM manipulation, browser APIs, Service Workers, and the Cache API.

---

## Features

### QR Generation

- Generate QR codes from text
- Generate QR codes from URLs
- Automatically handle domain-style URLs
- Generate QR codes entirely in the browser
- No QR-generation API required

### Customization

- Adjustable QR code size
- Custom QR foreground color
- Custom background color
- Built-in contrast analysis
- Four QR error-correction levels

### Actions

- Download generated QR codes as PNG
- Copy generated QR codes to the clipboard
- Regenerate QR codes with different settings

### Progressive Web App

- Installable PWA
- Standalone application mode
- Service Worker
- Offline caching
- Local QR generation library
- 192×192 and 512×512 application icons

### Responsive UI

- Desktop support
- Mobile support
- Responsive layout
- Touch-friendly controls

---

## How It Works

QRify performs QR generation entirely on the client side.

```text
User Input
    │
    ▼
JavaScript
    │
    ▼
QRCode.js
    │
    ▼
QR Code
    │
    ├──► Download
    │
    └──► Copy
```

There is no backend involved in the QR generation process.

The browser handles the input, generates the QR code, and displays the result locally.

---

## QR Customization

### Size

The QR code size can be adjusted using the built-in size control.

### Colors

Users can customize:

- QR foreground color
- QR background color

### Contrast Detection

QR codes require sufficient contrast between the foreground and background.

QRify calculates the contrast ratio and provides feedback:

```text
✓ Excellent contrast
✓ Good contrast
⚠ Low contrast
⚠ Very low contrast
```

This helps users avoid creating QR codes with insufficient visual contrast.

### Error Correction

QRify supports all four standard QR error-correction levels:

```text
L → 7%
M → 15%
Q → 25%
H → 30%
```

Higher error correction allows a QR code to tolerate more damage or obstruction.

---

## Offline Support

QRify uses a Service Worker and the Cache API to cache the application's core resources.

```text
QRify
 │
 ├── index.html
 ├── style.css
 ├── script.js
 ├── manifest.json
 ├── qrcode.min.js
 └── application icons
        │
        ▼
   Cache Storage
```

After the initial load, the application can continue working without an internet connection.

The QR generation library is stored locally in the repository instead of being loaded from a third-party CDN.

This allows the core QR-generation functionality to continue working offline.

---

## Progressive Web App

QRify uses standard web platform features to behave like an installable application.

```text
Web App Manifest
       +
Service Worker
       +
Cache API
       +
Application Icons
       │
       ▼
Installable PWA
```

The Web App Manifest defines the application's name, appearance, icons, and standalone display configuration.

The Service Worker handles the application's offline cache.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive UI |
| JavaScript | Application logic |
| QRCode.js | QR code generation |
| Web App Manifest | PWA configuration |
| Service Worker | Offline functionality |
| Cache API | Resource caching |
| GitHub Pages | Deployment |

No frontend framework or build system is required.

The project intentionally uses vanilla technologies to keep the implementation understandable.

---

## Project Structure

```text
qrify/
│
├── index.html
├── style.css
├── script.js
├── manifest.json
├── sw.js
├── README.md
├── LICENSE
│
├── libs/
│   └── qrcode.min.js
│
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Running Locally

QRify is a static web application and does not require a backend.

The easiest way to run it during development is with VS Code and Live Server.

```text
Open the project
       │
       ▼
Open index.html with Live Server
       │
       ▼
Open the provided localhost URL
```

A local development server is recommended because Service Workers require a secure context. `localhost` is supported for development.

---

## Deployment

QRify is designed to work as a static site and can be deployed using GitHub Pages.

No backend server or server-side runtime is required.

The application only needs to be served over HTTPS for production PWA functionality.

---

## Privacy

QRify is designed around client-side processing.

There is no:

- User account system
- Database
- QR-generation backend
- Server-side QR processing
- Required analytics service

QR generation happens locally in the browser.

---

## Current Status

QRify v1 is functional.

| Feature | Status |
|---|---|
| QR generation | ✅ Complete |
| Text support | ✅ Complete |
| URL support | ✅ Complete |
| URL handling | ✅ Complete |
| QR customization | ✅ Complete |
| Contrast detection | ✅ Complete |
| Error correction | ✅ Complete |
| PNG download | ✅ Complete |
| Clipboard copy | ✅ Complete |
| Responsive UI | ✅ Complete |
| Local QR library | ✅ Complete |
| PWA manifest | ✅ Complete |
| Service Worker | ✅ Complete |
| Offline caching | ✅ Complete |
| PWA icons | ✅ Complete |
| Installable PWA | ✅ Complete |

---

## Roadmap

Possible future improvements:

- [ ] QR logo / center-image support
- [ ] Additional QR content types
- [ ] Export presets
- [ ] Local QR generation history
- [ ] Web Share API integration
- [ ] Improved accessibility
- [ ] Automated testing
- [ ] Better scan diagnostics
- [ ] Additional UI themes
- [ ] More advanced QR customization

The project will grow gradually rather than adding unnecessary complexity from the beginning.

---

## Learning Goals

QRify is also a practical learning project.

Instead of immediately relying on a framework, the project focuses on understanding the fundamentals of the browser and web platform.

```text
HTML
  │
  ▼
CSS
  │
  ▼
JavaScript
  │
  ▼
DOM & Events
  │
  ▼
Browser APIs
  │
  ▼
Service Workers
  │
  ▼
Cache API
  │
  ▼
Progressive Web Apps
```

The project provides a foundation for moving toward larger JavaScript applications and eventually full-stack development.

---

## Why QRify?

The idea was simple:

> Build something small enough to understand, but useful enough to actually use.

QRify started with basic HTML, CSS, and JavaScript.

From there, the project grew through practical additions:

```text
Simple QR Generator
        │
        ▼
Customization
        │
        ▼
Contrast Detection
        │
        ▼
Local QR Library
        │
        ▼
Service Worker
        │
        ▼
Offline Cache
        │
        ▼
Installable PWA
```

The goal isn't to make the first version unnecessarily complicated.

The goal is to build, understand, improve, and keep going.

---

## Future Direction

QRify is intentionally starting with vanilla web technologies.

As the project evolves, the application can be used as a foundation for experimenting with larger JavaScript applications and eventually full-stack development.

Possible future stack exploration:

```text
JavaScript
    │
    ▼
React
    │
    ▼
Node.js / Express
    │
    ├──► PostgreSQL
    │
    └──► MySQL
```

The current version stays simple on purpose.

---

## License

This project is licensed under the MIT License.

See [LICENSE](LICENSE) for details.
