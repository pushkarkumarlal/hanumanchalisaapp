# Google Play submission checklist

Answers for every Play Console form, matched to what the app actually does.

## 1. Build
```bash
npx eas-cli@latest login
npm run build:android          # production profile -> signed .aab
```
Download the `.aab` from the EAS build page. The **first** release must be uploaded by hand in
Play Console (Testing > Internal testing > Create release). After that, `npm run submit:android`
works (it needs a Google service-account JSON key).

When asked about Play app signing, accept **Google-managed app signing**. EAS keeps the upload key;
back it up with `npx eas-cli@latest credentials`.

New personal developer accounts must run a **closed test with at least 12 testers for 14 days**
before production access unlocks.

## 2. Store listing
- **App name:** Hanuman Chalisa – Jaap Counter
- **Short description (≤80):** Read Shri Hanuman Chalisa in Hindi and count your jaap. Offline, no ads.
- **Full description:**

  > Read the complete Shri Hanuman Chalisa in clear Devanagari text and keep count of your jaap.
  >
  > • Full Hanuman Chalisa: dohas and all 40 chaupais
  > • Jaap counter with gentle vibration and a stronger one at every 108 (one mala)
  > • Your count is saved on your phone, even after you close the app
  > • Four text sizes for comfortable reading
  > • Screen stays on while you recite
  > • Classic public-domain paintings of Hanuman Ji
  > • Works fully offline. No ads, no sign-in, no data collected.
  >
  > Jai Shri Ram.

  Don't add ratings, "best/#1", keyword lists or other app names. Those break the metadata policy.
- **Category:** Lifestyle (or Books & Reference)
- **Screenshots:** use `screenshots/play-store/`, but **skip `01-home-image1.png`**: it shows the
  image that was removed. Re-take a home screenshot if needed.
- **Feature graphic:** 1024×500 PNG/JPG (required). Build it from public-domain art only.
- **Contact email:** required, and shown publicly.

## 3. App content (Policy > App content)
| Form | Answer |
| --- | --- |
| Privacy policy | Public URL of `PRIVACY.md` (for example GitHub Pages or a public repo link). Replace `<your support email>` first. |
| Ads | **No**, the app has no ads |
| App access | **All functionality available without special access** |
| Content rating (IARC) | Category *Reference, News, or Educational*. Answer **No** to violence, sexuality, language, controlled substances, gambling, user interaction, sharing location, and digital purchases. Expected rating: Everyone / 3+ |
| Target audience | **13–15, 16–17, 18+**. Leaving out under-13 avoids the Families policy. Answer "No" to "appeals to children". |
| Data safety | Collects data: **No**. Shares data: **No**. (On-device storage and Android Auto Backup don't count as collection.) |
| Government app | No |
| Financial features | None |
| Health | None |
| News app | No |

## 4. Before you publish
- [ ] `PRIVACY.md` contact email filled in and hosted publicly
- [ ] Hosted URL entered in Play Console
- [ ] `hanuman_1.jpg` stays out of the app unless you have written permission from its artist
- [ ] Policy declarations accepted: Developer Programme Policies, Play app signing ToS, US export
      laws. The app has no custom encryption, so the export declaration is accurate.
