import { useEffect } from "react";
import Auth0Lock from "auth0-lock";

export default function AuthDialog({ open, onClose }) {
  useEffect(() => {
    if (open) {
      const lock = new Auth0Lock(
        "YOUR_CLIENT_ID",         // Auth0 Client ID
        "YOUR_DOMAIN",            // e.g. "your-tenant.auth0.com"
        {
          auth: {
            redirectUrl: "YOUR_CALLBACK_URL",
            responseType: "token id_token"
          },
          closable: true,
          allowedConnections: ["Username-Password-Authentication"]
        }
      );

      lock.on("authenticated", () => {
        onClose();  // Modal band karo after login
      });

      lock.show();
    }
  }, [open]);

  return null; 
}
