import { useMemo } from 'react';
import { GraphQLClient } from 'graphql-request';
import { useApp, useStderr } from 'ink';
import terminalLink from 'terminal-link';
import { config } from '~/config';

import { refreshAccessToken } from '../auth0';
import { API_URL } from './api.constants';
import { getSdk } from './sdk';

/** Fix for node 18, @see https://github.com/prisma-labs/graphql-request/issues/384 */
// @ts-ignore
global.FormData = undefined;

export const useApiSdk = () => {
  const { exit } = useApp();
  const { write } = useStderr();

  const accessToken = config.get('accessToken');
  const organization = config.get('organization');
  const storeId = config.get('storeId');

  const sdk = useMemo(() => {
    const graphqlClient = new GraphQLClient(`${API_URL}/graphql`, {
      headers: {
        'x-instant-client': 'CLI',
        ...(accessToken ? { 'x-instant-access-token': accessToken } : {}),
        ...(organization ? { 'x-instant-organization': organization } : {}),
        ...(storeId ? { 'x-instant-store-id': storeId } : {}),
      },
    });

    return getSdk(
      graphqlClient,
      async <T>(
        action: (requestHeaders?: Record<string, string>) => Promise<T>,
      ) => {
        try {
          return await action();
        } catch (err: any) {
          /** Handle FetchError's as fatal */
          if (err?.type === 'system') {
            const link = terminalLink.stderr(
              'our status page',
              'https://status.instantcommerce.io',
              {
                fallback: (text, url) => `${text} (${url})`,
              },
            );
            write(
              `❌ Could not connect to API, please check your internet connection or go to ${link}\n`,
            );
            exit(err);
            return err;
          } else if (
            err?.response?.errors?.[0]?.extensions?.response?.statusCode === 403
          ) {
            /** Authentication issue, could be not logged in, or need to refresh token */
            const refreshToken = config.get('refreshToken');

            if (refreshToken) {
              /** Try to refresh the access token */
              try {
                const res = await refreshAccessToken(refreshToken);

                config.set('accessToken', res.access_token);
                if (res.refresh_token) {
                  config.set('refreshToken', res.refresh_token);
                }

                /** Retry same action after refreshing token */
                return await action({
                  'x-instant-access-token': res.access_token,
                });
              } catch (refreshErr: any) {
                /** Throw original error */
              }
            } else if (!accessToken || !refreshToken) {
              write(
                `❌ You are not logged in, please run the \`login\` command\n`,
              );
              return;
            }

            throw new Error(
              `❌ Failed to authenticate, try running the \`login\` & \`select\` commands`,
            );
          }

          throw err;
        }
      },
    );
  }, [getSdk, accessToken, organization, storeId]);

  return sdk;
};
