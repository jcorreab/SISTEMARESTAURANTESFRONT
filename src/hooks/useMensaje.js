import { useSnackbar } from 'notistack';

export default function useMensaje() {
  const { enqueueSnackbar } = useSnackbar();
  /**
   * Mensaje del sistema
   * @param {{ texto: string, variante: string }}
   */
  const mensajeSistema = ({ texto, variante = 'warning' }) => {
    enqueueSnackbar(texto, {
      variant: variante,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  };
  return {
    mensajeSistema,
  };
}
