# 📄 MOR Financial SurveyJS Form Deployment Guide (Cloudflare Pages)

This guide explains how we deployed a dynamic SurveyJS-based form using GitHub and Cloudflare Pages. The goal is to host an interactive lead intake form for MOR Financial, bypassing WordPress limitations.

---

## 📁 Project Structure

```
am-form/
├── index.html          # Main HTML with SurveyJS rendering logic
├── amform.json         # SurveyJS schema with all logic and fields
└── README.md           # This file
```

---

## 🧩 Technologies Used

* [SurveyJS](https://surveyjs.io/) (for form rendering and logic)
* [Cloudflare Pages](https://pages.cloudflare.com/) (for static hosting)
* GitHub (for version control and deployment integration)

---

## ✅ Features Implemented

* Dynamic form layout using panels, `visibleIf`, and conditional logic.
* Multi-section form including:

  * Account Manager selection
  * Deal Info & Details
  * Subject Property Address
  * Borrower Info (conditional)
  * Proposal Info (conditionally hidden)
* Fully styled using SurveyJS's modern theme and custom CSS
* JSON hosted externally and rendered with fetch.
* Submissions posted to Albato via webhook.

---

## 🚀 Deployment via Cloudflare Pages

### Step 1: Prepare GitHub Repo

* Repository name: `am-form`
* Add two key files:

  * `index.html` – contains SurveyJS + HTML/CSS logic
  * `amform.json` – stores SurveyJS schema

> ✅ Tip: Make sure `index.html` references `amform.json` correctly using `fetch()`

### Step 2: Set Up Cloudflare Pages

1. Go to **Cloudflare Pages** and click **"Create Project"**.
2. Connect your GitHub repository.
3. Select:

   * **Production Branch**: `main`
   * **Framework Preset**: `None`
   * **Build Command**: *(leave blank)*
   * **Build Output Directory**: `/`
4. Click **"Save and Deploy"**.

### Step 3: Access Your Form

After deployment, access it at:

```
https://<your-project-name>.pages.dev
```

For example:

```
https://am-form.pages.dev
```

---

## 🧠 SurveyJS Rendering Logic (in `index.html`)

```html
<link href="https://unpkg.com/survey-core@latest/default.min.css" rel="stylesheet" />
<script src="https://unpkg.com/jquery"></script>
<script src="https://unpkg.com/survey-jquery@latest/survey.jquery.min.js"></script>

<div id="surveyContainer"></div>
<script>
  const GITHUB_JSON_URL = "amform.json";
  Survey.StylesManager.applyTheme("modern");

  fetch(GITHUB_JSON_URL)
    .then(res => res.json())
    .then(surveyJson => {
      const survey = new Survey.Model(surveyJson);
      survey.clearInvisibleValues = "none";
      survey.mergeInvisibleValues = "always";

      survey.onComplete.add(function(sender) {
        const formData = sender.data;
        fetch("https://h.albato.com/wh/XYZ", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      });

      $("#surveyContainer").Survey({ model: survey });
    });
</script>
```

---

## 🧩 SurveyJS Schema Location

* Hosted in same repo as `amform.json`
* Referenced from `index.html` using `fetch('amform.json')`

---

## 📬 Webhook Integration

Form data is submitted to Albato via:

```
https://h.albato.com/wh/38/1lfn9r8/rcpnt76nkGOOjpAL2frbazJAMn_eJfuWTo179pi9AjE/
```

Update this URL as required for your automation setup.

---

## 🎨 Styling Tips

Custom CSS was added to:

* Organize fields into two-column layout
* Add spacing between sections
* Match MOR Financial’s form aesthetic

---

## 🛠 Troubleshooting

* **Dropdown values disappear?**

  * Caused by WordPress iframe sandboxing — solved by switching to Cloudflare Pages.
* **Missing styles?**

  * Ensure correct SurveyJS theme CSS is included
* **Form not loading?**

  * Double-check GitHub JSON URL and make sure it's relative (`amform.json`)

---

## 🔐 Future Enhancements

* Add server-side validation
* Attach file upload support via SurveyJS
* Capture submission timestamp and metadata

---

## 🧾 Credits

Form implementation and deployment orchestrated by [Hamza Mansoor Ali](mailto:hamzaa@morfinancial.com).

---

For any issues or support, please raise an issue in the [GitHub repository](https://github.com/hamzaali998/am-form).
