import { useQuasar } from 'quasar';

const $q = useQuasar();
export const deleteDialog = (callback: () => void) => {
  $q.dialog({
    title: 'Alert',
    message: 'Do you really want to delete?',
    dark: true,
    ok: {
      flat: true,
      color: '#ccc',
    },
    cancel: {
      push: true,
      color: 'negative',
    },
  }).onOk(() => {
    callback();
  });
};
