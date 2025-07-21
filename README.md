# Keycloak SPI - Geofence ISO 3166 Alpha-2

This SPI is designed to restrict authentication to specific geographies based on a multi-valued user attribute.

This SPI provides a mechanism to block authentication from countries not listed in `countryUse` user attribute. The user attribute `countryUse`is multi-valued ISO 3166 Alpha-2 country codes.  



**Dependencies:**

*   **CloudFlare:**  This SPI is dependant on the `CloudFront-Viewer-Country` header.
*   **`countryUse` user attribute:**  The `countryUse` user attribute must be set manually for every user or federated (eg LDAP / AD).

**Override:**

If any of the values in the `countryUse` user attribute is set to `gxr`, the country check is bypassed.

**Usage:**

1. Create the `countryUse` user attribute and add entries manually or create a user attribute mapping from AD / LDAP
2. Copy the JAR to the Keycloak `providers/` directory, then run `bin/kc.[sh|bat] build`.
3. Add this provider as REQUIRED at the end of the authentication flow and encapsulate the existing authenticators into a separate REQUIRED authentication subflow.

Reference [Keycloak Server Developer - JavaScript providers](https://www.keycloak.org/docs/latest/server_development/index.html#_script_providers)
