# WalletConnect Setup (Required)

To enable wallet connection, you need to get a WalletConnect Project ID:

1. Go to https://cloud.walletconnect.com
2. Create a new project
3. Copy your Project ID
4. Add it to your `.env.local` file:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

**Security Note:** Never commit your project ID directly in the code. Always use environment variables for sensitive information.

This is required for wallet connection functionality.
