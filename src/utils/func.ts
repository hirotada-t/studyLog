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
export const createNewTargetDialog = (
  title: string,
  callback: (data: string) => void
) => {
  Dialog.create({
    title: `Create New ${title}.`,
    dark: true,
    prompt: {
      model: '',
      isValid: (val) => val.length !== 0,
      type: 'text',
    },
    ok: {
      color: 'dark',
      flat: true,
      Style: 'background-color:#ffb31a;',
    },
    cancel: true,
    class: 'btns-center',
  }).onOk((data) => {
    callback(data);
  });
};
