import { useDispatch } from 'react-redux';
import { errorsActions } from '@/store';
import { useCallback } from 'react';

/**
 * Hook to easily dispatch global errors from any component
 * Errors are automatically displayed via ReduxToast and auto-removed after 5 seconds
 */
export const useGlobalError = () => {
  const dispatch = useDispatch();

  const showError = useCallback(
    (message: string) => {
      dispatch(errorsActions.showError(message));
    },
    [dispatch]
  );

  const showSuccess = useCallback(
    (message: string) => {
      dispatch(errorsActions.showSuccess(message));
    },
    [dispatch]
  );

  const showInfo = useCallback(
    (message: string) => {
      dispatch(errorsActions.showInfo(message));
    },
    [dispatch]
  );

  const showWarning = useCallback(
    (message: string) => {
      dispatch(errorsActions.showWarning(message));
    },
    [dispatch]
  );

  const clearErrors = useCallback(() => {
    dispatch(errorsActions.clearErrors());
  }, [dispatch]);

  return {
    showError,
    showSuccess,
    showInfo,
    showWarning,
    clearErrors,
  };
};

