'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '@wavemaker/react-runtime/store';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@wavemaker/react-runtime/store';
import { WmSpinner } from '@wavemaker/react-runtime/components/basic/spinner';
import { updateConfig } from '@wavemaker/react-runtime/store/slices/appConfigSlice';
import { useAppConfig } from '@wavemaker/react-runtime/hooks/useAppConfig';
import { setRouter } from '@wavemaker/react-runtime/store/middleware/navigationMiddleware';
import { useAuth, usePageAccess } from '@wavemaker/react-runtime/hooks/useAuth';
import {
  loadWmProperties,
  handle401,
  setupAxiosInterceptors,
} from '@wavemaker/react-runtime/core/app.service';
import pageConfigs from '@/app/pages-config';
import { ToastProvider } from '@wavemaker/react-runtime/actions/toast-provider';
import { WmThemeProvider } from '@wavemaker/react-runtime/mui-config/theme-provider';

interface RouterLike {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
}

interface AppConfig {
  [key: string]: any;
  appVariables?: any;
}

interface ClientLayoutProps {
  children: React.ReactNode;
  configs: AppConfig;
}

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const _store = useMemo(() => store, []);
  const router = useRouter();

  useEffect(() => {
    setupAxiosInterceptors();

    const routerAdapter: RouterLike = {
      push: (path: string) => router.push(path),
      replace: (path: string) => router.replace(path),
      back: () => router.back(),
      forward: () => router.forward(),
    };
    setRouter(routerAdapter);
  }, []);

  return <Provider store={_store}>{children}</Provider>;
};

const SecurityInitializer = ({
  children,
  baseURL,
}: {
  children: React.ReactNode;
  baseURL: string;
}) => {
  const dispatch = useAppDispatch();
  const {
    getLoggedInUserDetails,
    isPageLoading,
    isLoggedIn,
    loggedInUser = {},
    securityConfig = {},
  } = useAuth();
  useEffect(() => {
    const initSecurity = async () => {
      try {
        await getLoggedInUserDetails(baseURL);
      } catch (error) {
        console.error('Failed to initialize security:', error);
      }
    };

    initSecurity();
  }, [baseURL, dispatch]);

  const currentPage = usePathname().toLowerCase() || '';

  if (isPageLoading) {
    return <WmSpinner name="security-page-loader" caption="" listener={{}} />;
  }

  if (
    (isLoggedIn && securityConfig?.securityEnabled) ||
    !securityConfig?.securityEnabled ||
    currentPage === '/login'
  ) {
    return <>{children}</>;
  }

  return null;
};

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackUrl?: string;
}

export const ProtectedRoute = ({
  children,
  fallbackUrl = '/unauthorized',
}: ProtectedRouteProps) => {
  const currentPath = usePathname();
  const pageName = currentPath.replace(/^\/+/, '');
  const { hasAccess, loading } = usePageAccess(pageName);

  // useEffect(() => {
  //   if (!loading && hasAccess && pageName !== 'Login') {
  //     handle401(currentPath);
  //   }
  // }, [hasAccess, loading, currentPath]);

  if (loading) {
    return <WmSpinner name="page" caption="" listener={{}} />;
  }

  return hasAccess ? <>{children}</> : null;
};

const AppConfigWrapper = ({
  children,
  configs,
}: {
  children: React.ReactNode;
  configs: AppConfig;
}) => {
  const dispatch = useAppDispatch();
  const { getServiceDefinitionsData } = useAppConfig();
  const initialConfig = {
    ...configs,
    appConfig: {
      ...configs.appConfig,
    },
  };
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  useEffect(() => {
    async function loadAllConfigurations() {
      try {
        const appProperties = await loadWmProperties(
          initialConfig.appConfig.url
        );
        dispatch(
          updateConfig({
            ...initialConfig,
            appConfig: {
              ...initialConfig.appConfig,
              appProperties,
              pages: pageConfigs,
            },
            appVariables: {},
          })
        );
        await getServiceDefinitionsData(initialConfig.appConfig.url);
      } catch (error) {
        console.error('Failed to load configurations:', error);
      } finally {
        setIsConfigLoading(false);
      }
    }

    loadAllConfigurations();
  }, []);

  if (isConfigLoading) {
    return <WmSpinner name="page" caption="" listener={{}} />;
  }

  return <>{children}</>;
};

export const ClientLayout = ({ children, configs }: ClientLayoutProps) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/Main");
  }, []);

  return (
    <ReduxProvider>
      <WmThemeProvider>
        <ToastProvider>
          <AppConfigWrapper configs={configs}>
            <SecurityInitializer baseURL={configs.appConfig.url}>
              <ProtectedRoute>{children}</ProtectedRoute>
            </SecurityInitializer>
          </AppConfigWrapper>
        </ToastProvider>
      </WmThemeProvider>
    </ReduxProvider>
  );
};
