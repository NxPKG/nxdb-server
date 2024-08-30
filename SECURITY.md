# Security Policy
We are very grateful to the security researchers and users that report
back KhulnaSoft project security vulnerabilities. We investigate every report thoroughly.

## Reporting a vulnerability
To make a report, send an email to the private
[security@khulnasoft.com](mailto:security@khulnasoft.com)
mailing list with the vulnerability details. For normal product bugs
unrelated to latent security vulnerabilities, please head to
the appropriate repository and submit a [new issue](../../issues/new/choose).

### When to report a security vulnerability?

Send us a report whenever you:

- Think KhulnaSoft projects have a potential security vulnerability.
- Are unsure whether or how a vulnerability affects KhulnaSoft projects.
- Think a vulnerability is present in another project that KhulnaSoft projects
depend on (Docker for example).

### When not to report a security vulnerability?

Don't send a vulnerability report if:

- You need help tuning KhulnaSoft project components for security.
- You need help applying security related updates.
- Your issue is not security related.

## Evaluation

The KhulnaSoft team acknowledges and analyzes each vulnerability report within 10 working days.

Any vulnerability information you share with the KhulnaSoft team stays
within the KhulnaSoft project. We don't disseminate the information to other
projects. We only share the information as needed to fix the issue.

We keep the reporter updated as the status of the security issue is addressed.

## Fixing the issue

Once a security vulnerability has been fully characterized, a fix is developed by the KhulnaSoft team.
The development and testing for the fix happens in a private GitHub repository in order to prevent
premature disclosure of the vulnerability.

## Early disclosure

The KhulnaSoft team maintains a mailing list for private early disclosure of security vulnerabilities. 
The list is used to provide actionable information to close KhulnaSoft partners. The list is not intended 
for individuals to find out about security issues.

## Public disclosure

On the day chosen for public disclosure, a sequence of activities takes place as quickly as possible:

- Changes are merged from the private GitHub repository holding the fix into the appropriate set of public
branches.
- KhulnaSoft team ensures all necessary binaries are promptly built and published.
- Once the binaries are available, an announcement is sent out on the following channels:
  - The [KhulnaSoft blog](https://khulnasoft.com/blog/)
  - The [KhulnaSoft Twitter feed](https://twitter.com/khulnasoft)
  - The #announcements channel on Slack

As much as possible this announcement will be actionable, and include any mitigating steps customers can take prior to
upgrading to a fixed version. 
