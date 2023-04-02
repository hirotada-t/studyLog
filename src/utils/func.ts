import { Dialog } from 'quasar';

export const deleteDialog = (callback: () => void) => {
  Dialog.create({
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
