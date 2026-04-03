# MACHINE-02: GasGas EC300 TBI 2024

---

## Frontmatter

```yaml
---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: machine_profile
  manufacturer: GasGas
  model: EC300 TBI
  year: 2024
  platform_family: "KTM Group Austrian 2-Stroke Enduro"
  mod_layer: false

# ── BLOCK 2: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: MACHINE-02
  title: "GasGas EC300 TBI 2024"
  domain: 16
  status: draft
  engine_type: 2T
  fuel_system_type: TBI
  suspension_architecture: linkage
  version: 1.0
  last_updated: 2026-04-03
---
```

---

## 1. Identity & Platform

**Manufacturer:** GasGas  
**Model:** EC300 TBI  
**Year:** 2024  
**Platform family:** KTM Group Austrian 2-Stroke Enduro

The EC300 TBI shares its engine and gearbox internals with the other KTM Group 300cc two-stroke enduro models of the same model year. All share the 300cc TBI engine architecture, the same electronic exhaust control system, and the same 6-speed gearbox. The behaviourally significant differences between models in the family are suspension specification, chassis geometry, and brake system configuration. All behaviour descriptions in this entry apply to the GasGas EC300 TBI 2024 specifically.

---

## 2. Stock Build Configuration

| Component | Stock Specification |
|-----------|-------------------|
| Engine | 300cc two-stroke, counterbalanced crank, reed valve induction |
| Fueling | Keihin TBI — 39mm throttle body; ECU monitors air temp, water temp, crankcase pressure, RPM, and throttle position |
| Exhaust control | Electronic exhaust control system — manages lateral and main exhaust port timing; no mechanical powervalve |
| Clutch | Diaphragm-spring clutch with integrated damping system; Braktec hydraulic actuation |
| Gearbox | 6-speed wide-ratio (exact tooth count unverified — see Section 8) |
| Final drive | Unverified (see Section 8) |
| Suspension front | WP XPLOR 48mm open-cartridge; split damping (compression damping one leg, rebound damping other leg); 300mm travel; adjusters on top caps |
| Suspension rear | WP XACT monoshock, linkage-actuated; hand-adjustable high/low speed compression and rebound; 300mm travel |
| Brakes | Braktec hydraulic front and rear; 260mm front disc, 220mm rear disc |
| Frame | Chromoly steel central double-cradle; aluminium subframe |
| Swingarm | Aluminium |
| Tyres | Market-dependent (see Section 8) |

---

## 3. Engine & Drivetrain Behaviour

### Torque delivery shape

The engine delivers measurable torque from low RPM. The electronic exhaust control system holds the exhaust ports at reduced area at low RPM, restricting exhaust flow and tuning the cylinder's resonant characteristics to extract torque at lower engine speeds. As RPM increases, the system progressively opens the port area, matching exhaust flow to the volume demands of higher-speed operation. This produces a power curve that delivers usable torque in the lower portion of the rev range, builds continuously through the mid-range, and reaches peak power in the upper rev range.

### TBI throttle response

Fuel is introduced at the 39mm Keihin throttle body upstream of the crankcase and travels through the reed valves into the cylinder via the conventional two-stroke charge path. The ECU maps fueling simultaneously against throttle position, RPM, air temperature, water temperature, and crankcase pressure. At initial throttle openings from low RPM, fuel delivery responds directly to the throttle position signal — the rate of power increase from crack-open is determined by the ECU map at those operating conditions. Through the mid-range and upper rev range, fueling tracks throttle input with consistent delivery as the ECU responds to changing sensor inputs.

The throttle body introduces fuel upstream, and the ECU simultaneously manages fueling and exhaust port area based on real-time sensor inputs. Both fuel delivery and exhaust port timing respond to the same throttle input signal, producing a coupled control of charge and exhaust flow across the rev range.

### Electronic exhaust control behaviour

The electronic exhaust control system electronically controls exhaust-port opening progression, with the lateral exhaust ports opening before the main exhaust port, without a mechanical actuator. At low RPM, the system holds the ports at reduced area. As RPM increases, port area is increased progressively. The rate and timing of port opening is governed by the ECU rather than by a fixed mechanical threshold. The transition through the power range is continuous rather than a single step-change at a fixed RPM point.

### Engine braking

Closed-throttle engine braking produces modest rear-wheel deceleration. The brake system is the primary deceleration mechanism.

### Flywheel and rotational inertia

The counterbalanced crank carries moderate rotating mass. This rotational inertia partially smooths power pulses at the rear wheel, producing more even traction delivery across throttle inputs. Under brief terrain-induced load spikes, the crank's rotational momentum resists immediate RPM drop. On snap-open throttle inputs, RPM builds with a slight inertia delay — the engine does not respond instantaneously to the throttle position signal.

### Stall resistance

The ECU monitors crankcase pressure as a real-time indicator of engine load and adjusts fueling accordingly. This extends the operating window at low RPM before a lean-condition stall develops under sustained load. The counterbalanced crank's rotational inertia also resists stall on brief load spikes. At very low RPM under sustained load, stall remains possible.

### Clutch dependency

Clutch modulation is a primary mechanism for torque regulation at low speed. The clutch damping system absorbs drivetrain shock at the moment of clutch engagement. Clutch slip for torque modulation is achievable through lever position control across the engagement range. Clutch dependency at low speed is high.

---

## 4. Suspension & Chassis Behaviour

### Front suspension

The WP XPLOR 48mm open-cartridge fork uses a split-function damping architecture — one leg handles compression damping, the other handles rebound damping. On single impacts, the fork compresses and returns consistently. On repeated inputs — successive square-edge hits, braking bumps, and impact sequences — open-cartridge oil-bath damping is susceptible to thermal fade. As fork oil heats under sustained loading, damping force decreases, producing increased front deflection and less consistent tracking through later impacts in a sequence. The 300mm travel provides stroke capacity for large single hits.

### Rear suspension — linkage architecture

The WP XACT rear shock is actuated through a linkage system connecting the swingarm pivot to the shock. The linkage geometry produces a rising compression rate through the travel — resistance to compression increases progressively as the shock moves deeper into its stroke.

**Under drive load:** The rear compresses into the stroke under throttle application. Initial squat is compliant; as the shock moves deeper into travel, the rising linkage rate increases resistance to further compression. Chassis pitch change under sustained drive load is gradual.

**Under hard braking:** Forward weight transfer causes the rear to extend. The rising linkage rate buffers the rate of rear extension, moderating chassis pitch rate under braking load.

**On repeated impacts:** The rising rate provides increasing resistance as travel deepens, maintaining chassis stability through impact sequences.

**Under weight transfer:** Chassis attitude changes progressively with load shifts. The rising rate means resistance to further compression increases as the shock moves deeper into its travel, providing greater resistance to bottoming under combined load and impact conditions.

### Chassis

The chromoly steel central double-cradle frame provides structural rigidity at the engine and swingarm mounts while allowing a degree of controlled lateral flex under dynamic load.

---

## 5. Brake & Control Character

### Front brake

Braktec hydraulic front brake with 260mm disc. The 260mm swept area provides heat dissipation capacity under sustained or repeated braking. Braking force builds progressively from initial pad contact — there is a gradual increase from the initial engagement point through to peak braking force across lever travel. Modulation is available across the full lever travel range.

### Rear brake

Braktec hydraulic rear brake with 220mm disc. Engagement mirrors the front — braking force builds progressively from initial pedal input to peak force through pedal travel. The rear brake produces proportional speed management through progressive pedal application.

### Clutch

Braktec hydraulic clutch. The single diaphragm spring provides consistent engagement force across a range of operating temperatures. The integrated damping system absorbs drivetrain shock at the moment of engagement. Engagement is progressive — drive connects gradually as the lever is released from full disengagement to full engagement. Clutch slip for torque modulation is achievable through lever position control across the engagement range.

---

## 6. Stock Behaviour Summary

The EC300 TBI is a 300cc two-stroke with throttle body injection and an electronic exhaust control system. The ECU couples fueling and exhaust port area control to the same throttle input signal, producing a broad, continuous power curve from low RPM without a step-change transition point. Closed-throttle engine braking produces modest rear-wheel deceleration — the brake system is the primary deceleration mechanism. The diaphragm-spring clutch with integrated damping absorbs drivetrain shock at engagement; drive connection is progressive across the engagement range; clutch dependency at low speed is high. The front fork uses split-function compression and rebound damping; damping consistency decreases under repeated inputs as thermal fade develops in the oil-bath cartridge. The rear monoshock is linkage-actuated with a rising compression rate. Braktec brakes at both ends deliver progressive force build from initial contact through lever and pedal travel.

---

## 7. Modification Layer

This is a stock-only profile. `mod_layer: false`. No rider modification data is held in this file.

---

## 8. Open Items / Verification Notes

- [ ] Confirm exact stock gearing — front and rear sprocket tooth count. "6-speed wide-ratio" confirmed by reference data; final drive tooth count not provided.
- [ ] Confirm stock final drive ratio.
- [ ] Confirm stock dry weight. Not available in reference data.
- [ ] Confirm stock tyre fitment. Reference data notes market-dependent fitment (Dunlop or Maxxis). Verify specific model, compound, and size per market.
- [ ] Confirm electronic exhaust control system exact designation and manufacturer. Referred to throughout as "electronic exhaust control system" — verify exact component name.
- [ ] Confirm lithium-ion battery as standard fitment for all markets. Verify whether a lead-acid alternative was offered at any spec level.
- [ ] Confirm WP XACT rear shock exact model designation for 2024 GasGas EC300 TBI spec sheet.
- [ ] Confirm shared platform models within KTM Group Austrian 2-Stroke Enduro family for the 2024 model year.
- [ ] DDS clutch designation assumed from shared KTM Group platform; not confirmed from GasGas-specific primary source for 2024 EC300 TBI.
- [ ] Start system: electric start, lithium-ion battery, no kickstarter — reference data only; confirm as standard fitment for all markets and variants.
- [ ] Wheel sizes: 21" front, 18" rear wire spoke — reference data only; confirm as standard fitment.
