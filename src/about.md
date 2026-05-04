---
layout: layouts/base.njk
title: About
description: About Safe Streets Co. — why this site exists and how it's built.
permalink: /about/
---

<section class="prose">

# About Safe Streets Co.

**Safe Streets Co.** tracks Colorado legislation that makes streets safer for
people — especially kids walking and biking to school, neighbors crossing
the road, and anyone moving outside a car.

## Why this exists

State legislatures move fast. By the time a bill is on the calendar for a
hearing, supporters often have less than a week to organize testimony. Most
people have never testified before, don't know how the signup portal works,
and don't know what to write. The result: committees hear from a small set
of regulars while the broader supportive public stays quiet.

This site closes that gap for one specific cause: traffic-safety legislation
in Colorado. For each bill we track, we publish:

- **What the bill does**, in plain language
- **When the next hearing is** — and how to sign up to testify
- **Draft testimony language** for different audiences (parents, organizers,
  general supporters)
- **An FAQ** sourced from the bill's actual advocates, not invented

## Scope

Currently: Colorado state legislation. Eventually: more states, possibly
city-level work too. The URL structure (`/bills/co/<bill>/`) is built to
expand.

Currently: school-zone safety, slower-speed legislation, traffic calming.
Long term: any state-level bill that makes a street safer for someone
without a steering wheel.

## How it's built

A static [Eleventy](https://www.11ty.dev/) site. Content lives as markdown
files with structured frontmatter — adding a new bill is one new file. No
JavaScript framework, no build pipeline beyond `eleventy`, no analytics, no
forms. The repo is open source on GitHub.

## Who's behind it

[Brown Bike Bus](https://www.brownbikebus.com/) organizers and friends.
This is volunteer work; the site is a side effect of advocacy, not a product.

</section>
