const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: "804612087099-jghjsjpjsfip2803ffrim1q9ulrkunbt.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:8080/api/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});