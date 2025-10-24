# WalletConnect Setup (Optional)

To enable wallet connection, you need to get a WalletConnect Project ID:

1. Go to https://cloud.walletconnect.com
2. Create a new project
3. Copy your Project ID
4. Update `app/providers.tsx`:
   ```typescript
   projectId: 'YOUR_PROJECT_ID_HERE',
   ```

This is optional - the app will work without it, but users won't be able to connect wallets.
