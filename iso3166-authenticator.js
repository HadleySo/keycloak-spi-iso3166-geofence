// Assumes user attribute is "countryUse"
// Assumes country ISO 3166 header is "CloudFront-Viewer-Country"

AuthenticationFlowError = Java.type("org.keycloak.authentication.AuthenticationFlowError");
var AttributeName = "countryUse";

function authenticate(context) {

    LOG.info(script.name + " --> trace auth for: " + user.username);

    var attributes = user.getAttributes()
    if (attributes.containsKey(AttributeName)) {

        var allowedCountries = attributes.get(AttributeName)
        LOG.info(script.name + " allowedCountries: " + allowedCountries);

        // Check if user has gxr override
        if (allowedCountries.contains("gxr")) {
            context.success();
            return;
        } 

        // Get country header
        try {
            var headers = httpRequest.getHttpHeaders();
            var ViewerCountry = headers.getHeaderString("CloudFront-Viewer-Country");
        } catch (e) {
            LOG.info(script.name + " Issue getting CloudFront-Viewer-Country");
            LOG.info(script.name + " Error: " + e.name + e.message);
            context.failure(AuthenticationFlowError.INTERNAL_ERROR);
            return;
        }

        LOG.info(script.name + " CloudFront-Viewer-Country: " + ViewerCountry);


        // Check if country in allow list
        if (allowedCountries.contains(ViewerCountry)) {
            context.success();
            return;
        }

        LOG.info(script.name + " Not in allowed country");

        context.failure(AuthenticationFlowError.INVALID_USER);
        return;
    }

    context.failure(AuthenticationFlowError.INTERNAL_ERROR);
    return;
}