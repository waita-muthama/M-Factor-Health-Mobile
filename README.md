# M-FACTOR HEALTH

**Yellow-themed Android/iOS patient education prototype built with Expo, React Native and TypeScript.**

This source code launches as a standalone mobile app and runs its symptom-topic matcher **on the device**, without a server, internet connection, user account, or MySQL database. It is an original companion concept to the earlier M-medicine project; it is **not yet connected** to the earlier backend. It is not a medical device, prescribing application, validated triage tool, or production-ready patient service.

## What is included

- Home dashboard, searchable health topic and medication library, and premium yellow M-Factor Health brand.
- Free-text symptom input with offline keyword-based educational topic matching.
- High-risk symptom screening that suppresses matching results and urges emergency assessment for selected warning phrases; **not a comprehensive or validated emergency screener**.
- Adult-only gate for displaying **general examples** of nonprescription products; hides the examples if pregnant/breastfeeding, a chronic illness or other medicines are reported, or a medicine allergy is indicated.
- 12 demonstration health topics and 10 general nonprescription product/medicine reference entries; warnings, self-care information, and direct public source URLs.
- Medicine packaging illustrations **created specifically for this interface**, not photos of any actual commercial product.
- Medicines and health topics bookmarkable on-device using AsyncStorage. Search history exists **only for the current session**, not in a database.
- A detailed medication viewer, contraindication alerts, health topic viewer, emergency information screen, privacy statement and editorial policy.
- Twelve offline unit tests of the symptom-matcher logic.
- EAS build configuration for eventual app installation; the archive does **not** include APK or IPA builds.

## Software to install — Windows / Linux / macOS

1. **Visual Studio Code:** https://code.visualstudio.com/ — to **view and edit** the source code. Suggested extensions: ESLint, Prettier, React Native Tools.
2. **Node.js (current LTS):** https://nodejs.org/ — provides `node` and `npm` needed to install packages and start the preview.
3. **Expo Go** on Android or iPhone: https://expo.dev/go — to preview the app on your phone **if the installed Expo Go supports SDK 57**. Expo Go and SDK versions can differ. If you get a version error, use a compatible Expo Go build or an EAS development build; see Expo documentation.
4. **Optional Android Studio:** https://developer.android.com/studio — if you want an Android emulator; not necessary when you use a physical phone.
5. **Optional Git:** https://git-scm.com/ — useful for version control, not required to view or run this project.

**No MySQL, Docker or extra native SDK is required to test this mobile-first prototype.** Production plans can later connect to a backend + MySQL with medically approved catalog content.

## Open the code in VS Code

1. Extract the ZIP anywhere, for example `C:\Projects\M-Factor-Health-Mobile`.
2. Open VS Code → **File > Open Folder** → select the extracted `M-Factor-Health-Mobile` folder.
3. Open **Terminal > New Terminal** and run:

```powershell
node --version
npm --version
npm install
npx expo install --fix
npm run start
```

You will see a QR code in the terminal/Expo interface. Scan it with Expo Go on a compatible Android device; on iPhone, use the iPhone camera or the documented Expo workflow. Both devices normally need access to the same local network. If that is unavailable, use the tunnel mode:

```powershell
npx expo start --tunnel
```

Tunnel mode requires internet connectivity and, depending on Expo CLI, may prompt to install `@expo/ngrok`.

You can also open the website preview with `npm run web`, but `react-native-web` and `react-dom` may first need to be installed with `npx expo install react-dom react-native-web`. The primary target is Android/iOS.

**SDK note:** This starter targets **Expo SDK 57** (React 19.2 and React Native 0.86). Run `npx expo install --fix` after installing, to align library versions with Expo's current compatibility matrix. See https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/ . If you are on an older Expo Go version, a compatible Expo Go build or EAS development build is needed.

## App folder map

```text
M-Factor-Health-Mobile/
├── App.tsx                 Main navigation and mobile screens
├── src/
│   ├── catalog.ts          Demonstration clinical topic & medicine catalogue
│   ├── engine.ts           Symptom matching and conservative warning gates
│   ├── theme.ts            Yellow/navy visual design tokens
│   ├── ui.tsx              Reusable buttons, headings, badges and panels
│   └── medImages.ts        Locally bundled illustration mapping
├── assets/
│   ├── icon.png, adaptive-icon.png, splash.png, hero.png
│   └── medicines/          Ten original package illustrations
├── tests/engine.test.mjs   Twelve unit tests, including emergency overrides
├── docs/
│   ├── PATIENT_SAFETY.md   Safety, medical content and clinical governance
│   └── ARCHITECTURE.md     Integration and production architecture guidance
├── app.json                Native application name & identifiers
├── eas.json                Mobile build profiles
├── package.json            Dependencies and commands
└── tsconfig.json           TypeScript project configuration
```

## Run offline tests

```powershell
npm test
```

Tests use built-in Node.js TypeScript stripping and are confirmed using Node 22.16.0. Other Node.js LTS versions may handle `.ts` test execution differently. For full static type checking after installation:

```powershell
npm run check
npx expo-doctor
```

## How to use the app

1. Open **Symptoms**.
2. Type a condition or symptom such as `mild headache`, `hay fever`, or `loose stool`.
3. Read and answer the safety questions. Only a self-identified adult without selected risk flags can view general OTC examples.
4. Tap **Explore health information**. Read potential topic matches, self-care and warning signs.
5. Open a medicine detail card to read the general medicine class, limitations, precautions and source.
6. Bookmark medications or conditions in **Saved**. No text from symptom searches is written to permanent storage.

## Operational limitations and patient safety

This starter **must not be offered as a live patient diagnostic/prescribing or clinical decision-support product** as-is. The associations are simple keywords, not a diagnosis, clinical prediction, personalized treatment selection, drug–drug interaction analysis, dose calculator, screening pathway, or comprehensive emergency service. The app intentionally does **not** specify doses, initiate prescriptions, dispense medicine, or suggest antibiotics for urinary symptoms.

The current medical reference material has not had independent clinical sign-off. All content, UI flows, red-flag criteria, evidence links, patient instructions, age/pregnancy checks, localization, and accessibility need review by qualified local clinical and regulatory specialists. Do not use this prototype for real clinical decisions. Emergency care instructions do not trigger a call or know the user's location. Certain presentations may require urgent care even if no alert appears.

**Privacy:** Symptom matching occurs on device. Recent searches are in memory only; bookmarked IDs are stored locally with AsyncStorage. This is not designed for protected clinical records. Adding patient accounts, PHI, clinician feedback, cloud synchronization or analytics would require a separate security/privacy architecture, consent and applicable legal compliance.

## Building installable apps (later)

Install / sign in to EAS CLI after testing the app:

```powershell
npm install -g eas-cli
npx eas login
npx eas build:configure
npx eas build --platform android --profile preview
```

The Android **preview** profile is configured to build an APK using EAS if your account and native build requirements permit. iOS builds require Apple signing/credentials and the relevant EAS workflow. Follow https://docs.expo.dev/build/introduction/ . This ZIP contains **source code only**, not a generated APK / IPA. Shipping publicly requires clinical, legal, security and regulatory readiness.

## How to connect MySQL / M-medicine later

Do **not** connect the phone directly to MySQL. Recommended: `mobile app → authenticated HTTPS REST API → MySQL`, with clinician-approved versions of catalog entries and governance controls. See `docs/ARCHITECTURE.md`. Existing M-medicine inventory and admin functionality belongs on a secure service/backend and **is not included or connected in this mobile-first archive**.

## Main links

- Expo setup: https://docs.expo.dev/get-started/create-a-project/
- Expo Go: https://expo.dev/go
- Medical education: https://medlineplus.gov/
- NHS health reference: https://www.nhs.uk/
- World Health Organization: https://www.who.int/
