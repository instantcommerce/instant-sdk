import React, { useEffect, useState } from 'react';
import { render, Text } from 'ink';
import open from 'open';
import { CommandModule } from 'yargs';
import { config } from '~/config';
import {
  checkDeviceCode,
  getDeviceCode,
  Auth0DeviceCodeResponse,
  Auth0AccessTokenResponse,
  Auth0ErrorResponse,
} from '~/lib/auth0';

export const Login = () => {
  const [deviceCodeData, setDeviceCodeData] =
    useState<Auth0DeviceCodeResponse>();
  const [deviceCodeResult, setDeviceCodeResult] = useState<
    Auth0AccessTokenResponse | Auth0ErrorResponse
  >();
  const [pollingRetries, setPollingRetries] = useState(0);

  useEffect(() => {
    /** Check every interval if the device code has been verified */
    function polling(deviceCode: string, interval: number) {
      checkDeviceCode(deviceCode)
        .then((checkData) => {
          if ('access_token' in checkData) {
            /** Persist tokens */
            config.set('accessToken', checkData.access_token);
            config.set('refreshToken', checkData.refresh_token);

            /** Unset organization and store in case switched accounts */
            config.delete('organization');
            config.delete('storeId');
          }

          setDeviceCodeResult(checkData);
        })
        .catch((err) => {
          if (err.response.data.error === 'authorization_pending') {
            setTimeout(() => polling(deviceCode, interval), interval * 1000);
            setPollingRetries((prevRetries) => prevRetries + 1);
          } else {
            setDeviceCodeResult(err.response.data);
          }
        });
    }

    /** Get device code, open verification link, start polling */
    getDeviceCode().then((getData) => {
      setDeviceCodeData(getData);
      open(getData.verification_uri_complete);
      setTimeout(
        () => polling(getData.device_code, getData.interval),
        getData.interval * 1000,
      );
    });
  }, []);

  if (!deviceCodeData) {
    /** Waiting to open the verification link */
    return <Text>Redirecting...</Text>;
  }

  if (!deviceCodeResult) {
    /** Waiting to for the user to verify the device code */
    return (
      <Text>
        User code: <Text color="green">{deviceCodeData.user_code}</Text>{' '}
        <Text dimColor>(Retries #{pollingRetries})</Text>
      </Text>
    );
  }

  if ('access_token' in deviceCodeResult) {
    /** END: Successfully logged in */
    return <Text>Successfully logged in to your account</Text>;
  }

  /** END: Failed to login, display error message */
  return (
    <Text>
      Failed to login:{' '}
      {'error_description' in deviceCodeResult
        ? deviceCodeResult.error_description
        : 'An unexpected error occurred'}
    </Text>
  );
};

export const login: CommandModule = {
  command: 'login',
  describe: 'Login to your account',
  handler: () => {
    render(<Login />);
  },
};
