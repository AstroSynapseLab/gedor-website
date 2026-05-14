# Changelog

## [Unreleased] — 2026-05-13

### Added
- Consent and terms text below both waitlist signup forms (hero and final CTA):
  - "By clicking Join the waitlist, you agree to our Terms of Service."
  - GDPR notice: data stored/processed by gedor.ai to manage waitlist request, with withdrawal instructions via privacy@gedor.ai and link to Privacy Policy.
- New **Roadmap** section replacing the removed infrastructure section:
  - **Now** — explains EU data sovereignty positioning: Gedor runs entirely within the EU under GDPR, with no exposure to US surveillance frameworks (contrasting with US cloud providers such as Microsoft, Amazon, and Google).
  - **Next** — AI Agents as a Service and Bring Your Own Agent, both EU-hosted.

### Changed
- "LLMs as a Service" corrected to "LLM as a Service" across the entire page (title, meta description, hero headline).
- Consent text phrasing updated to match the button label: "By clicking Join the waitlist" (was "Join Waitlist").

### Removed
- "Early access opens summer 2026." note removed from below the hero waitlist form.
- Detailed **Under the hood** infrastructure section removed (Bifrost, vLLM, Kubernetes, KServe chip details). Replaced by the new Roadmap section.

---

## [Unreleased] — 2026-05-13 (follow-up)

### Changed
- Devstral moved to position 01 in the Coding models tab, renamed to "Devstral 22B". Remaining models renumbered accordingly.
- Roadmap **Now** box shortened for visual balance with the **Next** box.
- Roadmap **Next** box lightly reworded for parity in length.
- Consent text rewritten from first person to second person ("I agree" → "you agree", "my information" → "your information").
- Consent text consolidated into a single sentence for clarity.

### Added
- "First in Croatia" callout added to hero badge, hero subtext, and trust strip (later removed).

### Removed
- All Croatia mentions removed from badge, hero subtext, and trust strip.
- Codestral 25.05 removed from Coding models list (MNPL license prohibits commercial use).
- Kimi K2.6 Thinking removed from Coding models list (ambiguous MIT-mod license).

### Added (models)
- Granite Code 20B (IBM, Apache 2.0) added to Coding models list.
- Yi Coder 9B (Apache 2.0) added to Coding models list.
- New **Vector Databases** section added as a standalone panel (separate from the Models tabs): Qdrant, Milvus, Weaviate, Chroma, LanceDB, Vespa, OpenSearch, pgvector — all Apache 2.0 / BSD-3 / PostgreSQL licensed, all clear for commercial hosting.
- Vector Databases section title updated to "Coming soon at launch." to match the Models section, making it clear both are part of the same launch.
- ISO 27001 added to the trust strip.
- Back to top button added (fixed, bottom-right), appears after 400px scroll, styled to match site design with yellow hover accent.

### Fixed
- Mobile responsiveness: added `@media (max-width: 430px)` overrides for nav margin, hero padding, waitlist form (vertical stack, full-width button), section padding, tabs, model list gap, final CTA padding, and footer link spacing.
