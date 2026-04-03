# Cross-Feature Consistency Spec — Terrain Feature KB v1

**Purpose**
This spec governs cross-feature consistency for all Terrain Feature KB entries. It does not replace `docs/kb-schemas-v1.md`; it sits alongside it and constrains vocabulary, severity logic, failure typing, and cross-entry separation so new entries do not drift as the feature set scales.

**Authority hierarchy**
Pipeline contracts (`docs/pipeline-contracts-v1.md`) are authoritative for all stage enum values. The schema (`docs/kb-schemas-v1.md`) is authoritative for entry structure. This spec does not define or override enum values or structural rules — it constrains how they are used within feature KB entries and enforces behavioural consistency across the feature set.

---

## 1. Scope

Applies to all `terrain_feature` entries in `knowledge-base/features/`.

Covers:

* severity language consistency
* allowed Stage 6 / Stage 7 vocabulary
* commitment profile structure
* failure-chain uniqueness
* classification boundary discipline
* observability discipline
* cross-entry overlap prevention

Does **not** replace:

* schema structure rules (`docs/kb-schemas-v1.md`)
* pipeline contract enum definitions (`docs/pipeline-contracts-v1.md`)

---

## 2. Severity Tier Rules

All feature entries must use the same four-tier severity model:

* `minor`
* `moderate`
* `significant`
* `major`

### Severity definition rule

Severity must be defined primarily by:

1. observable geometry
2. surface / condition modifiers
3. consequence
4. rider skill requirement as secondary commentary only

### Severity writing rule

Each tier definition must describe:

* feature geometry or physical scale
* commitment requirement
* error consequence

Do **not** define severity primarily by:

* rider confidence
* rider experience alone
* vague labels like "hard" or "very technical"

### Major tier rule

Major severity is primarily a **hazard / decision tier**, not a routine progression target.
Where appropriate, Section 4 and/or Section 10 should explicitly state that Stage 9 may recommend:

* walking the feature
* avoiding the line
* selecting an alternative route

---

## 3. Section 1 Consistency Rules

Every feature entry must include near the top of Section 1:

* **Primary Observable Signature**
* **Dominant Risk Axis**

### Primary Observable Signature rule

Must be:

* one sentence
* visually classifiable from footage
* feature-specific, not generic

### Dominant Risk Axis rule

Must identify the main physical risk mode, e.g.:

* pitch + landing impact
* lateral traction + fall-line drift
* sequential wheel placement + momentum decay
* bridge-phase instability + rear hook

---

## 4. Commitment & Reversibility Profile Rules

Every entry must include the same three subfields:

* **Point of no return**
* **Recovery window**
* **Bailout options**

### Writing rule

These must be written in feature-specific mechanics, but always in this order and with the same conceptual meaning:

* **Point of no return** = when the rider can no longer abort cleanly
* **Recovery window** = the time, space, or distance in which correction is still possible
* **Bailout options** = realistic pre-commitment or mid-feature exits

Do not invent alternate labels for these three ideas.

---

## 5. Stage 6 Failure Type Discipline

Only use Stage 6 failure types defined in `docs/pipeline-contracts-v1.md`.

Do not invent new Stage 6 values inside body text or frontmatter.

### Rule

Every Stage 6 classification used inside Section 5 must also appear in:

* `retrieval_triggers.SECONDARY.stage6_failure_types`
* `content_metadata.failure_types_associated`

### Usage notes

The following guidance describes how existing pipeline enum values should be applied within feature KB entries. These are usage conventions, not definitions — the definitions live in the pipeline contracts.

* `technique` — use for execution errors (body position, timing, input sequencing)
* `momentum` — use for insufficient, excess, or decayed usable forward drive
* `decision` — use for poor go / no-go judgment, speed choice, commitment judgment, feature read
* `line_choice` — use for wrong crossing line, wrong track, wrong approach angle where line is materially relevant to the failure
* `traction` — use for friction limit / unavailable grip as a primary failure contributor

If a value is not present in the Stage 6 enum defined in the pipeline contracts, do not use it regardless of how applicable it seems. Propose an enum addition through the normal pipeline change process instead.

---

## 6. Stage 7 Crash Type Discipline

Stage 7 values must be **crash outcomes only**.

Allowed values must come from the Stage 7 enum in `docs/pipeline-contracts-v1.md`.

Do **not** use as Stage 7 crash types:

* stall
* bounce-back
* nose-dive
* rear hook
* straddling
* bridge stall

These belong in:

* Stage 5 outcomes
* failure chains
* observability notes

### Rule

Every Stage 7 crash type used in frontmatter must represent an actual crash classification, not a mechanical event or intermediate state.

---

## 7. Expected Outcome Patterns Rule

Section 5 must include a compact **Expected Outcome Patterns** block before the failure chains.

### Writing rule

Keep it flat, short, and pipeline-oriented.

Include:

* successful outcome(s)
* imperfect but recoverable outcome(s)
* unstable or crash-linked outcome(s)
* bailout / manual recovery outcome(s), where relevant

Do not over-group or over-format this block.

---

## 8. Failure Chain Uniqueness Rule

Each feature entry must contain failure chains that are:

* mechanically distinct
* visually distinguishable
* not redundant with each other

### Cross-feature uniqueness rule

A failure chain may appear in more than one feature only if:

* the same label describes a genuinely different mechanism in that feature
* and the mechanism text makes the distinction explicit

Example:

* `bounce-back` on a step must describe flat-face rejection / crest rejection
* `bounce-back` on a log must describe curved-surface rearward deflection

### Duplicate prevention rule

Before finalising a new feature entry, compare Section 5 against all existing feature entries and check:

* Is this failure chain already covered elsewhere?
* If yes, is the mechanism materially different?
* If not materially different, do not duplicate it.

---

## 9. Classification Boundary Rule

Section 2 must define the feature against its nearest confusions.

Each entry must include:

* one **Classification hard rule**
* one **Classification boundary note**

### Hard rule

Must define what the feature **is not** in operational terms.

### Boundary note

Must explain how classification changes when:

* speed changes
* contact state changes
* direction of travel changes
* geometry is ambiguous

Classification boundary notes are mandatory for any feature that shares geometric or kinematic similarity with another committed feature entry. When writing boundary notes, reference only locked feature IDs — do not reference planned or uncommitted entries by ID.

---

## 10. Observability Discipline

Every entry must preserve the three-way observability split:

1. reliably confirmable
2. inferable with caveats
3. cannot be determined from footage

### Rule

Do not move hidden-state assumptions into "confirmable."

Examples of things that are usually **not directly confirmable**:

* exact speed
* exact height
* precise throttle timing
* exact clutch timing
* suspension settings
* rider confidence / fear
* hidden surface integrity

---

## 11. Cross-Reference Discipline

Only reference:

* locked feature IDs
* locked terrain IDs
* locked dynamics / biomech / control / intel IDs

If numbering is not confirmed locked, use the descriptive feature name instead of a numbered ID.

Do not leave speculative forward references in committed entries.

---

## 12. Vocabulary Discipline

Use the same terminology across all feature entries unless a different term is mechanically necessary.

Standard preferred terms:

* `front wheel`
* `rear wheel`
* `approach zone`
* `commitment threshold`
* `recovery window`
* `bailout options`
* `bridge phase` — only for logs / beam-like apex-supported states
* `bounce-back`
* `stall`
* `straddling`
* `rear hook`
* `tip-over`
* `OTB`

Do not introduce casual synonyms that fragment retrieval, such as:

* "endo" if `otb` is the controlled term
* "endover" if `otb` is the controlled term
* multiple labels for the same failure unless one is explicitly marked as colloquial and kept out of enums

---

## 13. Pre-Commit Audit Rule for Every New Feature

Before committing any new `terrain_feature` entry, run this check:

1. **Schema check**
   Does it comply with `docs/kb-schemas-v1.md`?

2. **Enum check**
   Are all Stage 3 / 4 / 5 / 6 / 7 values contract-valid per `docs/pipeline-contracts-v1.md`?

3. **Frontmatter/body consistency check**
   Are all Stage 6 and Stage 7 values used in the body also declared in frontmatter?

4. **Boundary check**
   Does Section 2 clearly separate this feature from its nearest adjacent committed features?

5. **Failure uniqueness check**
   Do any Section 5 failure chains duplicate existing features without a distinct mechanism?

6. **Severity consistency check**
   Are minor / moderate / significant / major written in the same pattern as existing locked entries?

7. **Commitment profile check**
   Does Section 1 include point of no return, recovery window, bailout options in the standard form?

8. **Observability check**
   Does the entry avoid claiming visibility for non-observable states?

9. **Cross-feature regression check**
   Does this new entry introduce any contradictions with previously committed features — geometry definitions, severity thresholds, or failure mechanisms?

No new feature should be committed until all nine checks pass.

---

## 14. Reference Features for Tone and Structure

Use these as style anchors when generating new entries:

* **FEATURE-01 Jump** — airborne / ballistic single-event reference
* **FEATURE-02 Off-camber** — continuous sustained-challenge reference (severity driven by geometry + surface interaction over distance, not a single moment)
* **FEATURE-03 Drop** — gravity-led descent reference
* **FEATURE-04 Step** — sequential wheel-management reference
* **FEATURE-05 Log** — curved-contact / bridge-phase reference

When unsure, match their:

* severity phrasing
* Section 5 failure-chain style
* observability discipline
* commitment profile structure

For **single-event features** (feature_class: single_event), use FEATURE-01, FEATURE-03, FEATURE-04, or FEATURE-05 as the primary reference.
For **continuous features** (feature_class: continuous), use FEATURE-02 as the primary reference.

---

## 15. Non-Negotiable Rule

Do not trade mechanical precision for stylistic novelty.

If a new feature entry sounds "fresh" but uses different severity logic, different failure vocabulary, different commitment structure, or different observability discipline from locked entries, it is inconsistent and must be revised before commit.
