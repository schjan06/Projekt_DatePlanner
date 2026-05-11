import nodemailer from 'nodemailer';

function smtpConfig() {
	return {
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT || 587),
		secure: String(process.env.SMTP_SECURE || 'false') === 'true',
		auth:
			process.env.SMTP_USER && process.env.SMTP_PASS
				? {
						user: process.env.SMTP_USER,
						pass: process.env.SMTP_PASS
					}
				: undefined
	};
}

function assertSmtpConfigured() {
	if (!process.env.SMTP_HOST) {
		throw new Error('SMTP_HOST fehlt. Bitte SMTP-Konfiguration in .env ergänzen.');
	}
}

export async function sendVerificationEmail({ to, displayName, verificationUrl }) {
	assertSmtpConfigured();
	const transporter = nodemailer.createTransport(smtpConfig());
	const from = process.env.SMTP_FROM || 'VibeMatch <noreply@vibematch.local>';
	const name = displayName || 'VibeMatch Nutzer';

	await transporter.sendMail({
		from,
		to,
		subject: 'Bestätige deine VibeMatch Registrierung',
		text: [
			`Hallo ${name}`,
			'',
			'bestätige bitte deine E-Mail-Adresse, um deinen VibeMatch Account zu aktivieren.',
			`Bestätigungslink: ${verificationUrl}`,
			'',
			'Der Link ist 24 Stunden gültig.',
			'',
			'Liebe Grüsse',
			'VibeMatch'
		].join('\n'),
		html: `
			<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #202032;">
				<h1 style="margin-bottom: 12px;">Willkommen bei VibeMatch</h1>
				<p>Hallo ${name}</p>
				<p>Bestätige bitte deine E-Mail-Adresse, um deinen VibeMatch Account zu aktivieren.</p>
				<p>
					<a href="${verificationUrl}" style="display:inline-block; padding:12px 18px; border-radius:999px; background:#7657ff; color:white; text-decoration:none; font-weight:700;">
						E-Mail bestätigen
					</a>
				</p>
				<p style="color:#727084;">Der Link ist 24 Stunden gültig.</p>
			</div>
		`
	});
}
