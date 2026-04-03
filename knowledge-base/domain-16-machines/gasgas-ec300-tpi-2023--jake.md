# MACHINE-01: GasGas EC300 TPI 2023

---

## Frontmatter

```yaml
---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: machine_profile
  manufacturer: GasGas
  model: EC300 TPI
  year: 2023
  platform_family: "KTM Group TPI 300 Two-Stroke"
  mod_layer: true

# ── BLOCK 2: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: MACHINE-01
  title: "GasGas EC300 TPI 2023"
  domain: 16
  status: draft
  engine_type: 2T
  fuel_system_type: TPI
  suspension_architecture: linkage
  version: 1.0
  last_updated: 2026-04-03
---
```

---

## 1. Identity & Platform

**Manufacturer:** GasGas  
**Model:** EC300 TPI  
**Year:** 2023  
**Platform family:** KTM Group TPI 300 Two-Stroke

The EC300 TPI shares its engine and gearbox internals with the KTM 300 EXC TPI and Husqvarna TE300i. The behaviourally significant differences between models are suspension architecture (GasGas uses linkage-actuated rear suspension; KTM uses PDS direct-mount) and brake system manufacturer (GasGas uses Braktec; KTM uses Brembo). All behaviour descriptions in this entry apply to the GasGas EC300 TPI 2023 specifically.

---

## 2. Stock Build Configuration

| Component | Stock Specification |
|-----------|-------------------|
| Engine | 300cc two-stroke, reed valve induction, counterbalanced crank |
| Fueling | Synerject TPI — dual injectors, transfer port mounted, Gen 2 (2023) |
| Clutch | Braktec hydraulic, diaphragm spring |
| Gearbox | 6-speed (exact tooth count unverified — see Section 8) |
| Final drive | Assumed 13/50 (unverified — see Section 8) |
| Suspension front | WP XPLOR 48mm open-cartridge forks |
| Suspension rear | WP XACT rear shock, linkage-actuated (see Section 8) |
| Brakes | Braktec hydraulic front and rear |
| Dry weight | ~105 kg (approx) |

---

## 3. Engine & Drivetrain Behaviour

### Torque and power delivery

The engine produces usable torque from low RPM, building continuously with throttle opening. Transition into the main power range is progressive rather than abrupt. Power continues building through the mid-to-upper rev range, with peak power in the upper portion of the usable RPM band.

### TPI throttle response

The Synerject TPI system delivers fuel via injectors at the transfer ports, controlled by an ECU that targets a consistent fuel-air ratio across operating conditions. At initial throttle openings from low RPM, power increases gradually rather than with an immediate step change in output. Above the initial opening threshold, power delivery is consistent and linear through mid-range. Gen 2 TPI (2023) maintains this consistency more reliably at part-throttle than Gen 1.

### Engine braking

Two-stroke engine braking produces lower deceleration force than four-stroke equivalents. On closed throttle, rear-wheel deceleration from engine braking is modest; larger speed reduction requires brake-system input.

### Flywheel and rotational inertia

The counterbalanced crank carries moderate rotational mass. Power pulses at the rear wheel are partially smoothed, producing more consistent traction delivery on low-grip surfaces. The engine carries RPM through brief load spikes, producing resistance to stall on rough or inconsistent terrain. On snap-open throttle inputs, RPM builds with a slight inertia delay — the engine does not rev instantly to the target RPM.

### Clutch dependency

Clutch modulation is a primary mechanism for regulating torque application at low speed and maintaining engine speed above stall threshold. Clutch dependency on this platform is high.

---

## 4. Suspension & Chassis Behaviour

### Front suspension

The WP XPLOR 48mm open-cartridge forks handle single impacts adequately. On repeated inputs — rock gardens, braking bumps, and successive square-edge hits — damping consistency degrades. Damping force decreases as fork oil heats under repeated load, producing increased front deflection and less consistent tracking through later impacts in a sequence.

### Rear suspension — linkage architecture

The rear shock is actuated through a linkage system that connects the swingarm pivot to the shock. The linkage geometry produces a rising rate through the travel — resistance to compression increases progressively as the shock moves deeper into its stroke.

**Under throttle load:** The rear compresses into the early portion of the stroke under drive load. Initial squat is compliant; resistance builds progressively as travel increases. Chassis pitch change under sustained drive load is gradual rather than abrupt.

**Under hard braking:** Forward weight transfer causes the rear to rise. The progressive linkage rate buffers the rate of rear extension, producing a controlled chassis pitch response under braking load.

**On repeated impacts:** The rising rate provides increasing resistance as travel increases, which supports chassis stability through successive impact sequences. The stock WP XACT shock provides adequate damping for trail-speed riding. On aggressive technical terrain with multiple successive hard impacts, damping consistency decreases, producing increased rear-end movement through the later impacts of a sequence.

**Under weight transfer:** Chassis attitude changes progressively with load shifts. The rate of chassis response increases as the shock moves further into its travel, producing more resistance to bottoming under combined load and impact conditions.

---

## 5. Brake & Control Character

### Front brake

Braktec hydraulic front brake. The build from initial contact to stronger braking force is gradual rather than abrupt. Peak braking force is accessible through progressive lever travel.

### Rear brake

Braktec hydraulic rear brake. Engagement character mirrors the front — gradual force build from initial pedal input. The rear brake produces useful speed management through progressive pedal application.

### Clutch

Braktec hydraulic clutch with diaphragm spring. Engagement is progressive — drive connects gradually as the lever is released. Clutch slip for torque modulation is achievable through lever position control across the engagement range.

---

## 6. Stock Behaviour Summary

The EC300 TPI is a 300cc two-stroke with electronic fuel injection, producing usable torque from low RPM with a progressive, wide delivery curve. Engine braking is modest — the brake system is the primary deceleration mechanism. The stock WP suspension handles single hits and trail-speed riding adequately; damping consistency decreases under repeated hard inputs at both ends. Brake engagement builds gradually from initial contact to peak force. Clutch dependency is high — clutch modulation is a primary control input at low speed and on technical terrain.

---

---

# 7. Modification Layer: Jake Rigby — GasGas EC300 TPI 2023

> **Architecture note:** In production, modification data lives on the rider's user profile, not in Domain 16. It is included here for MVP convenience since Jake is the only test user. When the product scales, Domain 16 holds stock bike data only. Rider modifications are stored on the user profile and layered on top of the stock entry at runtime.

## Scope Rule

Only modifications that affect the following are documented:

- **Engine performance** — power delivery, fueling, throttle response
- **Gearing** — ratios, final drive
- **Suspension** — how the bike responds to terrain inputs
- **Tyres and mousse** — traction, grip characteristics, contact patch behaviour

Modifications that do not affect how the bike responds to rider inputs or terrain are out of scope.

## Base Bike

GasGas EC300 TPI 2023 (MACHINE-01)

## Modifications

### Engine: TSP + OXA Coordinated Package

**Component changed:** Cylinder head, ECU map, exhaust system

**Stock baseline:** Stock cylinder head (higher compression), stock ECU map, stock exhaust

**Modified setup:** TSP low compression cylinder head, TSP ECU flash (remap), TSP relocation kit, OXA front pipe (expansion chamber), OXA hard enduro silencer. These components are designed to work as a system.

**Behavioural delta:**
- *At clutch engagement from rest and at low-RPM throttle inputs:* Sharp torque onset is substantially reduced. The powerband is wider and more linear through the rev range.
- *At snap throttle from low RPM:* The rate of power increase is more gradual than stock.
- *At very low RPM under load:* Stall resistance is increased. The engine sustains RPM across a wider low-RPM window before stalling.
- *On low-traction surfaces at moderate throttle openings:* Rear wheel spin from abrupt torque delivery is reduced compared to stock.

**Scope note:** The reduced bottom-end torque onset on this setup differs from stock platform behaviour. The throttle response characteristics described in Sections 3 and 6 reflect stock configuration and do not apply to this modified engine setup.

---

### Suspension: K-Tech OVR Forks + K-Tech Bladder Rear Shock

**Component changed:** Fork internals (front), complete rear shock

**Stock baseline:** WP XPLOR 48mm open-cartridge forks; WP XACT linkage rear shock

**Modified setup:** K-Tech OVR closed-cartridge pressurised fork cartridges installed in the stock fork legs. K-Tech bladder rear shock replacing stock WP XACT unit.

**Behavioural delta — front:**
- *On successive rough-terrain impacts:* Front deflection is reduced. The closed-cartridge pressurised system maintains more consistent damping force through repeated inputs compared to stock open-cartridge forks.

**Behavioural delta — rear:**
- *On repeated impacts:* The rear maintains consistent damping force rather than fading under sustained load.
- *Under hard braking:* Chassis pitch change during forward weight transfer is more controlled.
- *Under acceleration load:* Rear squat builds more consistently than stock.

**Scope note:** With stock suspension, chassis movement under repeated inputs can originate from suspension fade as well as from rider input. With K-Tech front and rear, suspension fade as a contributing factor to chassis instability is substantially reduced.

---

### Front Tyre: Plews Grand Prix Medium + Standard Techno Mousse

**Component changed:** Front tyre and insert

**Stock baseline:** Stock OEM tyre and tube

**Modified setup:** Plews Grand Prix Medium tyre with standard Techno mousse (not drilled)

**Behavioural delta:**
- *Front traction on typical enduro terrain:* Grip and feedback profile is close to a standard enduro tyre at equivalent operating conditions. No significant delta from stock front traction characteristics.

**Scope note:** See front-to-rear traction imbalance note under rear tyre.

---

### Rear Tyre: Mitas Super Light Terraforce + Techno Red Mousse (Drilled)

**Component changed:** Rear tyre and insert

**Stock baseline:** Stock OEM tyre and tube

**Modified setup:** Mitas Super Light Terraforce tyre with Techno Red mousse insert, drilled with approximately 20 holes to reduce effective pressure.

**Behavioural delta:**
- *Rear traction on soft and loose terrain:* Substantially increased. The Super Light carcass is thinner and more flexible than a standard enduro carcass. Techno Red is a softer compound than standard Techno. Drilling approximately 20 holes further reduces effective pressure, increasing contact patch deformation on soft surfaces.
- *Tyre pressure adjustment:* Not applicable. Both ends run mousse at fixed effective pressures.

**Interaction note — front-to-rear traction imbalance:**
Rear traction on this setup substantially exceeds front traction. On surfaces where the front tyre approaches its grip limit, the rear tyre is not the limiting factor. Front wash-out events on this bike occur at the front contact patch — the rear does not push the front beyond its grip limit on typical enduro terrain. The front tyre is the lower-traction end of the contact patch pair.

---

### Gearing: Stock

No modification. Stock gearing retained.

---

## 8. Open Items / Verification Notes

- [ ] Confirm exact stock gearing — front and rear tooth count. Currently assumed 13/50.
- [ ] Confirm stock dry weight. Currently listed as ~105 kg approx.
- [ ] Confirm exact stock rear shock model. Listed as WP XACT — verify against 2023 GasGas EC300 TPI spec sheet.
