const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const clientId = '5c55295efdb3c5849e51';
const clientSecret = '5bb5193114e715e7ba533634fb7a232865b26a40';
const redirectUri = 'https://localhost:3000/auth/casdoor/callback';
const casdoorTokenUrl = 'https://localhost:8443/api/login/oauth/access_token';

router.get('/casdoor/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing "code" in query parameters');
  }

  try {
    const response = await axios.post(
      casdoorTokenUrl,
      {
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    console.log('Token data:', JSON.stringify(data));

    if (data.access_token) {
      res.cookie('token', data.access_token, {
        httpOnly: false,
        secure: false, 
        sameSite: 'lax',
      });

      res.redirect('https://localhost:3001/callback'); // редірект на фронт
    } else {
      res.status(400).send('Token exchange failed');
    }

  } catch (error) {
    console.error('Casdoor error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/casdoor/profile', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const { name, displayName, email, avatar, isAdmin } = decoded;
    return res.json({ name, displayName, email, avatar, isAdmin });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to decode token' });
  }
});

module.exports = router;