import admin from '../configs/firebaseAdmin.js';

const validateTokens = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const [type, apiKey, firebaseToken] = authHeader.split(' ');

    // [MUST] Validate Api Key
    if (type !== 'Bearer' || !apiKey) {
        return res.status(401).json({
            error: 'Invalid authorization format. ' +
                'Format is Authorization Bearer <API_KEY>'
        })
    }

    if (apiKey !== process.env.API_SERVER_KEY) {
        return res.status(403).json({ error: 'Invalid API key' })
    }

    // [OPTIONAL] Validate Firebase token
    try {
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        req.user = decodedToken;
    } catch (error) {
        // Ignore the error and proceed without authentication of firebase token
        // return res.status(403).json({ error: 'Invalid or expired token' });
    }

    next();
};

export default validateTokens;