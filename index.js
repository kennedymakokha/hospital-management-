
import admin from 'firebase-admin'
// import serviceAccount from './serviceAccountKey.json'
// var serviceAccount = require("path/to/serviceAccountKey.json");

export default admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "homasy-dc077",
        "private_key_id": "91731502263474533deee7519f32f8cbfdcf987c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBUrQbDFP0u+/z\nK0A2REWrKYFbeakPweB6OzKNXei25GjKOGWojpb0CCpJPuXA7AHy1oRvUiyA+BRW\nptwvLhsspmZ3WB3mK19XROS9nDa3vdX5zaEVhi6WnXNYijWN8pJMpWTn0vy/KXUz\n8tC67q5nOlvZesYfYjJMH0Np2ptzS2kwQOIZzWOOpfOfmBOeteUEUd6mVU0qKLj8\nFb+qrzaGrlMA87cnYZwbco0/Zjxl9Rirxk/P5X+w2GZZvtakGvKD71P6vQVNUbfh\nMrjgLBm8AtNC6hRyCaz6+EItaE/PbhNej/KP5s8caA6fbbv5wcPBmuj1DQAqeMaW\nNj4MO4WjAgMBAAECggEAAKUAcbikTQQVZDeoMqYen1f3lPD+Zc2NLIsm+36tKHLx\ngH8Yo6u6CB1A2tapWG/Q/9jEP0TEXje1haZvxH6AW7FAVTSHgP1zB2z04Eb1jb5F\nyNvtJg+49wqWWFy5mfwNjdDdWcKD0jVWrTIpjP3/udthdAOrRm6C4WsXQ/KVIxjD\nRwgEeKbmneGdNWBtVxC760qq/snRQgDfW1IqY+s3a8AmM5/kmTh+2L2fvgyLoReC\nYEqYhGHXN4w6tZLx6zPqEdcTOOPD947eWKLOgwzRIfLv+a/US7bBpTE4lri7ZEXk\ncteNjQXyLJPorqWJo2w9z2tAOZeWdvVshGATNVjE3QKBgQD0vqyJmci+oaT3Gz0n\nZM3IQvROBnEWEPOUvTXutbtl1A54Y0eCygwt2PhDOB9xCh3rBYAdQNofv1AxdFPE\nkiqcGlQTxoaq7iZQmxyzQ4BnomVajfB4M0xUPHUt4olhTPPScHgSgPBShJ3wwYHa\nPDd4OCXdBiRW3QtCNZFEIHppZQKBgQDKNqcWsMpVgrONzy4lpQYBxx8h9Q3A+WvJ\nN9GCW+4lF+NHQZbamiXmqQd9YJGRyc+ZrCpNiC5oRomptAd9r7fHwxDtD1IN1kg4\nZ0xUR1e146NrFnLk1dFt5L8Ws/D1iJay44v92HxoD8ij8+y4Mav/x3tSaiYa5Uij\nqS1fW6vGZwKBgBpblpVTHI17Nxrtsg5WCttwaoMkqnUn6jOwlOhaZg43Yj+Q4Ziy\nTdF6NnJ2ztwLrOEsvHlqDJOytN4+mu7mlvQs2bUvgj1SXIn9yn97245NrQCtnKI1\nVBkWUcBZT1ZNRUz6k9PaUwdwBNpy3Js2NPsbgOhmyu8X6yh8QGLH5KcJAoGBAKqn\ntxnqN8g01u3uFIcGn2wurTKOSn46wWF+7xyyEuhRIamITBTPFP92VXDVZ+T+yWpq\npwTp0iiEpzeGTPAgtNws3wMB9ADjf+3CF+PklbxWkhsVRf+kB+xTqYUydT/ydyQf\n74xbAJsd/vmHKZdFrF/f7U7fcKswJ76fT0Bz8CMvAoGAQMxcJAHh1fVQYPKE3bsu\nafRJ/APMaJ2IoeLUMoFg6HEWrBdakqkGNcc+3belvY6HPnCIolIvyK4ml11VXoZZ\n1rSUllGXNPcFLIOI389pBap1EmaInbzbYqOknH3DhnRrIavtjgH79RA8xJmfZw7R\nbFAZszzjlIyg+HA+uvMMCpQ=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-oxh4h@homasy-dc077.iam.gserviceaccount.com",
        "client_id": "100305037673367139421",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oxh4h%40homasy-dc077.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      )
});


