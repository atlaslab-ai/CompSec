---
layout: page
title: Laboratory
permalink: /laboratory/
lab_download_url: ""
---

Download the Docker environments for the course's hands-on exercises here. Each lab provides the services you will run on your own computer while working through the corresponding assignment.

## Hands-on 1: Internal Documents Lab

A document service for a fictional organization. Start the environment with Docker and use it to investigate access control, backups, and security logs.

{% if page.lab_download_url and page.lab_download_url != '' %}
{% assign download_prefix = page.lab_download_url | slice: 0, 8 %}
{% if download_prefix == 'https://' %}
<p><a href="{{ page.lab_download_url | escape }}"><i class="fas fa-file-archive" aria-hidden="true"></i> Download lab files (ZIP)</a></p>
{% else %}
<p><a href="{{ page.lab_download_url | relative_url }}"><i class="fas fa-file-archive" aria-hidden="true"></i> Download lab files (ZIP)</a></p>
{% endif %}
{% else %}
<p><i class="fas fa-file-archive" aria-hidden="true"></i> <strong>Lab files:</strong> Coming soon.</p>
{% endif %}
